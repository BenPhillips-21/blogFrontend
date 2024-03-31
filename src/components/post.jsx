import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = ({ JWT, setJWT }) => {
const { postid } = useParams();
let idNumber = parseInt(postid);
console.log(idNumber)

fetch(`http://localhost:5000/posts/${postid}`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });

    return (
        <>
            <h2>Post Component</h2>
        </>
    )

}

export default Post