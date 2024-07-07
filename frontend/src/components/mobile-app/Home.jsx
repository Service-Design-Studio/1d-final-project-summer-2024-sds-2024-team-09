import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import DeviceNotifs from './DeviceNotifs';

function Home() {
    const albums = [
        { id: 1, title: 'Bedroom', notifCount: 2, image: 'path/to/image1.jpg', status: 'Live' },
        { id: 2, title: 'Living Room', notifCount: 0, image: 'path/to/image2.jpg', status: 'Not Live' },
        { id: 3, title: 'Child Room', notifCount: 0, image: 'path/to/image3.jpg', status: 'Not Live' },
    ];

    const liveDeviceCount = albums.filter((album) => album.status === 'Live').length;

    const [greeting, setGreeting] = useState('');

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
                                        className="relative rounded-3xl overflow-hidden shadow-lg"
                                        style={{ height: '200px', backgroundImage: `url(${album.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    >
                                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex p-8 text-white">
                                            <div className="text-left">
                                                <h3 className="text-lg font-bold">{album.title}</h3>

                                            </div>
                                            <div className="absolute right-10 top-9 text-right">
                                                <h3 className="font-bold">{album.notifCount} </h3>
                                            </div>
                                        </div>
                                        <DeviceNotifs title={album.title} count={album.notifCount} />
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
