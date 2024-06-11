import React, { useRef, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

const CameraPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cable = createConsumer('ws://localhost:3000/cable');

    useEffect(() => {

        const setupCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        };
        setupCamera();

        const interval = setInterval(() => {
            if (videoRef.current && canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(blob => {
                    // Ensure the channel is created before sending blobs
                    const channel = cable.subscriptions.create('VideoFeedChannel', {
                        received(data) {
                            console.log('Received', data);
                        }
                    });
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        channel.send({ frame: reader.result });
                    };
                }, 'image/jpeg');
            }
        }, 100); // Capture frame every 100ms

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [cable]);

    return (
        <div>
            <h1>Live Camera Feed</h1>
            <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} width="640" height="480"></canvas>
        </div>
    );
};

export default CameraPage;
