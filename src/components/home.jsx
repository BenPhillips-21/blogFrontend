import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/posts', { mode: 'cors' })
            .then(response => response.json())
            .then(data => setPosts(data)) 
            .catch(error => console.error('Error fetching posts:', error));
    }, []); 

    const truncateContent = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    };

    const handleTitleClick = (postId) => {
      navigate(`/posts/${postId}`)
    };

    return (
    <>
    <h1>All Blogs</h1>
    <div className="allBlogs">
        {posts.map((post, index) => (
          <div className="blogCard" key={index}>
              <h2 onClick={() => handleTitleClick(post._id)}>{post.title}</h2>
              <p>{truncateContent(post.content, 150)}</p>
              <p>{post.user.username}</p>
              <p>{post.date_published}</p>
          </div>
        ))}
    </div>
    </>
    );
};

export default Home;
