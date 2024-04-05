import { Link } from 'react-router-dom';

const Navbar = ({ JWT, setJWT, admin, setAdmin }) => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <Link to="/posts" className="navLink">Home</Link>
        </li>
        {
          !JWT ? (
            <>
              <li className="navItem">
                <Link to="/users/register" className="navLink">Register</Link>
              </li>
              <li className="navItem">
                <Link to="/users/login" className="navLink">Login</Link>
              </li>
            </>
          ) : (
              <li className="navItem">
                <Link onClick={() => { setJWT(''); setAdmin(false) }} className="navLink">Logout</Link>
              </li>
            )
        }
        {admin === true ?
          <li className="navItem">
            <Link to="/posts/create" className="navLink">Create Post</Link>
          </li> : ''
        }
      </ul>
    </nav>
  );
}

export default Navbar;

