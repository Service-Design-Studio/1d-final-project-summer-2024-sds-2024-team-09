import React from 'react';
import { Link } from 'react-router-dom';

const UserPage = () => {
    return (
        <div>
            <h1>User Page</h1>
            <p>Camera Name: CAM 1</p>
            <Link to="/camera-broadcast">
                <button>Join as Audience</button>
            </Link>
        </div>
    );
};

export default UserPage;
