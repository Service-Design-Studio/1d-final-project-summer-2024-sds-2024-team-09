import React from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Particulars = () => {
    return (
        <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
            <div className="flex-grow overflow-auto p-4">
                <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl text-primary font-bold mb-4">Edit Your Particulars</h1>

                    <Link to="/profile">
                    <h1 className="text-2xl text-primary font-medium mb-4">Done</h1>
                    </Link>
                </div>

                <div className="flex justify-center avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full w-36 h-36">
                        <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/baymax-big-hero-6-disney.jpg"/>
                    </div>
                </div>
                
                <label htmlFor="doc" className="flex justify-center p-5">
                    <span className='text-2xl text-primary-content cursor-pointer'>Set New Photo</span>
                    <input type="file" id="doc" name="doc" accept="image/png, image/jpeg" hidden/>
                </label>


                <div className='flex justify-center py-4'>
                    <div className="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                        <div className="card h-12 px-4 flex flex-row items-center">
                            <input type="text" placeholder="First Name" 
                                className="input input-ghost w-full bg-transparent
                                focus:outline-none focus:border-none 
                                font-lato font-semibold text-xl"/>

                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg> 
                        </div>

                        <div className="divider divider-start text-white m-0 h-0">:P</div>    

                        <div className="card h-12 px-4 flex flex-row items-center">
                            <input type="text" placeholder="Last Name" 
                                className="input input-ghost w-full bg-transparent
                                focus:outline-none focus:border-none 
                                font-lato font-semibold text-xl"/>

                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg> 
                        </div>
                        <a className='font-lato text-info text-sm px-4 py-1'>Enter your name and add an optional profile picture</a>
                    </div>
                </div>

                <div className='flex justify-center py-8'>
                    <div className="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                        <div className="card h-full px-4 flex flex-row items-center">
                            <div className='flex-1 px-4 text-xl font-lato text-primary font-semibold'>Change Email</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg>
                        </div>

                        <div className="divider divider-start text-white m-0 h-0">:P</div>    

                        <div className="card h-full px-4 flex flex-row items-center">
                            <div className='flex-1 px-4 text-xl font-lato text-primary font-semibold'>Change Number</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            <Navbar />
        </div>
    );
}

export default Particulars;