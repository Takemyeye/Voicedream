import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';

// Routes
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;