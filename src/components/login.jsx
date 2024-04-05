import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ JWT, setJWT }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = { username, password } 
        
        setLoading(true)
        try {
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        
        if (!response.ok) {
            setError("Username or password incorrect")
            throw new Error("Username or password incorrect")
        }
        const data = await response.json()
        setResponse(data)
        console.log("New User Logged in successfully")
        setJWT(data.token)
        setLoading(false)
        navigate(`/posts`)
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Login</h1>
                <div className='registerForm'>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input 
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Password:</label>
                        <input 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!loading && <button>Login</button>}
                        { loading && <button disabled>Logging In...</button>}
                    </form>
                </div>
                {error ? <p>{error}</p> : ''}
        </>
    )
}

export default Login