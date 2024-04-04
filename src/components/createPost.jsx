import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ JWT, setJWT }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate();
    console.log(JWT)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = { title, content }
        try {
            const response = await fetch('http://localhost:5000/posts/create', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JWT}`
                },
                body: JSON.stringify(newPost)
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
                            rows="25" 
                            cols="47"
                        />
                        <button>Create Post</button>
                    </form>
                </div>
        </>
    )
}

export default CreatePost