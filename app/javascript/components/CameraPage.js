import React from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AudienceLatencyLevelType } from 'agora-rtc-sdk-ng';
import 'bootstrap/dist/css/bootstrap.min.css';


const CameraPage = () => {

    let rtc = {
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    };

    let APP_ID = process.env.REACT_APP_APP_ID;
    let TOKEN = process.env.REACT_APP_TOKEN;
    let CHANNEL = process.env.REACT_APP_CHANNEL;
    let UID = process.env.REACT_APP_UID;

    const handleJoinAsHost = async () => {
        rtc.client = AgoraRTC.createClient({
            mode: "live",
            codec: "vp8",
            clientRoleOptions: {
                level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY
            }
        });
        try {
            rtc.client.setClientRole('host');
            console.log("APP_ID", APP_ID, "CHANNEL", CHANNEL,)
            await rtc.client.join(APP_ID, CHANNEL, TOKEN, UID);
            // Create an audio track from the audio sampled by a microphone.
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a video track from the video captured by a camera.
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            // Publish the local audio and video tracks to the channel. 
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            // Dynamically create a container in the form of a DIV element for playing the remote video track.
            const localPlayerContainer = document.createElement('div');
            // Specify the ID of the DIV container. You can use the uid of the local user.
            localPlayerContainer.id = UID;
            localPlayerContainer.textContent = 'Local user ' + UID;
            localPlayerContainer.style.width = '640px';
            localPlayerContainer.style.height = '480px';
            document.body.append(localPlayerContainer);

            rtc.localVideoTrack.play(localPlayerContainer);

            console.log('Host joined successfully!');
        } catch (error) {
            console.error('Failed to join as host:', error);
        }
    };

    const endStream = async () => {
        try {
            if (rtc.localAudioTrack) {
                rtc.localAudioTrack.close();
            }
            if (rtc.localVideoTrack) {
                rtc.localVideoTrack.close();
            }

            // Remove the container for the local video track.
            const localPlayerContainer = document.getElementById(UID);
            if (localPlayerContainer) {
                localPlayerContainer.remove();
            }

            // Traverse all remote users to remove remote containers
            if (rtc.client && rtc.client.remoteUsers) {
                rtc.client.remoteUsers.forEach(user => {
                    const playerContainer = document.getElementById(user.uid);
                    if (playerContainer) {
                        playerContainer.remove();
                    }
                });
            }

            // Leave the channel.
            if (rtc.client) {
                await rtc.client.leave();
            }

            console.log('Stream ended successfully!');
        } catch (error) {
            console.error('Failed to end the stream:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4 mb-4">Camera Page</h1>
                <p>This page is the UI page for the camera at home.</p>
                <div className="btn-group" role="group">
                    <button className="btn btn-primary" onClick={handleJoinAsHost}>Join as Host</button>
                    <button className="btn btn-danger" onClick={endStream}>Leave</button>
                </div>
            </div>
        </div>
    );
};

export default CameraPage;
