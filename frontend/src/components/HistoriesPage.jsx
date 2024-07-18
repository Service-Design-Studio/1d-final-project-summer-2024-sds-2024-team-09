import React, { useState, useEffect } from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import Modal from 'react-modal'; // Import Modal from react-modal
import Navbar from './Navbar';
import HistoryItem from './histories/HistoryItem'; // Ensure the path is correct based on your folder structure

const NavItem = ({ icon, label, to }) => (
    <Link to={to} className="flex flex-col items-center">
        {icon}
        <span>{label}</span>
    </Link>
);

const HistoriesPage = () => {
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [isEditing, setIsEditing] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    }, []); // Empty array ensures this effect runs only once

    const sortVideos = [...videos].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleEditClick = (video) => {
        setIsEditing(true);
        setCurrentVideo(video);
    };

    const handleItemClick = (video) => {
        setCurrentVideo(video);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideo(null);
    };

    return (
        <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
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
                            title={video.title}
                            time={new Date(video.created_at).toLocaleString()} // Adjust time format as needed
                            isCritical={video.is_critical}
                            file_path={video.file_path}
                            onClick={() => handleItemClick(video)}
                        />
                    </div>
                ))}
            </div>
            <Navbar />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Video Modal"
                className="modal"
                overlayClassName="overlay"
            >
                {currentVideo && (
                    <div>
                        <h2>{currentVideo.title}</h2>
                        <video controls>
                            <source src={currentVideo.file_path} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <button onClick={closeModal} className="bg-gray-500 text-white p-2 mt-2">Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default HistoriesPage;
