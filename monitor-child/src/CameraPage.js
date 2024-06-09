import React, { useRef, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

const CameraPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cable = createConsumer('ws://localhost:3000/cable');

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error("Error accessing camera: ", err));

        const channel = cable.subscriptions.create('VideoFeedChannel', {
            received(data) {
                console.log(data);
            }
        });

        setInterval(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                channel.send({ frame: blob });
            }, 'image/jpeg');
        }, 100); // Capture frame every 100ms
    }, []);

    return (
        <div>
            <h1>Live Camera Feed</h1>
            <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} width="640" height="480"></canvas>
        </div>
    );
};

export default CameraPage;
