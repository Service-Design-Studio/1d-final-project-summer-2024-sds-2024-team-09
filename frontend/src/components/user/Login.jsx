import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleNavigate = () => {
        navigate('/user-home');
    };

    const backHome = () => {
        navigate('/');
    }

    const handleSignupNavigation = () => {
        setShowLogin(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/v1/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameOrEmail, email: usernameOrEmail, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                handleNavigate(); // Redirect to user home page;
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div className="font-ubuntu bg-base-100 w-full max-w-md rounded-lg p-6 py-12 justify-center">
            <button aria-label="close" className="text-left mb-4" onClick={backHome}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex justify-center">
                <img src="/public/logo.png" alt="Illustration" className="w-64 h-64" />
            </div>
            <h2 className="text-3xl font-bold text-primary text-center mb-4">Welcome Back</h2>
            <p className="font-lato text-lg text-primary text-center mb-6">Log in to your account</p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="space-y-4 mx-8">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        type="submit"
                        className="w-full bg-info text-white py-2 px-4 rounded mt-6 hover:bg-info-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
