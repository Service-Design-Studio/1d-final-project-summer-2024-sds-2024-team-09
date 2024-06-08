import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div>
            <h1>Welcome, Admin</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button>Send Notification</button>
                <Link to="/admin-live-view">
                    <button>Open Live View</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
