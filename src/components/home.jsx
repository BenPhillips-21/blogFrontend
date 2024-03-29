import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {

    // when you click on a specific post it redirects you to the post component with useNavigate

    fetch('http://localhost:5000/posts', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });

    return (
        <>
            <h2>Home</h2>
        </>
    )
}

export default Home