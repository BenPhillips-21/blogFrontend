import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ JWT, setJWT }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data);
      console.log("New User Registered:", response);
      setJWT(data.token)
      setLoading(false);
      navigate(`/users/login`);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
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
          {!loading && <button>Submit</button>}
          {loading && <button disabled>Registering...</button>}
        </form>
      </div>
      <img style={{ marginTop: '2rem', width: '15rem' }} src='https://svgsilh.com/svg/37510.svg'></img>
    </>
  );
}

export default Register;
