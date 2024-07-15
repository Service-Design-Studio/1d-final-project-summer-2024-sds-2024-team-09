import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import UserPage from './components/UserPage';
import CameraPage from './components/CameraPage';
import HistoryPage from './components/HistoryPage';
import RecordPage from './components/RecordPage';
import HistoriesPage from './components/HistoriesPage';
import Home from './components/mobile-app/Home';
import ProfilePage from './components/ProfilePage';
import Particulars from './components/profiles/Particulars';
import AccSettings from './components/profiles/AccSettings';
import EditCams from './components/profiles/EditCams';
import CameraDetails from './components/mobile-app/CameraDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/camera/:id" element={<CameraDetails />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/histories" element={<HistoriesPage />} />
        <Route path="/user-home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/particulars" element={<Particulars />} />
        <Route path="/profile/accsettings" element={<AccSettings />} />
        <Route path="/profile/editcams" element={<EditCams />} />
      </Routes>
    </Router>
  );
}

export default App;
