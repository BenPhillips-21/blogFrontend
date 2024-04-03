import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = ({ JWT, setJWT }) => {
const [response, setResponse] = useState('')
const [loading, setLoading] = useState(false)
const navigate = useNavigate();
console.log(JWT)

const { postid } = useParams();
let idNumber = parseInt(postid);
console.log(idNumber, "idNumber")

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

  const handleDeletePost = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/posts/delete/${postid}`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          }
      })

      if (!response.ok) {
        const errorData = await response.json(); // Parsing JSON here
        console.log(errorData);
        throw new Error("Network response was not ok :/");
      }      

      console.log('Post deleted successfully')
      navigate(`/posts`)
  } catch (err) {
      console.log(err)
  }
  }

  const handleDeleteComment = async (commentid) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postid}/comments/delete/${commentid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JWT}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Network response was not ok :/");
      }
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

    return (
    <>
      <div>
        {loading ? (
          <>
            <h1>{response.title}</h1>
            <p>{response.content}</p>
            <p>Written by {response.user.username}</p>
            <p>Published on {response.date_published}</p>
            <button onClick={handleDeletePost}>Delete Post</button>
            {response.comments.map((comment, index) => (
          <div className="commentSection" key={index}>
              <p>{comment.content}</p>
              <p>{comment.user.username}</p>
              <p>{comment.date_published}</p>
              <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
          </div>
        ))}
            <button>Create Comment</button>
          </>
        ) : (
          <h2>Loading Blog...</h2>
        )}
      </div>
    </>
    )

}

export default Post