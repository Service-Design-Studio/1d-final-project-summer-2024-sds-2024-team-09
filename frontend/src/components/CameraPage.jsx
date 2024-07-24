import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const CameraPage = () => {
    const [rtc, setRtc] = useState({
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    });

    const APP_ID = 'fa3a10495b62421c8f7179b868b65feb';
    const TOKEN = '007eJxTYNAyvby/T2n2nseXrlQyrolY+Tnx7N3qX4zBiwJOsnuGihsoMKQlGicaGphYmiaZGZkYGSZbpJkbmlsmWZhZJJmZpqUmeb6aktYQyMiwP8CCkZEBAkF8NoakxMrcxAoGBgDC9yCW';
    const CHANNEL = 'baymax';

    const getUID = () => {
        let uid = localStorage.getItem('uid');
        if (!uid) {
            let lastUID = localStorage.getItem('lastUID');
            lastUID = lastUID ? parseInt(lastUID) + 1 : 1;
            uid = lastUID.toString().padStart(5, '0');
            localStorage.setItem('uid', uid);
            localStorage.setItem('lastUID', lastUID);
        }
        return uid;
    };

    const handleJoinAsHost = async () => {
        const UID = getUID();

        const client = AgoraRTC.createClient({
            mode: 'live',
            codec: 'vp8',
            clientRoleOptions: {
                level: AgoraRTC.AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY,
            },
        });

        try {
            client.setClientRole('host');
            console.log('APP_ID', APP_ID, 'CHANNEL', CHANNEL);
            await client.join(APP_ID, CHANNEL, TOKEN, UID);
            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            await client.publish([localAudioTrack, localVideoTrack]);
            const localPlayerContainer = document.createElement('div');
            localPlayerContainer.id = UID;
            localPlayerContainer.textContent = 'Local user ' + UID;
            localPlayerContainer.style.width = '640px';
            localPlayerContainer.style.height = '480px';
            document.body.append(localPlayerContainer);
            localVideoTrack.play(localPlayerContainer);
            console.log('Host joined successfully with UID:', UID);

            setRtc({ client, localAudioTrack, localVideoTrack });
        } catch (error) {
            console.error('Failed to join as host:', error);
        }
    };

    const endStream = async () => {
        const { client, localAudioTrack, localVideoTrack } = rtc;
        try {
            if (localAudioTrack) {
                localAudioTrack.close();
            }
            if (localVideoTrack) {
                localVideoTrack.close();
            }
            const localPlayerContainer = document.getElementById(getUID());
            if (localPlayerContainer) {
                localPlayerContainer.remove();
            }
            if (client && client.remoteUsers) {
                client.remoteUsers.forEach((user) => {
                    const playerContainer = document.getElementById(user.uid);
                    if (playerContainer) {
                        playerContainer.remove();
                    }
                });
            }
            if (client) {
                await client.leave();
            }
            console.log('Stream ended successfully!');
        } catch (error) {
            console.error('Failed to end the stream:', error);
        } finally {
            window.location.href = '/'; // Redirect to the root path
        }
    };

    return (
        <div className="container mx-auto mt-10 p-6 max-w-lg bg-white rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">Camera Page</h1>
                <p className="text-gray-700 mb-6">This page is the UI page for the camera at home.</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        onClick={handleJoinAsHost}
                    >
                        Join as Host
                    </button>
                    <button
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        onClick={endStream}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraPage;