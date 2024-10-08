import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import DeviceNotifs from './DeviceNotifs';
import { useLocation } from 'react-router-dom';
import AddCameraForm from './AddCameraForm';
import config from '../../../config';
import axios from 'axios';

function Home() {
    const location = useLocation();
    const [userData, setUserData] = useState(location.state?.userData || JSON.parse(localStorage.getItem('user-data')));
    console.log('User Data:', userData["id"]);

    useEffect(() => {
        // Define an async function to fetch user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/${userData["id"]}`); // Replace with the correct endpoint and ID
                const fetchedData = response.data;
                setUserData(fetchedData);
                localStorage.setItem('user-data', JSON.stringify(fetchedData)); // Store user data in localStorage
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array ensures this effect runs only once on mount


    const albums = userData?.user?.cameras || [];
    const liveDeviceCount = albums.filter((album) => album.status === 'Live').length;
    console.log('Albums:', albums);

    const [greeting, setGreeting] = useState('');
    const [editingCamera, setEditingCamera] = useState(null);
    const [isAddingCamera, setIsAddingCamera] = useState(false);

    const handleSave = (updatedCamera) => {
        const updatedAlbums = albums.map((camera) =>
            camera.id === updatedCamera.id ? updatedCamera : camera
        );
        setUserData({
            ...userData,
            user: {
                ...userData.user,
                cameras: updatedAlbums,
            },
        });
        setEditingCamera(null);
    };

    const handleCancel = () => {
        setEditingCamera(null);
        setIsAddingCamera(false);
    };

    const openAddCameraForm = () => {
        setIsAddingCamera(true);
    };

    const CameraSettingsForm = ({ camera, onSave, onCancel }) => {
        const [name, setName] = useState(camera.name);
        const [appId, setAppId] = useState(camera.app_id || '');
        const [channel, setChannel] = useState(camera.channel || '');
        const [token, setToken] = useState(camera.token || '');
        const [imageLink, setImageLink] = useState(camera.image_url || '');
        const [isOnline, setIsOnline] = useState(camera.status === 'Live');

        const handleSubmit = (e) => {
            e.preventDefault();
            const updatedCamera = { ...camera, name, app_id: appId, channel, token, status: isOnline ? 'Live' : 'Not Live' };
            onSave(updatedCamera);
        };

        const handleToggleChange = () => {
            setIsOnline(!isOnline);
        };

        return (
            <div className="form-overlay">
                <div className="form-container">
                    <h2>Edit Camera Settings</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>App ID</label>
                            <input
                                type="text"
                                value={appId}
                                onChange={(e) => setAppId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Channel</label>
                            <input
                                type="text"
                                value={channel}
                                onChange={(e) => setChannel(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Token</label>
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Image Link</label>
                            <input
                                type="text"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Status</label>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isOnline}
                                    onChange={handleToggleChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="items-center rounded-lg p-6 font-ubuntu">
                <h1 className="text-2xl text-primary font-bold mb-4">{greeting}</h1>
                <div className="flex items-center mb-6 justify-between">
                    <p className="text-lg text-gray-600 mr-4">{liveDeviceCount} Active Device</p>
                    <button
                        onClick={openAddCameraForm}
                        className="btn btn-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Add Camera
                    </button>
                </div>
                <div>
                    {['Live', 'Not Live'].map((status) => (
                        <div key={status} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 w-96">{status}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {albums
                                    .filter((album) => album.status === status)
                                    .map((album) => (
                                        <div
                                            key={album.id}
                                            className={`relative rounded-3xl overflow-hidden shadow-lg cursor-pointer`}
                                            style={{
                                                height: '200px',
                                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${album.image_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <DeviceNotifs title={album.camera_name} camera={album} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {editingCamera && (
                <CameraSettingsForm
                    camera={editingCamera}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    className="z-10"
                />
            )}
            {isAddingCamera && (
                <AddCameraForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    className="z-10"
                />
            )}
            <Navbar />
        </div>
    );
}

export default Home;
