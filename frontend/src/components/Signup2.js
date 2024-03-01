import React, { useState } from "react";
import "./signup-2.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser } from "../api/user";

function Signup2() {
    const [password, setPassword] = useState('');
    const location = useLocation();
    const email = location.state?.email; 
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        
        try {
            // Send a POST request to your backend endpoint
            console.log("Sending userData:", email, password);
            const response = await createUser(email, password);
            console.log("Response from createUser:", response); // Log the response
            navigate('/login'); 
        } catch (error) {
            console.log(error);
            console.error("Signup error:", error.response ? error.response.data : "Unknown error");
            alert('Signup failed!');
        }
    };

    

    return(<div className="sign-up-2">
        <div className="progress_bar">
    </div><br></br><br></br><br></br>
        <img src="Vector 1.svg" className="arrow_enlarged" alt="Unloadable"/>
    <div>
        <div className="content2">Step 2 of 2</div>
        <div className="content3">Create a password</div>
    </div>
    <br></br><br></br><br></br>
    <div>
        <div className="parent_font">Password</div>
    </div>
    <br></br>
    <div className="input_format">
        <div className="login-input"><input 
                    className="input1" 
                    type="password" 
                    placeholder="Please enter your password" 
                    value={password}
                    onChange={handlePasswordChange} 
                    required
                /></div>
    </div>
    <br></br>
    <div className="textbox1">
        <div className="content">
            <button className="content" onClick={handleSubmit}>Complete Sign Up</button>
            </div>
    </div>


    </div>)
    
}

export default Signup2;

