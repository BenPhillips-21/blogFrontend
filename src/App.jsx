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
import CreatePost from './components/createPost';

function App() {
  const [JWT, setJWT] = useState('')

  return (
    <>
      <Router>
        <Navbar />
          <Routes> 
            <Route path="/users/register" element={<Register JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/users/login" element={<Login JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/posts" element={<Home JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/posts/:postid" element={<Post JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/posts/create" element={<CreatePost JWT={JWT} setJWT={setJWT}/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
