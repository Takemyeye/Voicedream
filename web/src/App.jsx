import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';

// Routes
import Home from './pages/home';
import Story from './pages/story';
import Speech from './pages/voice';
import VoiceDream from './pages/voiceDream';
import Auth from './pages/auth/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/story' element={<Story />} />
        <Route exact path='/speech' element={<Speech />} />
        <Route exact path='/create' element={<VoiceDream />} />
      </Routes>
    </Router>
  );
}

export default App;