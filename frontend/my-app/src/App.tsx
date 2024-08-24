import React from 'react';
import './App.css';
import Setup from './Pages/Setup/Setup';
import Photo from './Pages/Setup/Photo';
import Swipe from './Pages/Swipe/Swipe'; 
import Success from './Pages/Swipe/Success'; 
import Upload from './Pages/Upload/Upload'; 
import Profile from './Pages/Profile/Profile';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Setup />}/>
        <Route path="/photo" element={<Photo />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
