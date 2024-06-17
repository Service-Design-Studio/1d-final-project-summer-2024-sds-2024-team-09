// app/javascript/packs/application.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from '../components/IndexPage';
import CameraBroadcastPage from '../components/CameraBroadcastPage';
import CameraPage from '../components/CameraPage';
import UserPage from '../components/UserPage';

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        createRoot(rootElement).render(
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/camera-broadcast" element={<CameraBroadcastPage />} />
                    <Route path="/camera" element={<CameraPage />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </Router>
        );
    }
});
