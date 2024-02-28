import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import './signup-1.css'
import { login } from '../../api/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [token, setToken] = useState('');

  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      // Navigate to another page if login is successful
      console.log(response.token)
      //setToken(response.token)
      navigate('/profile1', { state: { email: email, token: response.token } });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
  


  const goToSignUp1 = () => {
    navigate('/signup1')
  }

  return (
    <div className="sign-up">
      <div class="parent_font3">
        <br />
        Welcome back
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <div class="parent_font1">
            <br />
            Email or username
          </div>
          <div className="input_format">
            <input
              className="input1"
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="parent_font1">Password</div>
        <div className="input_format">
          <input
            className="input1"
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="parent_font1">
          <button type="submit" className="login-button">
            log in
          </button>
        </div>
      </form>
      <div className="parent_font">
        Don't have an account?
        <div onClick={goToSignUp1} class="turntosignup">
          Sign up
        </div>
      </div>
    </div>
  )
}

export default Login
