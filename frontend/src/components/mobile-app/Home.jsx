import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import DeviceNotifs from './DeviceNotifs';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const { userData } = location.state || {};
    console.log(userData);
    console.log(userData.user.cameras);

    const albums = userData.user.cameras;

    const liveDeviceCount = albums.filter((album) => album.status === 'Live').length;

    const [greeting, setGreeting] = useState('');

    const navigate = useNavigate();

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

    const handleNavigate = (camera) => {
        navigate(`/camera/${camera.id}`, { state: { cameraData: camera } });
    };

    return (
        <div className="font-ubuntu p-8 py-16">
            <h1 className="text-2xl text-primary font-bold mb-4">{greeting}</h1>
            <p className="text-lg text-gray-600 mb-6">{liveDeviceCount} Active Device</p>
            <div>
                {['Live', 'Not Live'].map((status) => (
                    <div key={status} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{status}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {albums
                                .filter((album) => album.status === status)
                                .map((album) => (
                                    <div
                                        key={album.id}
                                        onClick={() => handleNavigate(album)}
                                        className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                                        style={{ height: '200px', backgroundImage: `url(${album.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    >
                                        <DeviceNotifs title={album.camera_name} count={album.notifCount} />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <Navbar />
        </div>
    );
}

export default Home;
