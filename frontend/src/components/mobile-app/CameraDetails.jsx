import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CameraDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { cameraData } = location.state || {};

    return (
        <div>
            <h1>Camera Details</h1>
            {cameraData && (
                <div>
                    <p>ID: {cameraData.id}</p>
                    <p>Name: {cameraData.camera_name}</p>
                    <p>Status: {cameraData.status}</p>
                    <p>App ID: {cameraData.app_id}</p>
                    <p>Channel: {cameraData.channel}</p>
                    <p>Token: {cameraData.token}</p>
                    <p>Created At: {cameraData.created_at}</p>
                    <p>Updated At: {cameraData.updated_at}</p>
                </div>
            )}
        </div>
    );
};

export default CameraDetail;
