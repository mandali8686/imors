import React from "react";
import "../App.css";
import { useNavigate } from 'react-router-dom';


const Gallery = () => {
    const navigate = useNavigate();
    
    // Correctly defined goToHomepage function
    const goToHomepage = () => {
        navigate('/signup1');
    };
    const goToLoginPage = () => {
        navigate('/login');
    };

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
    
    const lowerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '10px', 
        height: "50vh",
        width: "100vw",
        backgroundColor: "black",
        marginTop:'10vh',
        marginLeft:'2.5vw',
        
    };
    
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        
    };

    const videoContainerStyle = {
        width: '80%', 
        height: '80%', 
        backgroundColor: '#000', 
        
    };

    return (
        <div className="Gallery" style={{backgroundColor: 'black', position: 'relative'}}>
            
            <div style={upperStyle}>
                     
                <div style={overlayStyle}>
                <button className="go-login" onClick={goToLoginPage}>Log in</button>
            <button className="go-signup" onClick={goToHomepage}>Sign up</button> 
            
                    <div className="Upper">
                        <h2 className="title">Imors</h2>
                    </div>
                </div>
            </div>
            <div style={lowerStyle}>
            <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height='300' controls>
        <source src="/example.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
            </div>
        </div>
    );
}

export default Gallery;
