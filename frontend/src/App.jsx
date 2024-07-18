import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import UserPage from './components/UserPage';
import CameraPage from './components/CameraPage';
import Home from './components/mobile-app/Home';
import ProfilePage from './components/ProfilePage';
import Particulars from './components/profiles/Particulars';
import AccSettings from './components/profiles/AccSettings';
import EditCams from './components/profiles/EditCams';
import CameraDetails from './components/mobile-app/CameraDetails';
import VideoRecording from './components/VideoRecording';
import HistoriesPage from './components/HistoriesPage';
import VideoPlayer from './components/mobile-app/VideoPlayer';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/camera/:id" element={<CameraDetails />} />
        <Route path="/user-home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/particulars" element={<Particulars />} />
        <Route path="/profile/accsettings" element={<AccSettings />} />
        <Route path="/profile/editcams" element={<EditCams />} />
        <Route path="/vidrecord" element={<VideoRecording />} />
        <Route path="/histories" element={<HistoriesPage />} />
        <Route path="/video/:title/:filePath" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
