// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// const CameraPage = () => {
//     const location = useLocation();
//     const { cameraData } = location.state || {};
//     const navigate = useNavigate();
//     console.log('Camera:', cameraData);
//     console.log('Camera ID:', cameraData.id);

//     const [rtc, setRtc] = useState({
//         localAudioTrack: null,
//         localVideoTrack: null,
//         client: null,
//     });

//     const videoContainerRef = useRef(null);

//     const APP_ID = "fa3a10495b62421c8f7179b868b65feb";
//     const TOKEN = "007eJxTYDhbFWx+TO/u7KX/3y5KPtm5QfHIs21Kqtx6i91fsy1UmvVWgSEt0TjR0MDE0jTJzMjEyDDZIs3c0NwyycLMIsnMNC016ab/wrSGQEaGRd8XMjBCIYjPxpCUWJmbWMHAAAAfUyJv";
//     const CHANNEL = "baymax";

//     // const APP_ID = cameraData.app_id;
//     // const TOKEN = cameraData.token;
//     // const CHANNEL = cameraData.channel;

//     console.log('APP_ID:', APP_ID)
//     console.log('TOKEN:', TOKEN)
//     console.log('CHANNEL:', CHANNEL)

//     const getUID = () => {
//         let uid = localStorage.getItem('uid');
//         if (!uid) {
//             let lastUID = localStorage.getItem('lastUID');
//             lastUID = lastUID ? parseInt(lastUID) + 1 : 1;
//             uid = lastUID.toString().padStart(5, '0');
//             localStorage.setItem('uid', uid);
//             localStorage.setItem('lastUID', lastUID);
//         }
//         return uid;
//     };
// };

// beforeEach(() => {
//     // Clear local storage before each test
//     localStorage.clear();
// });

// test('renders CameraPage component', () => {
//     const { getByText } = render(<Router><CameraPage /></Router>);
//     expect(getByText('Camera Page')).toBeInTheDocument();
//     expect(getByText('This page is the UI page for the camera at home.')).toBeInTheDocument();
//     expect(getByText('Join as Host')).toBeInTheDocument();
//     expect(getByText('Leave')).toBeInTheDocument();
// });

//         try {
//             client.setClientRole('host');
//             console.log('APP_ID', APP_ID, 'CHANNEL', CHANNEL);
//             await client.join(APP_ID, CHANNEL, TOKEN, UID);
//             const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//             const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
//             await client.publish([localAudioTrack, localVideoTrack]);

//             if (videoContainerRef.current) {
//                 videoContainerRef.current.innerHTML = '';
//             }
//             localVideoTrack.play(videoContainerRef.current);
//             remoteAudioTrack.play();
//             console.log('Host joined successfully with UID:', UID);

//             setRtc({ client, localAudioTrack, localVideoTrack });
//         } catch (error) {
//             console.error('Failed to join as host:', error);
//         }
//     ;
//     AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);
//     AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);

//     const endStream = async () => {
//         const { client, localAudioTrack, localVideoTrack } = rtc;
//         try {
//             if (localAudioTrack) {
//                 localAudioTrack.close();
//             }
//             if (localVideoTrack) {
//                 localVideoTrack.close();
//             }
//             const localPlayerContainer = document.getElementById(getUID());
//             if (localPlayerContainer) {
//                 localPlayerContainer.remove();
//             }
//             if (client && client.remoteUsers) {
//                 client.remoteUsers.forEach((user) => {
//                     const playerContainer = document.getElementById(user.uid);
//                     if (playerContainer) {
//                         playerContainer.remove();
//                     }
//                 });
//             }
//             if (client) {
//                 await client.leave();
//             }
//             console.log('Stream ended successfully!');
//         } catch (error) {
//             console.error('Failed to end the stream:', error);
//         } finally {
//             window.location.href = '/camera-home';
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 font-ubuntu">
//             <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
//                 <button
//                     className="absolute top-4 left-4 text-gray-700 p-4"
//                     onClick={() => navigate('/camera-home')}
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 19l-7-7 7-7"
//                         />
//                     </svg>
//                 </button>
//                 <div className="text-center">
//                     <img
//                         className="mx-auto h-24 w-auto"
//                         src="/logo.png"
//                         alt="Logo"
//                     />
//                     <h2 className="mt-6 text-2xl font-extrabold text-gray-900">{cameraData.camera_name || 'Main Door Camera'}</h2>
//                 </div>
//                 <div
//                     className="mt-8 bg-gray-200 rounded-lg w-full aspect-video flex items-center justify-center"
//                     ref={videoContainerRef}>
//                     {/* This will be replaced by the actual video player */}
//                     <p className="text-gray-500">Video Player</p>
//                 </div>
//                 <div className="mt-8 flex justify-between">
//                     <button
//                         className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//                         onClick={handleJoinAsHost}
//                     >
//                         Watch Live
//                     </button>
//                     <button
//                         className="px-10 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
//                         onClick={endStream}
//                     >
//                         Leave
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// ;

//     await waitFor(() => expect(mockClient.join).toHaveBeenCalled());
//     await waitFor(() => expect(mockClient.publish).toHaveBeenCalledWith([mockAudioTrack, mockVideoTrack]));
//     expect(document.body.querySelector('div#00001')).toBeInTheDocument();
//     expect(mockVideoTrack.play).toHaveBeenCalled();
// ;

// test('handles end stream successfully', async () => {
//     const mockClient = AgoraRTC.createClient();
//     const mockAudioTrack = { close: jest.fn() };
//     const mockVideoTrack = { close: jest.fn() };
//     AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);
//     AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);

//     const { getByText } = render(<Router><CameraPage /></Router>);

//     // Simulate joining as host
//     fireEvent.click(getByText('Join as Host'));
//     await waitFor(() => expect(mockClient.join).toHaveBeenCalled());

//     // Simulate ending the stream
//     fireEvent.click(getByText('Leave'));
//     await waitFor(() => expect(mockAudioTrack.close).toHaveBeenCalled());
//     await waitFor(() => expect(mockVideoTrack.close).toHaveBeenCalled());
//     await waitFor(() => expect(mockClient.leave).toHaveBeenCalled());

//     expect(document.body.querySelector('div#00001')).not.toBeInTheDocument();
// });

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';

const CameraPage = () => {
    const location = useLocation();
    const { cameraData } = location.state || {};
    const navigate = useNavigate();

    if (!cameraData) {
        return <div>Loading...</div>;
    }

    console.log('Camera:', cameraData);
    console.log('Camera ID:', cameraData.id);

    const [rtc, setRtc] = useState({
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    });

    const videoContainerRef = useRef(null);

    const APP_ID = "fa3a10495b62421c8f7179b868b65feb";
    const TOKEN = "007eJxTYDhbFWx+TO/u7KX/3y5KPtm5QfHIs21Kqtx6i91fsy1UmvVWgSEt0TjR0MDE0jTJzMjEyDDZIs3c0NwyycLMIsnMNC016ab/wrSGQEaGRd8XMjBCIYjPxpCUWJmbWMHAAAAfUyJv";
    const CHANNEL = "baymax";

    console.log('APP_ID:', APP_ID);
    console.log('TOKEN:', TOKEN);
    console.log('CHANNEL:', CHANNEL);

    const getUID = () => {
        let uid = localStorage.getItem('uid');
        if (!uid) {
            let lastUID = localStorage.getItem('lastUID');
            lastUID = lastUID ? parseInt(lastUID) + 1 : 1;
            uid = lastUID.toString().padStart(5, '0');
            localStorage.setItem('uid', uid);
            localStorage.setItem('lastUID', lastUID);
        }
        return uid;
    };

    const handleJoinAsHost = async () => {
        const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
        const UID = getUID();
        try {
            client.setClientRole('host');
            console.log('APP_ID', APP_ID, 'CHANNEL', CHANNEL);
            await client.join(APP_ID, CHANNEL, TOKEN, UID);
            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            await client.publish([localAudioTrack, localVideoTrack]);

            if (videoContainerRef.current) {
                videoContainerRef.current.innerHTML = '';
            }
            localVideoTrack.play(videoContainerRef.current);
            console.log('Host joined successfully with UID:', UID);

            setRtc({ client, localAudioTrack, localVideoTrack });
        } catch (error) {
            console.error('Failed to join as host:', error);
        }
    };

    const endStream = async () => {
        const { client, localAudioTrack, localVideoTrack } = rtc;
        try {
            if (localAudioTrack) {
                localAudioTrack.close();
            }
            if (localVideoTrack) {
                localVideoTrack.close();
            }
            const localPlayerContainer = document.getElementById(getUID());
            if (localPlayerContainer) {
                localPlayerContainer.remove();
            }
            if (client && client.remoteUsers) {
                client.remoteUsers.forEach((user) => {
                    const playerContainer = document.getElementById(user.uid);
                    if (playerContainer) {
                        playerContainer.remove();
                    }
                });
            }
            if (client) {
                await client.leave();
            }
            console.log('Stream ended successfully!');
        } catch (error) {
            console.error('Failed to end the stream:', error);
        } finally {
            navigate('/camera-home');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 font-ubuntu">
            <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute top-4 left-4 text-gray-700 p-4"
                    onClick={() => navigate('/camera-home')}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <div className="text-center">
                    <img
                        className="mx-auto h-24 w-auto"
                        src="/logo.png"
                        alt="Logo"
                    />
                    <h2 className="mt-6 text-2xl font-extrabold text-gray-900">{cameraData.camera_name || 'Living Room Camera'}</h2>
                </div>
                <div
                    className="mt-8 bg-gray-200 rounded-lg w-full aspect-video flex items-center justify-center"
                    ref={videoContainerRef}>
                    <p className="text-gray-500">Video Player</p>
                </div>
                <div className="mt-8 flex justify-between">
                    <button
                        className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        onClick={handleJoinAsHost}
                    >
                        Watch Live
                    </button>
                    <button
                        className="px-10 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        onClick={endStream}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraPage;
