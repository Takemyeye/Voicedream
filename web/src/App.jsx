import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';

// Routes
import Home from './pages/home';
import Story from './pages/story';
import Speech from './pages/speech';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/story' element={<Story />} />
        <Route exact path='/speech' element={<Speech />} />
      </Routes>
    </Router>
  );
}

export default App;