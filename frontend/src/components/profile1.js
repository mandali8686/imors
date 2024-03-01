import React, { useState, useEffect } from "react"
import './profile.css'
import './signup-1.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateUsername } from "../api/user"


function Profile1 () {

    const navigate = useNavigate()
    const location = useLocation()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Check if there is state and if it has email and token
        console.log(location.state.token)
        if (location.state && location.state.email && location.state.token) {
            setEmail(location.state.email)
        } else {
            // Redirect back to login if there is no email or token
            navigate('/login')
        }
    }, [location, navigate])

    const goProfile2 = () => {
        updateUserUsername(email, username).then(() => {
            navigate('/profile2', { state: { username: username } })
        })
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const updateUserUsername = async (email, username) => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage or your state management
        try {
            console.log("Get token:", token)
            const response = await updateUsername(email, username);
            console.log('Username updated successfully:', response)
            // Handle additional logic upon successful update
        } catch (error) {
            console.error("Error updating username:", error.response ? error.response.data : error.message)
            // Handle errors, such as showing a message to the user
        }
    }


    return (
        <div className="profile">
            <div class="loginpage_parent_font3">
                <br />
                Create your Imors username!
            </div>
            <div>
                <div class="parent_font4">
                    <br />
                    Username
                </div>
                <div className="profile1_input_format">
                    <input className="create_name_page_input1"
                        type="username"
                        placeholder="Please enter your username"
                        value={username}
                        onChange={handleUsername}
                        required />
                    <h1 class="font1">*The password must contain at least</h1>
                    <ul class="font1">
                        <li>1 capital letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 number</li>
                        <li>1 special character (for example: # ? ! &)</li>
                        <li>10 characters</li>
                    </ul>
                    <br />
                    <br />
                </div>

            </div>

            <br />
            <br />

            <div class="textbox1">
                <div onClick={goProfile2} className="content">
                    Next step
                </div>
            </div>
        </div >
    )

}

export default Profile1