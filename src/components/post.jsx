import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import ButtonImage from '/like-button.png'

const Post = ({ JWT, admin }) => {
const [response, setResponse] = useState('')
const [loading, setLoading] = useState(false)
const [title, setTitle] = useState('')
const [blogContent, setBlogContent] = useState('')
const [update, setUpdate] = useState('closed')
const [content, setContent] = useState('')
const navigate = useNavigate();

const { postid } = useParams();

const fetchData = async () => {
  try {
    const response = await fetch(`https://blogapi-production-98cb.up.railway.app/posts/${postid}`);
    const result = await response.json();
    setResponse(result);
    setTitle(result.title)
    setBlogContent(result.content)
    setLoading(true);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData(); 
}, []); 

  const handleDeletePost = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://blogapi-production-98cb.up.railway.app/posts/delete/${postid}`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          }
      })

      if (!response.ok) {
        const errorData = await response.json(); // Parsing JSON here
        throw new Error(`${errorData}`);
      }      
      navigate(`/posts`)
  } catch (err) {
    throw new Error(`${err}`);
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
    let content = blogContent
    const updatedPost = { title, content }
    try {
      const response = await fetch(`https://blogapi-production-98cb.up.railway.app/posts/update/${postid}`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          },
          body: JSON.stringify(updatedPost)
      })

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData}`);
        }  

      navigate(`/posts`)
  } catch (err) {
    throw new Error(`${err}`);
  }
  }

  const handleDeleteComment = async (commentid) => {
    try {
      const response = await fetch(`https://blogapi-production-98cb.up.railway.app/posts/${postid}/comments/delete/${commentid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JWT}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData}`);
      }

      fetchData(); 

    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  const handleCommentPost = async (e) => {
    e.preventDefault()

    let newComment = { content }
    try {
      const response = await fetch(`https://blogapi-production-98cb.up.railway.app/posts/${postid}/comment/create`, {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JWT}`
          },
          body: JSON.stringify(newComment)
      })

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData}`);
        }  

      fetchData(); 
      setContent('');
  } catch (err) {
    throw new Error(`${err}`);
  }
  }

  const addLike = async (commentid) => {
    try {
        await fetch(`https://blogapi-production-98cb.up.railway.app/posts/${postid}/comments/like/${commentid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        });
        fetchData();
    } catch (err) {
      throw new Error(`${err}`);
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
              <h2>Comments: </h2>
              { JWT ? 
              <div className='commentForm'>
                <form onSubmit={handleCommentPost}>
                  <textarea
                    rows="2"
                    cols="60" 
                    type="text"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button>Publish Comment</button>
                </form>
              </div> 
              : 
                <div><h3>Register and login to post and like comments</h3></div>
              }
            </div>
            {response.comments.length > 0 ? (
              <div>
                {response.comments.map((comment, index) => (
                  <div className="commentSection" key={index}>
                    <p>{comment.content}</p>
                    <div className='likesContainer'>
                      <div className='leLikes'>
                      <p>{comment.likeCount}</p>
                      <button style={{ marginLeft: '-0.8rem', marginTop: '0.1rem'}} onClick={() => addLike(comment._id)}><img src={ButtonImage} style={{ width: '0.8rem' }} alt="Button Image" /></button>
                    </div>
                  <div className='leInfo'>
                      <p>-- {comment.user.username}, {formatDate(comment.date_published)}</p>
                  </div>
                    </div>
                    {admin === true ? <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button> : ''}
                  </div>
                ))}
                  </div>
            ) : (
              <p>No comment...</p>
            )}
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
              <img style={{ marginTop: '2rem', width: '15rem' }} src='https://svgsilh.com/svg_v2/1296602.svg'></img>
          </>
        ) : (
          <h2>Loading Blog...</h2>
        )}
      </div>
    </>
  
  )  
        }
  export default Post

