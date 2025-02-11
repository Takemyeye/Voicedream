import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import './app.css';
// Routes
import Home from './components/home/home';
import Login from './components/login/login';
import Profile from './components/profile/profile';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;