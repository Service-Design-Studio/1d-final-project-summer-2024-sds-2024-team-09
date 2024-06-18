import React, { useEffect, useState } from 'react';
import AgoraRTC, { AudienceLatencyLevelType } from 'agora-rtc-sdk-ng';

const CameraBroadcastPage = () => {
    const [rtc, setRtc] = useState({
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    });

    const [remotePlayerContainer, setRemotePlayerContainer] = useState(null);

    useEffect(() => {
        const APP_ID = process.env.REACT_APP_APP_ID;
        const TOKEN = process.env.REACT_APP_TOKEN;
        const CHANNEL = process.env.REACT_APP_CHANNEL;

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

                        // Remove existing container if it exists
                        if (remotePlayerContainer) {
                            remotePlayerContainer.remove();
                        }

                        // Create a new container
                        const newRemotePlayerContainer = document.createElement("div");
                        newRemotePlayerContainer.id = user.uid.toString();
                        newRemotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                        newRemotePlayerContainer.style.width = "640px";
                        newRemotePlayerContainer.style.height = "480px";
                        document.body.append(newRemotePlayerContainer);

                        // Play the remote video track
                        remoteVideoTrack.play(newRemotePlayerContainer);

                        // Update state with the new container
                        setRemotePlayerContainer(newRemotePlayerContainer);
                    }

                    if (mediaType === "audio") {
                        const remoteAudioTrack = user.audioTrack;
                        remoteAudioTrack.play();
                    }
                });

                client.on("user-unpublished", (user) => {
                    console.log("user-unpublished", user);
                    if (remotePlayerContainer && remotePlayerContainer.id === user.uid.toString()) {
                        remotePlayerContainer.remove();
                        setRemotePlayerContainer(null);
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

                // Remove the remote player container if it exists
                if (remotePlayerContainer) {
                    remotePlayerContainer.remove();
                    setRemotePlayerContainer(null);
                }

                setRtc({ ...rtc, client: null });

                console.log("Left the channel successfully");
            }
        };

        // Ensure the functions are available in the component scope
        window.joinChannel = joinChannel;
        window.leaveChannel = leaveChannel;
    }, [rtc, remotePlayerContainer]);

    return (
        <div>
            <h1>Camera Broadcast Page</h1>
<<<<<<< Updated upstream
=======
            <p>This page is what parents would see when monitoring their children from home. </p>
>>>>>>> Stashed changes
            <button onClick={() => window.joinChannel()}>Watch the broadcast</button>
            <button onClick={() => window.leaveChannel()}>Leave the broadcast</button>
        </div>
    );
};

export default CameraBroadcastPage;
