import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import CameraPage from './components/CameraPage';
import CameraBroadcastPage from './components/CameraBroadcastPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/camera" element={<CameraPage />} />
                <Route path="/camera-broadcast" element={<CameraBroadcastPage />} />
            </Routes>
        </Router>
    );
}

export default App;
