import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ JWT, setJWT }) => {
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const navigate = useNavigate();

    useEffect(() => {
        console.log(JWT)
        fetch('http://localhost:5000/posts', { mode: 'cors' })
            .then(response => response.json())
            .then(data => setPosts(data)) 
            .catch(error => console.error('Error fetching posts:', error));
    }, []); 
    console.log(posts)

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
    <div class="image-container">
      <img id='wanderer' src='https://preview.redd.it/bih0lfsoihe51.jpg?auto=webp&s=4b788bb755141f78a6059cba8e4e69947cb71951'></img>
      <h1>On Exploration</h1>
      <h4>Exploring the world through essays and writings on the spirit of exploration.</h4>
    </div>
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
