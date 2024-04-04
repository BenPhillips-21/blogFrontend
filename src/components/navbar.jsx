import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/posts" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/users/register" style={styles.navLink}>Register</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/users/login" style={styles.navLink}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/posts/create" style={styles.navLink}>Create Post</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#2c3b3d',
    padding: '10px 20px',
    marginBottom: '20px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999, // Ensures it's on top of other elements
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center', // Add space between links 
  },
  navItem: {
    margin: '0 100px 0 0'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  }
};

export default Navbar;
