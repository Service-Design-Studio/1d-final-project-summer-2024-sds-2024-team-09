import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoTable = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    }, []);

    return (
        <div>
            <h1>All Videos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Url Link</th>
                        <th>User ID</th>
                        <th>Created At</th>
                        <th>Is Critical?</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(video => (
                        <tr key={video.id}>
                            <td>{video.id}</td>
                            <td>{video.title}</td>
                            <td><a href={video.file_path}>{video.file_path}</a></td>
                            <td>{video.user_id}</td>
                            <td>{new Date(video.created_at).toLocaleString()}</td>
                            <td>{video.is_critical ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VideoTable;
