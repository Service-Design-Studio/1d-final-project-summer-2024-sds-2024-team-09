import React from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({ setShowLogin }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/user-home');
    };

    return (
        <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6">Welcome</h2>
            <p className="mb-6">Get started right now to grab a discount of 70% on our services</p>
            <button className="w-full bg-black text-white py-2 px-4 mb-4 rounded" onClick={() => setShowLogin(false)}>
                Login
            </button>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded" onClick={() => setShowLogin(false)}>
                Sign-up
            </button>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded" onClick={() => handleNavigate()}>
                Go to Home Page
            </button>
        </div>
    );
};

export default Login;
