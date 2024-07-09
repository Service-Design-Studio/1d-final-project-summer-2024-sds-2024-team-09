import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setShowLogin }) => {


    return (
        <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
            <button className="w-full bg-blue-500 text-white py-2 px-4 mb-4 rounded">
                Sign up with Facebook
            </button>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone No.
                </label>
                <input
                    id="phone"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded">
                Create account
            </button>
            <p className="mt-4">
                Already a member?{' '}
                <button className="text-blue-500" onClick={() => setShowLogin(true)}>
                    Log in
                </button>
            </p>
        </div>
    );
};

export default Signup;
