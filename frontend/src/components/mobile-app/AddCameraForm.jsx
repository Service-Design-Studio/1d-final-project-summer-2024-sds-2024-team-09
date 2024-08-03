import React, { useState } from 'react';
import config from '../../../config';

function CameraForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [appId, setAppId] = useState('');
    const [channel, setChannel] = useState('');
    const [token, setToken] = useState('');
    const [imageLink, setImageLink] = useState('');

    const userDetails = JSON.parse(localStorage.getItem('user-data'));
    const user_id = userDetails["user"]["id"];
    console.log("user_id", user_id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCameraData = {
            camera: {
                app_id: appId,
                channel: channel,
                token: token,
                camera_name: name,
                user_id: user_id,
                status: 'Not Live',
                image_url: imageLink,
            }
        };

        console.log("this is", newCameraData);
        console.log(newCameraData);

        const API_BASE_URL = config['API_BASE_URL'];

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/cameras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCameraData), // Ensure the body is stringified
            });

            console.log(response);

            if (!response.ok) {
                const errorDetail = await response.json();
                console.error('Error details:', errorDetail);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Ensure the response is valid JSON
            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();
                console.log('Success:', data);
                onSave(data);
            } else {
                console.error('Unexpected content type:', response.headers.get('content-type'));
                throw new Error('Unexpected content type');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Add New Camera</h2>
                <form onSubmit={handleSubmit}>
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
                            type="submit"
                            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
