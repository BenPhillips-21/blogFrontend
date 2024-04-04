import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

const Post = ({ JWT, setJWT }) => {
const [response, setResponse] = useState('')
const [loading, setLoading] = useState(false)
const [title, setTitle] = useState('')
const [blogContent, setBlogContent] = useState('')
const [update, setUpdate] = useState('closed')
const [admin, setAdmin] = useState(false)
const [content, setContent] = useState('')
const navigate = useNavigate();

const { postid } = useParams();

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

useEffect(() => {
  // This effect will also run when the component mounts
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

  const openUpdate = async (e) => {
    e.preventDefault()
    if (update === 'closed') {
      setUpdate('open')
    } else {
      setUpdate('closed')
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

  const formatDate = (originalDate) => {
    const jsDate = new Date(originalDate);
    const luxonDateTime = DateTime.fromJSDate(jsDate);
    return luxonDateTime.toLocaleString(DateTime.DATE_MED);
  }

  return (
    <>
      <div>
        {loading ? (
          <>
            <div className='postContainer'>
              <div className='contentContainer'>
                <h1>{title}</h1>
                <p>{blogContent}</p>
                <p>Written by {response.user.username}</p>
                <p>Published on {formatDate(response.date_published)}</p>
              </div>
              { JWT ? 
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
              </div> : ''
              }
            </div>
            {response.comments.map((comment, index) => (
              <div className="commentSection" key={index}>
                <p>{comment.content}</p>
                <p>- {comment.user.username}, {formatDate(comment.date_published)}</p>
                {admin === true ? <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button> : ''}
              </div>
            ))}
            {admin === true ?
              <div className='updateButtons'>
                <button onClick={handleDeletePost}>Delete Post</button>
                <button onClick={openUpdate}>Update Post</button>
              </div>
              : ''}
            {update === 'open' ? 
              <div className='formCont'>
                <form onSubmit={handlePostUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <label>Title: </label>
                  <textarea 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows="1" 
                    cols="50"
                  />
                  <label>Blog Content: </label>
                  <textarea 
                    type="text"
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    rows="10" 
                    cols="70"
                  />
                  <button>Update Blog</button>
                </form>
              </div>
              : ''}
          </>
        ) : (
          <h2>Loading Blog...</h2>
        )}
      </div>
    </>
  
  )  
        }
  export default Post

