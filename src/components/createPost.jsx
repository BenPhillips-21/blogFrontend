import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ JWT }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = { title, content }
        try {
            const response = await fetch('https://blogapi-production-98cb.up.railway.app/posts/create', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JWT}`
                },
                body: JSON.stringify(newPost)
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

    return (
        <>
            <h1>Create Post</h1>
            <div className='registerForm'>
                    <form onSubmit={handleSubmit}>
                        <label>Post Title:</label>
                        <input 
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Post Content: </label>
                        <textarea 
                            type="text"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="19" 
                            cols="47"
                        />
                        <button>Create Post</button>
                    </form>
                </div>
        </>
    )
}

export default CreatePost