import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC, { AudienceLatencyLevelType } from 'agora-rtc-sdk-ng';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const CameraDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { cameraData } = location.state || {};
  const navigate = useNavigate();

  const [rtc, setRtc] = useState({
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
    remoteUsers: {},
    mediaRecorder: null,
    recordedChunks: [],
  });

  const videoContainerRef = useRef(null);

  const startRecording = () => {
    const combinedStream = new MediaStream();

    for (let uid in rtc.remoteUsers) {
      const user = rtc.remoteUsers[uid];
      if (user.videoTrack) {
        const videoTrack = user.videoTrack.getMediaStreamTrack();
        combinedStream.addTrack(videoTrack);
      }
      if (user.audioTrack) {
        const audioTrack = user.audioTrack.getMediaStreamTrack();
        combinedStream.addTrack(audioTrack);
      }
    }

    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp9,opus'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        rtc.recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(rtc.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.getElementById('download-link');
      const date = new Date();
      const dateString = date.toISOString().split('T')[0];
      const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '-');
      const filename = `recording_${dateString}_${timeString}.webm`;
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.style.display = 'block';
      downloadLink.click();

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    };

    mediaRecorder.start();
    setRtc((prevRtc) => ({ ...prevRtc, mediaRecorder }));
    document.getElementById('start-recording').disabled = true;
    document.getElementById('stop-recording').disabled = false;
  };

  const stopRecording = () => {
    if (rtc.mediaRecorder) {
      rtc.mediaRecorder.stop();
      document.getElementById('start-recording').disabled = false;
      document.getElementById('stop-recording').disabled = true;
    }
  };

  const backUser = () => {
    navigate('/user-home');
  };

  useEffect(() => {

    // const APP_ID = "fa3a10495b62421c8f7179b868b65feb";
    // const TOKEN = "007eJxTYDh81K/0eKXgHf/y7pMOZWvb80y/Pb8rpWtT2RoXGzNjjbQCQ1qicaKhgYmlaZKZkYmRYbJFmrmhuWWShZlFkplpWmrS86RVaQ2BjAynmWYzMTJAIIjPxpCUWJmbWMHAAACuxiCe";
    // const CHANNEL = "baymax";

    const APP_ID = cameraData?.app_id;
    console.log('APP_ID:', APP_ID);
    const TOKEN = cameraData?.token;
    const CHANNEL = cameraData?.channel;

    const joinChannel = async () => {
      const client = AgoraRTC.createClient({
        mode: "live",
        codec: "vp8",
      });

      try {
        client.setClientRole("audience", {
          level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY,
        });

        console.log("APP_ID", APP_ID, "CHANNEL", CHANNEL);
        const new_id = Math.floor(Math.random() * 1000000);
        console.log("new_id", new_id);
        await client.join(APP_ID, CHANNEL, TOKEN, new_id);

        client.on("user-published", async (user, mediaType) => {
          console.log("user-published", user, mediaType);
          await client.subscribe(user, mediaType);
          console.log("subscribe success");

          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;

            // Clear the existing container
            if (videoContainerRef.current) {
              videoContainerRef.current.innerHTML = '';
            }

            // Play the remote video track inside the ref container
            remoteVideoTrack.play(videoContainerRef.current);
          }

          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
          }

          setRtc((prevRtc) => ({
            ...prevRtc,
            remoteUsers: {
              ...prevRtc.remoteUsers,
              [user.uid]: user,
            },
          }));
        });

        client.on("user-unpublished", (user) => {
          console.log("user-unpublished", user);
          if (videoContainerRef.current && videoContainerRef.current.id === user.uid.toString()) {
            videoContainerRef.current.innerHTML = 'Video Player Here';
          }

          setRtc((prevRtc) => {
            const updatedUsers = { ...prevRtc.remoteUsers };
            delete updatedUsers[user.uid];
            return { ...prevRtc, remoteUsers: updatedUsers };
          });
        });

        setRtc((prevRtc) => ({ ...prevRtc, client }));
      } catch (error) {
        console.error('Failed to join as audience:', error);
      }
    };

    const leaveChannel = async () => {
      if (rtc.client) {
        await rtc.client.leave();
        rtc.client.removeAllListeners();

        // Clear the video container when leaving
        if (videoContainerRef.current) {
          videoContainerRef.current.innerHTML = 'Video Player Here';
        }

        setRtc((prevRtc) => ({ ...prevRtc, client: null }));
        console.log("Left the channel successfully");
      }
    };

    // Ensure the functions are available in the component scope
    window.joinChannel = joinChannel;
    window.leaveChannel = leaveChannel;

    // Attach event listeners
    document.getElementById('start-recording').addEventListener('click', startRecording);
    document.getElementById('stop-recording').addEventListener('click', stopRecording);

    // Cleanup event listeners
    return () => {
      const startButton = document.getElementById('start-recording');
      const stopButton = document.getElementById('stop-recording');
      if (startButton) startButton.removeEventListener('click', startRecording);
      if (stopButton) stopButton.removeEventListener('click', stopRecording);
    };
  }, [rtc, cameraData]);

  return (
    <div className="flex flex-col items-center">
      <div className="items-center rounded-lg w-96 p-6">
        <header className="flex items-center mb-6">
          <button className="btn btn-ghost btn-sm mr-4" onClick={backUser}>&lt;</button>
          <h1 className="text-xl font-semibold">{cameraData.camera_name}</h1>
        </header>
        <div
          className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-6"
          ref={videoContainerRef}
        >
          <span className="text-gray-500">Video Player Here</span>
        </div>
        <div className="flex justify-around mb-6 p-4 rounded-lg border border-gray-300 shadow-lg">
          <button className="btn btn-outline btn-primary">📸</button>
          <button className="btn btn-outline btn-primary">🔊</button>
          <button className="btn btn-outline btn-primary">🎥</button>
        </div>
        <div className="flex justify-center pb-4">
          <button onClick={() => window.joinChannel()} className="btn btn-accent px-4 mx-4">Watch </button>
          <button onClick={() => window.leaveChannel()} className="btn btn-accent px-4 mx-4">Leave</button>
        </div>
        <div className="mb-6">
          <p className="font-medium">Currently:</p>
          <p className="text-gray-600">Status: {cameraData.status}</p>
          <p className="text-gray-600">Noise Level: xxx db</p>
        </div>
        <div className="flex justify-center pb-4">
          <button id="start-recording" className="btn btn-success">Start Recording</button>
          <button id="stop-recording" className="btn btn-danger" disabled>Stop Recording</button>
          <a id="download-link" className="btn btn-primary" style={{ display: 'none' }}>Download Recording</a>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">History:</h2>
          <div className="flex items-center mb-4">
            <img
              src="/blossom.png"
              alt="cry icon"
              className="w-16 h-16 mr-4"
            />
            <div>
              <p className="font-medium">Cry Detected at 7pm!</p>
              <p className="text-gray-600 text-sm">Duration: 5mins</p>
              <p className="text-gray-600 text-sm">Probability: 90%</p>
            </div>
          </div>
          {/* Repeat history items as needed */}
        </div>
        {/* <div>
          <h1>Camera Details</h1>
          {cameraData && (
            <div>
              <p>ID: {cameraData.id}</p>
              <p>Name: {cameraData.camera_name}</p>
              <p>Status: {cameraData.status}</p>
              <p>App ID: {cameraData.app_id}</p>
              <p>Channel: {cameraData.channel}</p>
              <p>Token: {cameraData.token}</p>
              <p>Created At: {cameraData.created_at}</p>
              <p>Updated At: {cameraData.updated_at}</p>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CameraDetails;
