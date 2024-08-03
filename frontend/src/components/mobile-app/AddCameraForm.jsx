import React, { useState } from 'react';
import config from '../../../config';
import { waitFor } from '@testing-library/react';

function CameraForm({ onSave, onCancel }) {
    // State variables for each form input
    const [name, setName] = useState('');
    const [appId, setAppId] = useState('');
    const [channel, setChannel] = useState('');
    const [token, setToken] = useState('');
    const [imageLink, setImageLink] = useState('');

    const userDetails = JSON.parse(localStorage.getItem('user-data'));
    const user_id = userDetails["user"]["id"];

    // Handle form submission
    async function sendCameraData() {
        const newCameraData = {
            "camera": {
                "app_id": appId,
                "channel": channel,
                "token": token,
                "camera_name": name,
                "user_id": parseInt(localStorage.getItem(user_id), 10),
                "status": 'Not Live', // Default status for new cameras
                "image_url": imageLink,
            }
        };
        console.log("this is", newCameraData);

        const API_BASE_URL = config['API_BASE_URL'];
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/cameras`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "camera": {
                        "app_id": appId,
                        "channel": channel,
                        "token": token,
                        "camera_name": name,
                        "user_id": parseInt(localStorage.getItem(user_id), 10),
                        "status": 'Not Live', // Default status for new cameras
                        "image_url": imageLink,
                    }
                }),
            });
            console.log('Response:', response);

            if (!response.ok) {
                const errorDetail = await response.json();
                console.error('Error details:', errorDetail);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Add New Camera</h2>
                <form onSubmit={sendCameraData}>
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image Link</label>
                        <input
                            type="text"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={sendCameraData}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CameraForm;
