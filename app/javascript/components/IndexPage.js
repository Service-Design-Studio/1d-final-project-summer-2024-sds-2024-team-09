import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
    return (
        <div>
            <h1>Welcome to Agora Monitoring</h1>
            <Link to="/user">
                <button>User Page</button>
            </Link>
            <Link to="/camera">
                <button>Camera Page</button>
            </Link>
        </div>
    );
};

export default IndexPage;
