import React, { useState } from "react";
import "./signup-2.css";
import { useLocation, useNavigate } from 'react-router-dom';

function Signup2() {
    const [password, setPassword] = useState('');
    const location = useLocation();
    const email = location.state?.email; 
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        console.log(`Email: ${email}, Password: ${password}`);
        navigate('/login'); // Navigate to login
        alert('Signup successful!'); 
    };

    

    return(<div className="sign-up-2">
        <div class="progress_bar">
    </div><br></br><br></br><br></br>
        <img src="Vector 1.svg" class="arrow_enlarged" alt="Unloadable"/>
    <div>
        <div class="content2">Step 2 of 2</div>
        <div class="content3">Create a password</div>
    </div>
    <br></br><br></br><br></br>
    <div>
        <div class="parent_font">Password</div>
    </div>
    <br></br>
    <div class="input_format">
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
    <div class="textbox1">
        <div class="content">
            <button className="content" onClick={handleSubmit}>Complete Sign Up</button>
            </div>
    </div>


    </div>)
    
}

export default Signup2;

