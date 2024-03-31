import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = ({ JWT, setJWT }) => {
const [response, setResponse] = useState('')
const [loading, setLoading] = useState(false)

const { postid } = useParams();
let idNumber = parseInt(postid);
console.log(idNumber)

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postid}`);
      const result = await response.json();
      setResponse(result);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); 
}, []); 

console.log(response)

    return (
    <>
      <div>
        {loading ? (
          <>
            <h1>{response.title}</h1>
            <p>{response.content}</p>
            <p>Written by {response.user.username}</p>
            <p>Published on {response.date_published}</p>
            <button>Delete Post</button>
            {/* ^ yet to be implemented ^ */}
            {response.comments.map((comment, index) => (
          <div className="commentSection" key={index}>
              <p>{comment.content}</p>
              <p>{comment.user.username}</p>
              <p>{comment.date_published}</p>
          </div>
        ))}
          </>
        ) : (
          <h2>Loading Blog...</h2>
        )}
      </div>
    </>
    )

}

export default Post