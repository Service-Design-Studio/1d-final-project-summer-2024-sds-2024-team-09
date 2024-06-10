// src/LiveViewPage.js
import React, { useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

const LiveViewPage = () => {
    const [frame, setFrame] = useState(null);
    const cable = createConsumer('ws://localhost:3000/cable'); // Adjust the URL to match your server

    useEffect(() => {
        // this subscription will receive the frame data from the server
        const channel = cable.subscriptions.create('VideoFeedChannel', {
            received(data) {
                // Update the frame state with the received data
                setFrame(data.frame);
            }
        });

        // Cleanup on unmount
        return () => channel.unsubscribe();
    }, [cable]);

    return (
        <div>
            <h1>Live Camera Feed</h1>
            {frame ? (
                <img src={`data:image/jpeg;base64,${frame}`} alt="Live Feed" />
            ) : <p>Loading...</p>}
        </div>
    );
};

export default LiveViewPage;
