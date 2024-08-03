import React from 'react';

function Welcome() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative font-ubuntu" style={{ backgroundImage: `url('/baymax.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg">
                    <h1 className="text-4xl font-bold text-white">We are Team Baymax</h1>
                    <p className="text-xl text-white mt-2">This is our cry detection app!</p>
                    <div className="mt-6 space-x-4">
                        <a href="/user" className="btn btn-primary btn-md text-white mx-2">User Page</a>
                        <a href="/camlogin" className="btn btn-secondary text-black btn-md mx-2">Camera Page</a>
                        <a href="https://github.com" className="btn btn-secondary text-black btn-md mx-2">Github</a>
                        <a href="https://sites.google.com/mymail.sutd.edu.sg/teambaymax/home?authuser=4" className="btn btn-secondary text-black btn-md mx-2">Website</a>
                    </div>
                </div>
            </div>
        </div>
        // <div className="container mt-5">
        //     <div className="text-center">
        //         <h1 className="display-4">Welcome to Baymax</h1>
        //         <p className="lead">Monitor and manage your devices seamlessly.</p>
        //         <div className="d-flex justify-content-center mt-4">

        //             <a href="/history" className="btn btn-secondary text-black btn-lg mx-2">History</a>
        //             <a href="/record" className="btn btn-secondary text-black btn-lg mx-2">Record</a>
        //             <a href="/histories" className="btn btn-secondary text-black btn-lg mx-2">Histories</a>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Welcome;
