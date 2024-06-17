import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createConsumer } from '@rails/actioncable';

const CameraPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [chunks, setChunks] = useState([]); // Store video chunks [Blob, Blob, ...
    const cable = useRef(createConsumer('ws://localhost:3000/cable')).current;

    useEffect(() => {
        const setupCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                // Create a MediaRecorder instance
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    console.log('Data available')
                    if (event.data.size > 0) {
                        setChunks((prev) => [...prev, event.data]);
                    }
                };

                recorder.onstop = () => {
                    console.log('Recording stopped')
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    console.log('Blob', blob);
                    // Ensure that the channel is created before sending blobs
                    const channel = cable.subscriptions.create('VideoFeedChannel', {
                        received(data) {
                            console.log('Received', data);
                        }
                    });
                    console.log('Channel', channel);

                    const reader = new FileReader();
                    reader.readAsDataURL(blob); // Convert blob to base64
                    console.log('Reader', reader);
                    reader.onloadend = () => {
                        channel.send({ frame: reader.result });
                    };
                    console.log('Channel', channel);
                    setChunks([]); // Clear chunks
                };

                // Draw video frames on canvas
                const drawVideoOnCanvas = () => {
                    if (videoRef.current && canvasRef.current) {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext('2d');
                        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                        requestAnimationFrame(drawVideoOnCanvas);
                    }
                };

                drawVideoOnCanvas(); // Start drawing the video frames
                setMediaRecorder(recorder);


            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        };
        setupCamera();
        // Cleanup on unmount
        return () => {
            const currentMediaRecorder = mediaRecorder;
            const currentVideoRef = videoRef.current;

            if (currentMediaRecorder && currentMediaRecorder.state !== 'inactive') {
                currentMediaRecorder.stop();
            }
            if (currentVideoRef && currentVideoRef.srcObject) {
                const tracks = currentVideoRef.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [cable, mediaRecorder, chunks]);

    const startRecording = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
            console.log("starting in progress...")
            console.log(mediaRecorder.state)
            mediaRecorder.start();
            console.log("recorder started")
            console.log(mediaRecorder.state)
        }
    }, [mediaRecorder]);

    const stopRecording = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            console.log("stopping in progress...")
            mediaRecorder.stop();
            console.log("recorder started")
        }
    }, [mediaRecorder]);

    return (
        <div>
            <h1>Live Camera Feed</h1>
            <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
            <button onClick={startRecording}>Start Streaming</button>
            <button onClick={stopRecording}>Stop Streaming</button>
            <canvas ref={canvasRef} width="640" height="480"></canvas>
        </div>
    );
};

export default CameraPage;