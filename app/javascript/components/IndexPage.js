import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const IndexPage = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4">Welcome to Baymax</h1>
                <p className="lead">Monitor and manage your devices seamlessly.</p>
                <div className="d-flex justify-content-center mt-4">
                    <Link to="/user" className="btn btn-primary btn-lg mx-2">
                        User Page
                    </Link>
                    <Link to="/camera" className="btn btn-secondary btn-lg mx-2">
                        Camera Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
