import React, { useDebugValue, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThisUser } from '../api/auth';

const upperStyle = {
    height: "50vh",
    width: "100vw",
    backgroundImage: "url('/background_placeholder.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    opacity: 0.8,
    position: 'relative'
};

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const Navbar = () => {
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const user = await getThisUser(token);
                console.log(user);
            }
        }
        fetchData();
    }, []);
    

    const goToHomepage = () => {
        navigate('/signup1');
    };
    const goToLoginPage = () => {
        navigate('/login');
    };

    return (
        <div style={upperStyle}>
            <div style={overlayStyle}>
                <button className="go-login" onClick={goToLoginPage}>Log in</button>
                <button className="go-signup" onClick={goToHomepage}>Sign up</button>
                <div className="Upper">
                    <h2 className="title">Imors</h2>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
