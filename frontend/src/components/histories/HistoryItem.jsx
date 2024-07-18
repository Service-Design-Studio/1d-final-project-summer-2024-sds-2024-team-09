// HistoryItem.jsx
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const HistoryItem = ({ title, time, isCritical, file_path, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer flex items-center justify-between bg-neutral px-3 py-4 mb-2 rounded-lg shadow ${isCritical ? 'border-2 border-red-500' : 'bg-gray-100'}`}
        >
            <div className="flex items-center">
                <div className="w-24 h-14 bg-gray-300 rounded mr-4"></div>
                <div>
                    <h2 className=""><a className="" href={file_path}>{title}</a></h2>
                    <p className="text-sm text-gray-600">{time}</p>
                </div>
            </div>
            <div className="flex items-center">
                {isCritical && <FaExclamationCircle className="text-red-500 mr-4" />}
                <div className="text-gray-600">...</div>
            </div>
        </div>
    );
};

export default HistoryItem;
