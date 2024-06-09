import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LiveViewPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cable = createConsumer('ws://localhost:3000/cable'); // Adjust the URL to match your server

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing the camera', err)
            });

        const channel = cable.subscriptions.create('VideoFeedChannel', {
            received(data) {
                console.log(data);
            }
        });

        // Capture frames and send them via WebSocket
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
            <h1>Live View</h1>
            <video ref={videoRef} autoPlay></video>
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    )
};

export default LiveViewPage;
