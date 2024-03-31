import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = { username, password } 
        
        setLoading(true)

        fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(() => {
            console.log("New User Registered")
            setLoading(false)
            navigate(`/users/login`)
        })
    }

    return (
        <>
            <h1>Register :D</h1>
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
                        {!loading && <button>Register</button>}
                        { loading && <button disabled>Registering...</button>}
                    </form>
                </div>
        </>
    )
}

export default Register