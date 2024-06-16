import AgoraRTC from "agora-rtc-sdk-ng";
import { AudienceLatencyLevelType } from "agora-rtc-sdk-ng";

let rtc = {
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
};

//Declare the APP_ID, TOKEN, CHANNEL, and UID variables.
let APP_ID = null;
let TOKEN = null;
let CHANNEL = null;
let UID = null;

fetch('config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(config => {
        console.log('Config file content:', config); // Log the config to check if it is correctly read
        APP_ID = config.APP_ID;
        TOKEN = config.TOKEN;
        CHANNEL = config.CHANNEL;
        UID = config.UID;
        if (!APP_ID || !TOKEN || !CHANNEL || !UID) {
            throw new Error('Config values are missing or undefined');
        }
        console.log('Config loaded:', { APP_ID, TOKEN, CHANNEL, UID });
        startBasicLiveStreaming(APP_ID, TOKEN, CHANNEL);
    })
    .catch(error => console.error('Error loading config:', error));

async function startBasicLiveStreaming() {
    rtc.client = AgoraRTC.createClient({
        mode: "live",
        codec: "vp8",
        clientRoleOptions: {
            level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY
        }
    });

    window.onload = function () {
        document.getElementById("host-join").onclick = async function () {
            rtc.client.setClientRole("host");
            console.log("APP_ID", APP_ID, "CHANNEL", CHANNEL,)
            await rtc.client.join(APP_ID, CHANNEL, TOKEN, UID);
            // Create an audio track from the audio sampled by a microphone.
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a video track from the video captured by a camera.
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            // Publish the local audio and video tracks to the channel.
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            // Dynamically create a container in the form of a DIV element for playing the remote video track.
            const localPlayerContainer = document.createElement("div");
            // Specify the ID of the DIV container. You can use the uid of the local user.
            localPlayerContainer.id = UID;
            localPlayerContainer.textContent = "Local user " + UID;
            localPlayerContainer.style.width = "640px";
            localPlayerContainer.style.height = "480px";
            document.body.append(localPlayerContainer);

            rtc.localVideoTrack.play(localPlayerContainer);

            console.log("publish success!");
        };

        document.getElementById("audience-join").onclick = async function () {
            console.log("HELLO")
            console.log("APP_ID", APP_ID, "CHANNEL", CHANNEL,)
            rtc.client.setClientRole("audience", {
                level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY
            });
            const new_id = Math.floor(Math.random() * 1000000);
            console.log("new_id", new_id)
            await rtc.client.join(APP_ID, CHANNEL, TOKEN, new_id);
            rtc.client.on("user-published", async (user, mediaType) => {
                // Subscribe to a remote user.
                console.log("user-published", user, mediaType)
                await rtc.client.subscribe(user, mediaType);
                console.log("subscribe success");

                // If the subscribed track is video.
                if (mediaType === "video") {
                    // Get RemoteVideoTrack in the user object.
                    const remoteVideoTrack = user.videoTrack;
                    // Dynamically create a container in the form of a DIV element for playing the remote video track.
                    const remotePlayerContainer = document.createElement("div");
                    // Specify the ID of the DIV container. You can use the uid of the remote user.
                    remotePlayerContainer.id = user.uid.toString();
                    remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                    remotePlayerContainer.style.width = "640px";
                    remotePlayerContainer.style.height = "480px";
                    document.body.append(remotePlayerContainer);

                    // Play the remote video track.
                    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                    remoteVideoTrack.play(remotePlayerContainer);
                }

                // If the subscribed track is audio.
                if (mediaType === "audio") {
                    // Get RemoteAudioTrack in the user object.
                    const remoteAudioTrack = user.audioTrack;
                    // Play the audio track. No need to pass any DOM element.
                    remoteAudioTrack.play();
                }
            });

            rtc.client.on("user-unpublished", user => {
                console.log("user-unpublished", user);
                // Get the dynamically created DIV container.
                const remotePlayerContainer = document.getElementById(user.uid);
                // Destroy the container.
                remotePlayerContainer.remove();
            });
        };

        document.getElementById("leave").onclick = async function () {
            // Close all the local tracks.
            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            // Remove the container for the local video track.
            const localPlayerContainer = document.getElementById(UID);
            if (localPlayerContainer) {
                localPlayerContainer.remove();
            }

            // Traverse all remote users to remove remote containers
            rtc.client.remoteUsers.forEach(user => {
                // Destroy the dynamically created DIV containers.
                const playerContainer = document.getElementById(user.uid);
                playerContainer && playerContainer.remove();
            });

            // Leave the channel.
            await rtc.client.leave();
        };
    };
}
