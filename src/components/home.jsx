import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://blogapi-production-98cb.up.railway.app/posts', { mode: 'cors' })
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

    const formatDate = (originalDate) => {
      const jsDate = new Date(originalDate);
      const luxonDateTime = DateTime.fromJSDate(jsDate);
      return luxonDateTime.toLocaleString(DateTime.DATE_MED);
    }

    const handleTitleClick = (postId) => {
      navigate(`/posts/${postId}`)
    };

    return (
    <>
    <div className="papa-container">
      <div className="image-container">
        <img id='wanderer' src='https://preview.redd.it/bih0lfsoihe51.jpg?auto=webp&s=4b788bb755141f78a6059cba8e4e69947cb71951'></img>
        <h1>On Exploration</h1>
        <h4>Discovering the world through writings on the spirit of exploration.</h4>
      </div>
      <div className="allBlogs">
          {posts.map((post, index) => (
            <div className="blogCard" key={index}>
                <h2 onClick={() => handleTitleClick(post._id)}>{post.title}</h2>
                <p>{truncateContent(post.content, 200)}</p>
                <p>-- {post.user.username}</p>
                <div className='commentsAndDate'>
                  <div className='leLikes'>
                    <p>{post.comments.length}</p> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                  </svg>
                  </div>
                  <div className='leInfo'>
                    <p>{formatDate(post.date_published)}</p>
                  </div>
                </div>
            </div>
          ))}
      </div>
      <div className='footer'>
        <p>“The heart of man plans his way, but the Lord establishes his steps.”</p>
        <p>Proverbs 16:9</p>
      </div>
    </div>
    </>
    );
};

export default Home;
