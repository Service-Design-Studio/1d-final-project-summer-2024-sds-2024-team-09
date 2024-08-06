import React from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const EditCams = () => {
    return (
        <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
            <div className="flex-grow overflow-auto p-4">
                <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl text-primary font-bold mb-4">Edit Camera's</h1>

                    <Link to="/profile">
                    <h1 className="text-2xl text-primary font-medium mb-4">Done</h1>
                    </Link>
                </div>

                <div className='flex justify-center py-4'>
                    <div className="card w-96 h-12 rounded-xl shadow rounded-badge flex flex-row items-center justify-between bg-white outline outline-secondary-content font-lato font-semibold text-lg text-primary">
                        <span className="px-4">Bedroom</span>
                            <div className="px-4">
                                <button className="btn btn-circle btn-outline btn-error btn-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                    </div>
                </div>

                <div className='flex justify-center py-4'>
                    <div className="card w-96 h-12 rounded-xl shadow rounded-badge flex flex-row items-center justify-between bg-white outline outline-secondary-content font-lato font-semibold text-lg text-primary">
                        <span className="px-4">Living Room</span>
                            <div className="px-4">
                                <button className="btn btn-circle btn-outline btn-error btn-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                    </div>
                </div>

                <div className='flex justify-center py-4'>
                    <div className="card w-96 h-12 rounded-xl shadow rounded-badge flex flex-row items-center justify-between bg-white outline outline-secondary-content font-lato font-semibold text-lg text-primary">
                        <span className="px-4">Child Room</span>
                            <div className="px-4">
                                <button className="btn btn-circle btn-outline btn-error btn-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                    </div>
                </div>

                <div className='flex justify-center py-4 flex flex-col items-center'>
                    <button className="btn rounded-xl btn-active btn-outline w-96 bg-white outline-neutral font-lato text-lg">+ Add New Camera</button>
                </div>

            </div>
            <Navbar />
        </div>
    );
}

export default EditCams;