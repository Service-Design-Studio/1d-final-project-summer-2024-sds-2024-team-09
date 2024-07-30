document.addEventListener('DOMContentLoaded', function () {
    let resource_id, sid;
    
    window.startRecording = async () => {
        try {
            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            await rtc.client.join(APP_ID, CHANNEL, TOKEN, UID);

            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

            recordingStartTime = new Date().toISOString();

            const response = await fetch('/recordings/start', {
                method: 'POST'
            });
            const data = await response.json();
            resource_id = data.resource_id;
            sid = data.sid;

            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('stop-btn').style.display = 'inline-block';

            console.log('Recording started successfully!');
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    };

    window.stopRecording = async () => {
        try {
            const response = await fetch('/recordings/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resource_id, sid })
            });

            if (rtc.localAudioTrack) {
                rtc.localAudioTrack.close();
            }
            if (rtc.localVideoTrack) {
                rtc.localVideoTrack.close();
            }
            if (rtc.client) {
                await rtc.client.leave();
            }

            document.getElementById('start-btn').style.display = 'inline-block';
            document.getElementById('stop-btn').style.display = 'none';

            console.log('Recording stopped successfully!');
        } catch (error) {
            console.error('Failed to stop recording:', error);
        }
    };
});
