import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import './signup-1.css'
import { login } from '../api/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await login(email, password);

      console.log('Login successful:', response);
      navigate('/profile1', {
        state: { email: email, token: response.token },
      })
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : 'Unknown error'
      )
      alert('Login failed!')
    }
  }

  const goToSignUp1 = () => {
    navigate('/signup1')
  }

  return (
    <div className="sign-up">
      <div className="loginpage_parent_font3">
        <br />
        Welcome back
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="parent_font4">
            <br />
            Email or username
          </div>
          <div className="input_format">
            <input
              className="loginpage_input1"
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="parent_font4">Password</div>
        <div className="loginpage_input_format">
          <input
            className="loginpage_input1"
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="parent_font5">
          <button type="submit" className="login-button">
            log in
          </button>
        </div>
      </form>
      <div className="signup1_parent_font">
        Don't have an account?
        <div onClick={goToSignUp1} className="turntosignup">
          SIGN UP NOW!
        </div>
      </div>
    </div>
  )
}

export default Login
