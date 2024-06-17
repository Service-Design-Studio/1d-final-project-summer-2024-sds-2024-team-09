import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserPage = () => {
    return (
        <div className="container mt-5">
            <div className="card mt-4">
                <div className="card-body text-center">
                    <h1 className="card-title">Camera 1</h1>
                    <p className="card-text">Active</p>
                    <Link to="/camera-broadcast" className="btn btn-primary btn-lg">
                        Watch Live
                    </Link>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body text-center">
                    <h1 className="card-title">Camera 2</h1>
                    <p className="card-text">Not Active</p>
                </div>
            </div>
        </div>

    );
};

export default UserPage;
