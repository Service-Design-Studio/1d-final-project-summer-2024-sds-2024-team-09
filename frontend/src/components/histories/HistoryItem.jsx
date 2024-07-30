import React, { useState } from 'react';
import { FaExclamationCircle, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HistoryItem = ({ id, title, time, isCritical, file_path, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleEdit = () => {
        setShowMenu(false);
        onEdit(id);
    };

    const handleDelete = () => {
        setShowMenu(false);
        onDelete(id);
    };

    const handleView = () => {
        navigate(`/video/${encodeURIComponent(title)}/${encodeURIComponent(file_path)}`);
    };

    return (
        <div className={`cursor-pointer flex items-center justify-between bg-neutral px-3 py-4 mb-2 rounded-lg shadow ${isCritical ? 'border-2 border-red-500' : 'bg-gray-100'}`}>
            <div className="flex items-center">
                <div className="w-24 h-14 bg-gray-300 rounded mr-4"></div>
                <div onClick={handleView}>
                    <h2 className="">{title}</h2>
                    <p className="text-sm text-gray-600">{time}</p>
                </div>
            </div>
            <div className="relative flex items-center">
                {isCritical && <FaExclamationCircle className="text-red-500 mr-4" />}
                <div className="text-gray-600" onClick={toggleMenu}>
                    <FaEllipsisV />
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                            <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleEdit}>Edit</button>
                            <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
