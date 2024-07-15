import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setShowLogin }) => {
    return (
        <div className="font-ubuntu bg-base-100 w-full max-w-md rounded-lg p-6 py-6 justify-center">
            <button aria-label="close" className="text-left mb-4" onClick={() => setShowLogin(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex justify-center mb-4">
                <img src="/public/others/crybaby.png" alt="Illustration" className="w-48 h-48" />
            </div>

            <h2 className="text-3xl font-bold text-primary text-center mb-3">Sign Up</h2>

            <h3 className="text-md text-primary text-center mb-6">Create an account</h3>

            <div className="space-y-4 mx-8">
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
                <input
                    type="text"
                    placeholder="Email Address"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-neutral w-full px-6 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-info"
                />
            </div>

            <div className="space-y-4 mx-8 mt-2">
                <button className="w-full bg-info text-white py-2 px-4 rounded mt-6 hover:bg-info-600 rounded-full">
                    Create Account
                </button>
            </div>

            <p className="mt-4 text-center">
                Already a member?{' '}
                <button className="text-blue-500" onClick={() => setShowLogin(true)}>
                    Log in
                </button>

                <div className='space-y-4 mx-8 mt-2'>
                    <div className="flex w-full flex-col border-opacity-50">
                        <div className="divider">OR</div>
                    </div>
                </div>

                <div className="space-y-4 mx-8 mt-2">
                    <button className="w-full bg-blue-500 text-white text-center py-2 px-4 mb-4 btn no-animation">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                            <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
                        </svg>
                        Sign up with Facebook
                    </button>
                </div>

            </p>
        </div>
    );
};

export default Signup;
