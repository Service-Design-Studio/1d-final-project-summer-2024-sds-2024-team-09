import React from 'react';
import { Link } from 'react-router-dom';

const LiveViewPage = () => {
    return (
        <div>
            <h1>Live View</h1>
            <img src="camera_image_url" alt="Camera" />
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
};

export default LiveViewPage;
