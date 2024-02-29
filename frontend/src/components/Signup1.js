import React, { useState } from "react"
import "./signup-1.css"
import { useNavigate } from 'react-router-dom'

function Signup1 () {

    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const goToSignUp2 = () => {
        navigate('/signup2', { state: { email: email } })
    }

    const goToLoginPage = () => {
        navigate('/Login')
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className="sign-up">
            <div className="signup-title">
                <p class="parent_font" >
                    Sign up to start<br></br>MAKING A VIDEO
                </p>
            </div>
            <div>
                <p class="parent_font" >
                    email address
                </p>
                <br />
            </div>
            <div class="input_format">
                <div className="login-input">
                    <input className="input1"
                        type="email"
                        placeholder="Please enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>
            </div>
            <div class="textbox1">
                <button class="content" onClick={goToSignUp2}>Next step</button>
            </div>
            <div class="parent_font">
                <div>Already have an account? </div>
                <div class="turntosignup" onClick={goToLoginPage}>Please log in here</div>
            </div>
        </div>

    )

}

export default Signup1