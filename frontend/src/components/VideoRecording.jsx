import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoTable from './VideoTable';

const APP_ID = '1297c1a58c0a4f40a55d1f1f7c52b7cd';
const TOKEN = '007eJxTYEg/ri4k+nW6eEZt6PHK+pJD7j7LJ+tmTTer9Z/g2t44L1uBwdDI0jzZMNHUItkg0STNxCDR1DTFMM0wzTzZ1CjJPDlFznRhWkMgI4P6/5esjAwQCOKzMSQlVuYmVjAwAAALex71';
const CHANNEL = 'baymax';

const VideoRecording = ({ videos }) => {
  const [rtc, setRtc] = useState({
    client: null,
    remoteUsers: {},
    streamingCount: 0,
    displayCount: 0,
    mediaRecorder: null,
    recordedChunks: []
  });

  useEffect(() => {
    const joinChannel = async () => {
      const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
      await client.join(APP_ID, CHANNEL, TOKEN, null);

      client.on('user-published', async (user, mediaType) => {
        if (mediaType === 'video') {
          await client.subscribe(user, mediaType);
          const remoteVideoTrack = user.videoTrack;

          setRtc((prevRtc) => {
            const newDisplayCount = prevRtc.displayCount + 1;
            const newRemoteUsers = { ...prevRtc.remoteUsers, [user.uid]: user };
            const newStreamingCount = prevRtc.streamingCount + 1;

            return {
              ...prevRtc,
              displayCount: newDisplayCount,
              remoteUsers: newRemoteUsers,
              streamingCount: newStreamingCount
            };
          });

          const cameraContainer = document.createElement('div');
          cameraContainer.classList.add('card', 'mt-4', 'col-md-6');
          cameraContainer.id = `camera-${user.uid}`;
          cameraContainer.innerHTML = `
            <div class="card-body text-center">
              <h1 class="card-title">Camera ${rtc.displayCount}</h1>
              <div id="camera-${user.uid}-preview" style="width: 320px; height: 240px;"></div>
              <p class="card-text">UID: ${user.uid}</p>
              <a href="/camera_broadcast" class="btn btn-primary btn-lg">Watch Live</a>
            </div>
          `;

          document.getElementById('camera-list').appendChild(cameraContainer);
          remoteVideoTrack.play(`camera-${user.uid}-preview`, { fit: 'contain', muted: false });
        }
      });

      client.on('user-unpublished', (user) => {
        const cameraContainer = document.getElementById(`camera-${user.uid}`);
        if (cameraContainer) {
          cameraContainer.remove();
        }

        setRtc((prevRtc) => {
          const newRemoteUsers = { ...prevRtc.remoteUsers };
          delete newRemoteUsers[user.uid];
          const newStreamingCount = prevRtc.streamingCount - 1;

          return {
            ...prevRtc,
            remoteUsers: newRemoteUsers,
            streamingCount: newStreamingCount
          };
        });
      });

      setRtc((prevRtc) => ({ ...prevRtc, client }));
    };

    joinChannel();
  }, []);

  const startRecording = () => {
    const combinedStream = new MediaStream();

    for (let uid in rtc.remoteUsers) {
      const user = rtc.remoteUsers[uid];
      if (user.videoTrack) {
        const videoTrack = user.videoTrack.getMediaStreamTrack();
        combinedStream.addTrack(videoTrack);
      }
    }

    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRtc((prevRtc) => ({
          ...prevRtc,
          recordedChunks: [...prevRtc.recordedChunks, event.data]
        }));
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(rtc.recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('video[title]', `Recording ${new Date().toLocaleString()}`);
      formData.append('video[file]', blob, `recording_${new Date().toISOString().replace(/[:.]/g, '-')}.webm`);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      await fetch('/videos', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': token
        },
        body: formData
      });

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    };

    mediaRecorder.start();

    setRtc((prevRtc) => ({
      ...prevRtc,
      mediaRecorder
    }));

    document.getElementById('start-recording').disabled = true;
    document.getElementById('stop-recording').disabled = false;
  };

  const stopRecording = () => {
    rtc.mediaRecorder.stop();

    document.getElementById('start-recording').disabled = false;
    document.getElementById('stop-recording').disabled = true;
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold">Video Recording</h1>
      <div id="camera-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camera previews will be dynamically added here */}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Total Streaming Devices: <span id="streaming-count">{rtc.streamingCount}</span></h2>
      </div>
      <button id="start-recording" className="btn btn-success mt-4" onClick={startRecording}>Start Recording</button>
      <button id="stop-recording" className="btn btn-error mt-4 ml-4" onClick={stopRecording} disabled>Stop Recording</button>

      <h2 className="mt-10 text-2xl">Uploaded Videos</h2>
      <ul className="mt-4">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <li key={video.id} className="mb-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              {video.file.attached ? (
                <video controls className="w-full max-w-md">
                  <source src={video.file.url} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>No video available</p>
              )}
            </li>
          ))
        ) : (
          <p>No videos availabledddd</p>
        )}
      </ul>
      <VideoTable />
    </div>
  );
};

export default VideoRecording;
