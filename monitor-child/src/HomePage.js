import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        const newRoomId = generateRoomId();
        navigate(`/webrtc/${newRoomId}`);
    };

    const joinRoom = () => {
        if (roomId) {
            navigate(`/webrtc/${roomId}`);
        }
    };

    const generateRoomId = () => {
        return 'room-' + Math.random().toString(36).substr(2, 9);
    };
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={createRoom}>Create Room</button>
            <div>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <Link to="/live-view">
                <button>Live View</button>
            </Link>
        </div>
    );
};

export default HomePage;
