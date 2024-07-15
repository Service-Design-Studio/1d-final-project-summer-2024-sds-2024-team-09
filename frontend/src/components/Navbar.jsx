import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 flex justify-around items-center rounded-t-lg">
            <NavItem icon={<FaHome />} label="Home" to="/user-home" />
            <NavItem icon={<FaHistory />} label="History" to="/histories" />
            <NavItem icon={<FaChartBar />} label="Statistics" />
            <NavItem icon={<FaUser />} label="Profile" to="/profile"/>
        </div>
    );
};

const NavItem = ({ icon, label, to }) => {
    return (
        <Link to={to} className="flex flex-col items-center">
            <div className="text-2xl text-primary mb-1">{icon}</div>
            <span className=" font-lato text-primary font-bold text-xs">{label}</span>
        </Link>
    );
};

export default Navbar;
