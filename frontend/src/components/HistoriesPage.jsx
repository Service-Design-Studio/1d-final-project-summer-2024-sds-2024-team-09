import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Navbar from './Navbar';
import HistoryItem from './histories/HistoryItem';
import config from '../../config';

const HistoriesPage = () => {
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [editedDetails, setEditedDetails] = useState({ title: '', file_path: '', duration: '', is_critical: false, user_id: '' });

    // console.log(localStorage.getItem('user-data'));

    useEffect(() => {
        const userId = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')).id : null;
        axios.get(`${config.API_BASE_URL}/api/v1/videos?user_id=${userId}`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    }, []);

    const sortVideos = [...videos].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleEdit = (id) => {
        const video = videos.find(video => video.id === id);
        setCurrentVideo(video);
        setEditedDetails({
            title: video.title || '',
            file_path: video.file_path || '',
            duration: video.duration || '',
            is_critical: video.is_critical || false,
            user_id: video.user_id || ''
        });
        setModalIsOpen(true);
        console.log('Modal should open, ' + modalIsOpen);
    };

    const handleDelete = (id) => {
        axios.delete(`${config.API_BASE_URL}/api/v1/videos/${id}`)
            .then(response => {
                setVideos(videos.filter(video => video.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the video!', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedDetails(prevDetails => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/v1/videos/${currentVideo.id}`, editedDetails)
            .then(response => {
                setVideos(videos.map(video => video.id === currentVideo.id ? response.data : video));
                setModalIsOpen(false);
                setCurrentVideo(null);
            })
            .catch(error => {
                console.error('There was an error updating the video!', error);
            });
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideo(null);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="items-center rounded-lg p-6">
                <div className="flex-grow overflow-auto p-4">
                    <h1 className="text-2xl text-primary font-bold mb-4">History</h1>
                    <div className="flex justify-between items-center pt-2 mb-4">
                        <span className="text-gray-600">All</span>
                        <button onClick={toggleSortOrder} className="text-gray-600">
                            Sort By: Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                        </button>
                    </div>
                    {sortVideos.map(video => (
                        <div key={video.id} className="mb-4">
                            <HistoryItem
                                id={video.id}
                                title={video.title}
                                time={new Date(video.created_at).toLocaleString()} // Adjust time format as needed
                                isCritical={video.is_critical}
                                file_path={video.file_path}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
                <Navbar />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit Video"
                    className="modal"
                    overlayClassName="overlay"
                    ariaHideApp={false}
                >
                    {currentVideo && (
                        <div>
                            <h2>Edit Video</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedDetails.title}
                                        onChange={handleInputChange}
                                        className="border p-1"
                                    />
                                </div>
                                <div>
                                    <label>File Path:</label>
                                    <input
                                        type="text"
                                        name="file_path"
                                        value={editedDetails.file_path}
                                        onChange={handleInputChange}
                                        className="border p-1"
                                    />
                                </div>
                                <div>
                                    <label>Duration:</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={editedDetails.duration}
                                        onChange={handleInputChange}
                                        className="border p-1"
                                    />
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="is_critical"
                                            checked={editedDetails.is_critical}
                                            onChange={handleInputChange}
                                        />
                                        Critical
                                    </label>
                                </div>
                                <div>
                                    <label>User ID:</label>
                                    <input
                                        type="text"
                                        name="user_id"
                                        value={editedDetails.user_id}
                                        onChange={handleInputChange}
                                        className="border p-1"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Save</button>
                                <button onClick={closeModal} className="bg-gray-500 text-white p-2 mt-2 ml-2">Cancel</button>
                            </form>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default HistoriesPage;
