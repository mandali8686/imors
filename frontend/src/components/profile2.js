import React from "react"
import './profile.css'
import './signup-1.css'
import { useLocation, useNavigate } from "react-router-dom"

function Profile2 () {

    const location = useLocation()
    const username = location.state?.username
    const navigate = useNavigate()

    const goToHomepage = () => {
        navigate('/homepage')
    }



    return (
        <div className="profile">
            <div>
                <div class="parent_font" >
                    <div className="profile_welcome">
                        {username ? `${username},` : "______ , "}
                        WELCOME TO Imors!
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div class="input_format2">
                <img class="img_input" src="icon.png" alt="Unloadable" />
            </div>
            <br />
            <br />
            <br />
            <div>
                <div class="parent_font1">
                    Upload your Imors Avatar! <span className="turntosignup">or later</span>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div class="textbox1">
                <div class="content" onClick={goToHomepage}>Next step</div>
            </div>

        </div >
    )

}

export default Profile2