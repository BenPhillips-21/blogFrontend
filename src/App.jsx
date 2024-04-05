import { useState, useEffect } from 'react';
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
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/detail`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${JWT}`
            }
        })
  
        if (!response.ok) {
          setAdmin(false)
        } else {
          setAdmin(true)
        }    
    } catch (err) {
        console.log(err)
    }
    }
    fetchAdmin();
  }, [JWT]);

  return (
    <>
      <Router>
        <Navbar JWT={JWT} setJWT={setJWT} admin={admin} setAdmin={setAdmin}/>
          <Routes> 
            <Route path="/users/register" element={<Register JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/users/login" element={<Login JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/posts" element={<Home JWT={JWT} setJWT={setJWT}/>} />
            <Route path="/posts/:postid" element={<Post JWT={JWT} setJWT={setJWT} admin={admin} setAdmin={setAdmin}/>} />
            <Route path="/posts/create" element={<CreatePost JWT={JWT} setJWT={setJWT}/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
