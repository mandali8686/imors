import React, { useState } from "react"
import './profile.css'
import { useNavigate } from 'react-router-dom'


function Profile1 () {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')


    const goProfile2 = () => {
        navigate('/profile2', { state: { username: username } })
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }


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