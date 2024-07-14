import React from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import HistoryItem from './histories/HistoryItem'; // Ensure the path is correct based on your folder structure


// Example data for history items
const historyItems = [
    { id: 1, title: 'DistressCry-070724', time: '2 hours ago', isCritical: true },
    { id: 2, title: 'DistressCry-070724', time: '2 hours ago', isCritical: false },
    { id: 3, title: 'DistressCry-070724', time: '2 hours ago', isCritical: false },
    { id: 4, title: 'DistressCry-070724', time: '2 hours ago', isCritical: true },
    { id: 5, title: 'DistressCry-070724', time: '2 hours ago', isCritical: false },
];

const NavItem = ({ icon, label, to }) => (
    <Link to={to} className="flex flex-col items-center">
        {icon}
        <span>{label}</span>
    </Link>
);

const HistoriesPage = () => {
    return (
        <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
            <div className="flex-grow overflow-auto p-4">
                <h1 className="text-2xl text-primary font-bold mb-4">History</h1>
                <div className="flex justify-between items-center pt-2 mb-4">
                    <span className="text-gray-600">All</span>
                    <span className="text-gray-600">Sort By: Date</span>
                </div>
                {historyItems.map(item => (
                    <HistoryItem
                        key={item.id}
                        title={item.title}
                        time={item.time}
                        isCritical={item.isCritical}
                    />
                ))}
            </div>
            <Navbar />
        </div>
    );
};

export default HistoriesPage;
