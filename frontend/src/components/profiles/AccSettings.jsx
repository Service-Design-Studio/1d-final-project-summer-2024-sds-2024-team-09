import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const AccSettings = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
            <div className="flex-grow overflow-auto p-4">
                <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl text-primary font-bold mb-4">Edit Your Account Settings</h1>

                    <Link to="/profile">
                        <h1 className="text-2xl text-primary font-medium mb-4">Done</h1>
                    </Link>
                </div>

                <div className='flex justify-center py-4'>
                    <div className="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                        <div className="card h-12 px-4 flex flex-row items-center">
                            <input type="text" placeholder="Username"
                                className="input input-ghost w-full bg-transparent focus:outline-none focus:border-none font-lato font-regular text-xl placeholder-primary" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg>
                        </div>

                        <div className="divider divider-start text-white m-0 h-0">:P</div>

                        <div className="card h-12 px-4 flex flex-row justify-between items-center">
                            <input type={passwordVisible ? "text" : "password"} placeholder="Password"
                                className="input input-ghost w-full bg-transparent focus:outline-none focus:border-none font-lato font-regular text-xl placeholder-primary" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none"
                                onClick={togglePasswordVisibility} className="cursor-pointer">
                                <path fill="#C3C6CF"
                                    d={
                                        passwordVisible
                                            ? "M10 2C6.13 2 2.73 4.11 1 7.5C2.73 10.89 6.13 13 10 13C13.87 13 17.27 10.89 19 7.5C17.27 4.11 13.87 2 10 2ZM10 11C8.34 11 7 9.66 7 8C7 6.34 8.34 5 10 5C11.66 5 13 6.34 13 8C13 9.66 11.66 11 10 11ZM10 6.5C9.17 6.5 8.5 7.17 8.5 8C8.5 8.83 9.17 9.5 10 9.5C10.83 9.5 11.5 8.83 11.5 8C11.5 7.17 10.83 6.5 10 6.5Z"
                                            : "M19.71 18.29L15.3 13.88C14.57 14.39 13.81 14.82 13 15.17V17H7V15.17C4.88 14.39 2.88 12.88 1.3 11.12L0 12.42L1.41 13.83C3.21 15.61 6.4 18.5 10 18.5C13.6 18.5 16.79 15.61 18.59 13.83L20 12.42L19.71 12.12L19.71 18.29ZM12.83 10.5H7.17L12.83 15.5H12.83V10.5ZM19.41 8.41L18 7C16.2 5.21 13.01 2.32 9.41 2.32C5.81 2.32 2.62 5.21 0.82 7L0 7.82L1.41 9.23C3.21 11.02 6.4 13.91 10 13.91C13.6 13.91 16.79 11.02 18.59 9.23L20 7.82L19.41 8.41Z"
                                    }
                                />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg>
                        </div>
                        <a className='font-lato text-info text-sm px-4 py-1'>Change your username and view your current password</a>
                    </div>
                </div>

                <div className='flex flex-col items-center py-8'>
                    <div className='w-96'>
                        <h1 className="text-2xl text-primary font-bold mb-4 px-4 text-left">Change your Password</h1>
                        
                        <input type="text" placeholder="Current Password" 
                        class="input w-full max-w shadow focus:shadow shadow-neutral focus:shadow-neutral font-lato text-lg font-normal gap-4
                        bg-white focus:outline-none border-secondary-content focus:border-secondary-content"/>
                        
                        <div className='py-2'></div>

                        <input type="text" placeholder="New Password" 
                        class="input w-full max-w shadow focus:shadow shadow-neutral focus:shadow-neutral font-lato text-lg font-normal
                        bg-white focus:outline-none border-secondary-content focus:border-secondary-content"/>

                        <div className='py-2'></div>

                        <input type="text" placeholder="Retype Password" 
                        class="input w-full max-w shadow focus:shadow shadow-neutral focus:shadow-neutral font-lato text-lg font-normal
                        bg-white focus:outline-none border-secondary-content focus:border-secondary-content"/>

                        <div className='py-4'></div>
                        
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary font-ubunut font-bold text-xl">
                            Change Password
                        </button>

                        <div className='py-10'></div>

                        <button type="submit" className="w-full bg-error text-white py-2 rounded-full hover:bg-error font-ubunut font-bold text-xl">
                            Delete Account
                        </button>
                    </div>
                </div>

            </div>
            <Navbar />
        </div>
    );
}

export default AccSettings;
