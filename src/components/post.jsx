import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = ({ JWT, setJWT }) => {
const [response, setResponse] = useState('')
const [loading, setLoading] = useState(false)
const [title, setTitle] = useState('')
const [blogContent, setBlogContent] = useState('')
// const [commenting, setCommenting] = useState(false)
const [content, setContent] = useState('')
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
      setTitle(result.title)
      setBlogContent(result.content)
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

  const handlePostUpdate = async (e) => {
    e.preventDefault()

    const updatedPost = { title, blogContent }
    console.log(updatedPost)
    try {
      const response = await fetch(`http://localhost:5000/posts/update/${postid}`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          },
          body: JSON.stringify(updatedPost)
      })

      if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error("Network response was not ok :/");
        }  

      console.log('Post created successfully')
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

  const handleCommentPost = async (e) => {
    e.preventDefault()

    let newComment = { content }
    try {
      const response = await fetch(`http://localhost:5000/posts/${postid}/comment/create`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          },
          body: JSON.stringify(newComment)
      })

      if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error("Network response was not ok :/");
        }  

      console.log('Comment created successfully')
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
            {/* <h1>{response.title}</h1>
            <p>{response.content}</p> */}
            <h1>{title}</h1>
            <p>{blogContent}</p>
            <p>Written by {response.user.username}</p>
            <p>Published on {response.date_published}</p>
            <button onClick={handleDeletePost}>Delete Post</button>
            <button>Update Post</button>
            {/* update post should setupdating to true then open the text areas.... */}
            <form onSubmit={handlePostUpdate}>
                <textarea 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    type="text"
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                />
                <button>Update Blog</button>
            </form>
            {response.comments.map((comment, index) => (
          <div className="commentSection" key={index}>
              <p>{comment.content}</p>
              <p>{comment.user.username}</p>
              <p>{comment.date_published}</p>
              <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
          </div>
        ))}
            <div className='commentForm'>
                    <form onSubmit={handleCommentPost}>
                        <textarea 
                            type="text"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button>Publish Comment</button>
                    </form>
                </div>
          </>
        ) : (
          <h2>Loading Blog...</h2>
        )}
      </div>
    </>
    )

}

export default Post