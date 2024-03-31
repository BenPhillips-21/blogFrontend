import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Post from './components/post';
import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes> 
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/:postid" element={<Post />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
