import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import DeviceNotifs from './DeviceNotifs';
import { useLocation } from 'react-router-dom';


function Home() {
    const location = useLocation();
    const { userData } = location.state || {};
    console.log(userData);
    console.log(userData.user.cameras);

    const albums = userData.user.cameras;
    // const albums = [
    //     { id: 1, title: 'Bedroom', notifCount: 2, image: 'https://s3-ap-southeast-1.amazonaws.com/atap-main/gallery-full/23d6b593-403c-4603-88e4-b8ad244bbe0f/3rooms-luxury-condo-design.jpg', status: 'Live' },
    //     { id: 2, title: 'Living Room', notifCount: 0, image: 'https://images.squarespace-cdn.com/content/v1/5f40a8cf9f9f8d5592b55cc3/3aea3a0b-444a-47d7-8bbf-ae6f2323fb5c/1232.png', status: 'Not Live' },
    //     { id: 3, title: 'Child Room', notifCount: 0, image: 'https://st.hzcdn.com/simgs/b991b1f60e4a9b68_4-0015/home-design.jpg', status: 'Not Live' },
    // ];

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
