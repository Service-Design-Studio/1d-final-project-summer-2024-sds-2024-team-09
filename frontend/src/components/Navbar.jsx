import React from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 flex justify-around items-center rounded-t-lg">
            <NavItem icon={<FaHome />} label="Home" />
            <NavItem icon={<FaHistory />} label="History" />
            <NavItem icon={<FaChartBar />} label="Statistics" />
            <NavItem icon={<FaUser />} label="Profile" />
        </div>
    );
};

const NavItem = ({ icon, label }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl text-primary mb-1">{icon}</div>
            <span className=" font-lato text-primary font-bold text-xs">{label}</span>
        </div>
    );
};

export default Navbar;
