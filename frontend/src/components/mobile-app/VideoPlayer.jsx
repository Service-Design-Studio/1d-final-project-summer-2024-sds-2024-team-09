import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
    const { filePath, title } = useParams();

    return (
        <div className="video-player">
            <h1>{title}</h1>
            <video controls>
                <source src={filePath} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
