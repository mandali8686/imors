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
                <p className="parent_font" >
                    Sign up to start<br></br>MAKING A VIDEO
                </p>
            </div>
            <div>
                <p className="parent_font" >
                    email address
                </p>
                <br />
            </div>
            <div className="input_format">
                <div className="login-input">
                    <input className="input1"
                        type="email"
                        placeholder="Please enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>
            </div>
            <div className="textbox1">
                <button className="content" onClick={goToSignUp2}>Next step</button>
            </div>
            <div className="parent_font">
                <div>Already have an account? </div>
                <div className="turntosignup" onClick={goToLoginPage}>Please log in here</div>
            </div>
        </div>

    )

}

export default Signup1