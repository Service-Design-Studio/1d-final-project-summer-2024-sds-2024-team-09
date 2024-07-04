import React, { useState, useEffect } from 'react';
import Login from './user/Login';
import Signup from './user/SignUp';
import Loading from './user/Loading';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000); // 4 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? <Loading /> : (showLogin ? <Login setShowLogin={setShowLogin} /> : <Signup setShowLogin={setShowLogin} />)}
        </div>
    );
};

export default App;
