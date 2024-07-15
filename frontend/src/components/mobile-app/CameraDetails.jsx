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
  });

  const backUser = () => {
    navigate('/user-home');
  }

  const videoContainerRef = useRef(null);

  useEffect(() => {
    const APP_ID = cameraData?.app_id;
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
        });

        client.on("user-unpublished", (user) => {
          console.log("user-unpublished", user);
          if (videoContainerRef.current && videoContainerRef.current.id === user.uid.toString()) {
            videoContainerRef.current.innerHTML = 'Video Player Here';
          }
        });

        setRtc({ ...rtc, client });
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

        setRtc({ ...rtc, client: null });

        console.log("Left the channel successfully");
      }
    };

    // Ensure the functions are available in the component scope
    window.joinChannel = joinChannel;
    window.leaveChannel = leaveChannel;
  }, [rtc]);

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
        <div>
          <h2 className="text-lg font-semibold mb-2">History:</h2>
          <div className="flex items-center mb-4">
            <img
              src="./images/crybaby.png"
              alt="cry icon"
              className="w-10 h-10 mr-4"
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
