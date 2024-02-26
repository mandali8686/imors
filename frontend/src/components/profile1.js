import React, { useState, useEffect } from "react"
import './profile.css'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';



function Profile1 () {

    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Check if there is state and if it has email and token
        if (location.state && location.state.email && location.state.token) {
            setEmail(location.state.email);
            setToken(location.state.token);
        } else {
            // Redirect back to login if there is no email or token
            navigate('/login');
        }
    }, [location, navigate]);

    const goProfile2 = () => {
        updateUserUsername(email, username).then(() => {
            navigate('/profile2', { state: { username: username } });
        });
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const updateUserUsername = async (email, username) => {
        //const token = localStorage.getItem('token'); // Retrieve token from local storage or your state management
  try {
    console.log("Get token:",token)
    const response = await axios.put(`http://localhost:3009/api/users/updateUsername`, { email, username }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the request headers
      }
    });
    console.log('Username updated successfully:', response.data);
    // Handle additional logic upon successful update
  } catch (error) {
    console.error("Error updating username:", error.response ? error.response.data : error.message);
    // Handle errors, such as showing a message to the user
  }
      };


    return (
        <div className="profile">
            <div>
                <div class="parent_font" >
                    Create your Imors username!
                </div>
            </div>
            <div>
                <div class="parent_font" >
                    <div className="username">
                        Username
                    </div>
                </div>
                <br />
                <br />
                <div className="container">
                    <br />
                    <div className="input_format">
                        <input className="input1"
                            type="username"
                            placeholder="Please enter your username"
                            value={username}
                            onChange={handleUsername}
                            required />
                    </div>
                    <div class="font1">
                        *no longer than 20 characters
                    </div>
                    <br />
                    <br />
                </div>

            </div>

            <br />
            <br />

            <div class="textbox1">
                <div class="content" onClick={goProfile2}>Next step</div>
            </div>
        </div>
    )

}

export default Profile1