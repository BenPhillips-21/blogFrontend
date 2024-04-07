import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/posts');
    }, [navigate]); 

    return null;
}

export default ToHome;
