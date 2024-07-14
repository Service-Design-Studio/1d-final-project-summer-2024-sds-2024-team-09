import React from 'react';

function Welcome() {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4">Welcome to Baymax</h1>
                <p className="lead">Monitor and manage your devices seamlessly.</p>
                <div className="d-flex justify-content-center mt-4">
                    <a href="/user" className="btn btn-primary btn-lg mx-2">User Page</a>
                    <a href="/camera" className="btn btn-secondary btn-lg mx-2">Camera Page</a>
                    <a href="/history" className="btn btn-secondary btn-lg mx-2">History</a>
                    <a href="/record" className="btn btn-secondary btn-lg mx-2">Record</a>
                    <a href="/histories" className="btn btn-secondary btn-lg mx-2">Histories</a>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
