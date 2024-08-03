import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CameraSelectionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [camData, setCamData] = useState(location.state?.cameraData || JSON.parse(localStorage.getItem('camera-data')));

    const cameras = camData?.user?.cameras || [];
    console.log(camData);

    const handleClick = (camera) => {
        console.log('Camera deets:', camera);
        navigate(`/live/${camera.id}`, { state: { cameraData: camera } });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 font-ubuntu">
            <div className="text-center mb-8">
                <img
                    className="mx-auto h-36 w-auto"
                    src="/logo.png"
                    alt="Crybaby"
                />
                <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Your Available Cameras</h2>
            </div>

            <div className="carousel carousel-center rounded-box ">
                {cameras.map((camera) => (
                    <div key={camera.id} className="text-center carousel-item grid grid-cols-1 mx-4">
                        <img
                            src={camera.image_url}
                            alt={camera.camera_name}
                            className="h-64 w-64 object-cover rounded-lg shadow-md cursor-pointer "
                            onClick={() => handleClick(camera)}
                        />
                        <p className="mt-2 text-lg font-medium text-gray-900">{camera.camera_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CameraSelectionPage;
