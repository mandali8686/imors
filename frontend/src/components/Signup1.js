import React, { useState } from "react"
import "./signup-1.css"
import { useLocation, useNavigate } from 'react-router-dom'

function Signup1 () {

    const [email, setEmail] = useState('')

    const location = useLocation()




    const navigate = useNavigate()

    const goToSignUp2 = () => {
        navigate('/signup2', { state: { email: email } })
    }

    const goToLoginPage = () => {
        navigate('/Login')
    }

    const goToHomePage2 = () => {
        navigate('/Homepage2', { state: { email: email } })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className="sign-up">
            <div>
                <p className="signup1_parent_font3" >
                    Sign up to start<br></br>MAKING A VIDEO
                </p>
            </div>
            <div>
                <p className="parent_font4" >
                    email address
                </p>
            </div>
            <div className="input_format">
                <div className="login-input">
                    <input className="signup1_input1"
                        type="email"
                        placeholder="Please enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>
            </div>
            <div className="textbox1">
                <br />
                <br />
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