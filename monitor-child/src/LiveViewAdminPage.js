import React from 'react';
import { Link } from 'react-router-dom';

const LiveViewAdminPage = () => {
    return (
        <div>
            <h1>Admin Live View</h1>
            <img src="camera_image_url" alt="Camera" />
            <Link to="/admin">
                <button>Back</button>
            </Link>
        </div>
    );
};

export default LiveViewAdminPage;
