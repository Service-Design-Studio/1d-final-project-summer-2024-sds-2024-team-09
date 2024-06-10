import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LiveViewPage from './LiveViewPage';
import AdminPage from './AdminPage';
import CameraPage from './CameraPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live-view" element={<LiveViewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/camera" element={<CameraPage />} />
      </Routes>
    </Router>
  );
};

export default App;