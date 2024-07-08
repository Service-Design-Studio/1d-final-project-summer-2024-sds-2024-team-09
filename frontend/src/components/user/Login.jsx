import React from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({ setShowLogin }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/user-home');
    };

    const backHome = () => {
        navigate('/');
    }

    return (
        <div className="font-ubuntu bg-base-100 w-full max-w-md rounded-lg p-6 py-12 justify-center">
            <button className="text-left mb-4" onClick={() => backHome()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex justify-center mb-6 py-10">
                <img src="/public/logo.png" alt="Illustration" className="w-64 h-64" />
            </div>
            <h2 className="text-3xl font-bold text-primary text-center mb-4">Welcome Back</h2>
            <p className="font-lato text-lg text-primary text-center mb-6">Log in to your account</p>
            <div className="space-y-4 mx-8">
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
            </div>
            <div className="flex justify-between items-center mt-4 mx-8">
                <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-indigo-500 hover:underline">Forget Password</a>
            </div>
            <div className="space-y-4 mx-8 mt-2">
                <button
                    className="w-full bg-info text-white py-2 px-4 rounded mt-6 hover:bg-info-600"
                    onClick={handleNavigate}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
