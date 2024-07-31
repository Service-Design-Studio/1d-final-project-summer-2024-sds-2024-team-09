import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { setAppElement } from 'react-modal';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';


const DeviceNotifs = ({ title, count, camera, onHoverChange }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState(camera.camera_name);
    const [appId, setAppId] = useState(camera.app_id || '');
    const [channel, setChannel] = useState(camera.channel || '');
    const [token, setToken] = useState(camera.token || '');
    const navigate = useNavigate();


    const getCircleStyle = (count) => {
        if (count === 0) {
            return 'bg-neutral text-primary';
        } else {
            return 'bg-accent text-white';
        }
    };

    const handleEditClick = () => {
        console.log('Edit clicked');
        setShowForm(true);
    };

    const handleNavigate = (camera) => {
        navigate(`/camera/${camera.id}`, { state: { cameraData: camera } });
    }

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        // Logic to save the updated camera details
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/cameras/${camera.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "camera": {
                        "camera_name": name,
                        "app_id": appId,
                        "channel": channel,
                        "token": token
                    },
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log('Camera Details updated successfully:', data);
                setShowForm(false);

                // Retrieve the existing data from localStorage
                const existingData = localStorage.getItem('user-data');
                console.log('Existing Data:', existingData);
                let parsedData;

                try {
                    parsedData = existingData ? JSON.parse(existingData) : null;
                    console.log("parsedData: ", parsedData);
                } catch (error) {
                    console.error('Failed to parse localStorage data:', error);
                    parsedData = null;
                }

                // Update the camera details in the parsed data
                if (parsedData && parsedData.user) {
                    const cameras = parsedData.user.cameras || [];
                    console.log("cameras", cameras);
                    const cameraIndex = cameras.findIndex(c => c.id === camera.id);
                    console.log("cameraIndex", cameraIndex);

                    if (cameraIndex !== -1) {
                        console.log("data", data);
                        let updatedCamera = cameras[cameraIndex];
                        console.log("camera", updatedCamera);
                        updatedCamera["camera_name"] = data["camera_name"];
                        updatedCamera["channel"] = data["channel"];
                        updatedCamera["app_id"] = data["app_id"];
                        updatedCamera["token"] = data["token"];
                        console.log("Updated data", updatedCamera);
                    } else {
                        cameras.push(data.camera);
                    }
                    console.log("Updated camera information", cameras[cameraIndex]);

                    parsedData.user.cameras = cameras;

                    // Save the updated data back to localStorage
                    localStorage.setItem('user-data', JSON.stringify(parsedData));
                    console.log(localStorage.getItem('user-data'));
                }
            } else {
                setError(data.errors || 'An error occurred');
            }

        } catch (error) {
            setError('Camera Details update failed. Please try again.');
        }
        location.reload();

        console.log({
            name,
            appId,
            channel,
            token,
        });

    };

    return (
        <div className="relative">
            <div className="absolute inset-0 flex p-8 text-black">
                <div className="text-left">
                    <button
                        onClick={() => handleNavigate(camera)}
                    >
                        <h3 className="text-lg font-bold">{title}</h3>
                    </button>
                </div>
                <div className={`absolute right-10 mr-12 text-right w-10 h-10 rounded-full ${getCircleStyle(count)}`}>
                    <div className={" absolute right-3.5 top-1"}>
                        <h3 className="font-bold text-xl">{count} </h3>
                    </div>
                </div>
                <div className="absolute right-10 top-7 text-right w-10 h-10 rounded-full z-10 mt-1">
                    <button
                        className="p-2 text-xl text-gray-600 rounded-full hover:bg-gray-200 z-11"
                        onMouseEnter={() => onHoverChange(true)}
                        onMouseLeave={() => onHoverChange(false)}
                        onClick={handleEditClick}
                    >
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            {
                showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Edit Camera Settings</h2>
                            <form onSubmit={handleSave}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">App ID</label>
                                    <input
                                        type="text"
                                        value={appId}
                                        onChange={(e) => setAppId(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Channel</label>
                                    <input
                                        type="text"
                                        value={channel}
                                        onChange={(e) => setChannel(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Token</label>
                                    <input
                                        type="text"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleCloseForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default DeviceNotifs;
