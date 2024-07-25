import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
    const { filePath, title } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 font-ubuntu">
            <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute top-4 left-4 text-gray-700"
                    onClick={() => navigate('/histories')}
                >
                    <svg
                        className="h-6 w-6 m-4 mt-6"
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
                    <h2 className="mt-4 text-xl font-extrabold text-gray-900">{title}</h2>
                </div>
                <div className="mt-16 bg-gray-100 rounded-lg w-full h-40 flex items-center justify-center">
                    {/* This will be replaced by the actual video player */}
                    <div className="video-player flex items-center justify-center mt-4">
                        <video controls>
                            <source src={filePath} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="mt-20 bg-gray-100 rounded-lg w-full h-12 flex items-center justify-center">
                    {/* Like and Dislike Buttons */}
                    <button className="mx-2">
                        <svg
                            className="h-6 w-6 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 8a3 3 0 00-3 3v3a3 3 0 003 3h5a3 3 0 003-3V9H8.5V4H8a1 1 0 00-1 1v3H5zM4 8H2V7a1 1 0 011-1h1v2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button className="mx-2">
                        <svg
                            className="h-6 w-6 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15 12a3 3 0 01-3 3H7a3 3 0 01-3-3V9a3 3 0 013-3h5a3 3 0 013 3v3zM16 11h2V9a1 1 0 00-1-1h-1v3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">Currently:</h3>
                    <p className="mt-2 text-gray-600">90% Chance of Crying<br />Immediate Attention needed!<br />Duration: 6mins</p>
                </div>
            </div>
        </div>
        // </div>
        //     <div className="video-player">
        //     <h1>{title}</h1>
        //     <video controls>
        // <source src={filePath} type="video/mp4" />
        //         Your browser does not support the video tag.
        //     </video>
    );
};

export default VideoPlayer;
