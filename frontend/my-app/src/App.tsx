import React from 'react';
import './App.css';
import Setup from './Pages/Setup/Setup';
import Photo from './Pages/Setup/Photo';
import Preview from './Pages/Setup/Preview';
import Swipe from './Pages/Swipe/Swipe'; 
import Match from './Pages/Swipe/Match'; 
import NoMatch from './Pages/Swipe/NoMatch'; 
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
        <Route path="/preview" element={<Preview />}/>
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/match" element={<Match />} />
        <Route path="/nomatch" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
