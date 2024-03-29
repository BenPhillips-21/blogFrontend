import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Post from './components/post';

function App() {
  return (
    <>
      <Router>
        <Routes> 
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/:postid" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
