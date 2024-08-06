import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const VideoPlayer = () => {
    const { filePath, title } = useParams();
    console.log('filePath:', filePath);
    console.log('title:', title);
    const maxLength = 100;
    const truncatedTitle = truncateText(title, maxLength);
    const extension = "webm";
    // const extension = filePath.split('.').pop();
    const file_path_url = `https://storage.googleapis.com/video-upload-jya/${title}.${extension}`;

    console.log('file_path_url:', file_path_url);

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
                    <h2 className="mt-4 px-10 text-lg font-extrabold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                        {truncatedTitle}
                    </h2>
                </div>
                <div className="mt-16 bg-gray-100 rounded-lg w-full h-40 flex items-center justify-center">
                    <div className="video-player flex items-center justify-center mt-4">
                        <video controls>
                            <source src={file_path_url} type="video/mp4" />
                            <source src={file_path_url} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="mt-20 bg-gray-100 rounded-lg w-full h-12 flex items-center justify-center">
                    <button className=" border border-green-500 rounded-md flex items-center text-green-700 hover:text-green-800 mx-2">
                        <span className="mx-2">Like</span>
                    </button>
                    <button className="border border-yellow-500 rounded-md flex items-center text-yellow-700 hover:text-yellow-800 mx-2">
                        <span className="mx-2">Flag</span>
                    </button>
                    <button className="border border-red-500 rounded-md flex items-center text-red-700 hover:text-red-800 mx-2">
                        <span className="mx-2">Dislike</span>
                    </button>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">Currently:</h3>
                    <p className="mt-2 text-gray-600">90% Chance of Crying<br />Immediate Attention needed!<br />Duration: 6mins</p>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
