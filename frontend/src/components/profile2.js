import React, { useRef, useState } from "react"
import './profile.css'
import './signup-1.css'
import { useLocation, useNavigate } from "react-router-dom"

function Profile2 () {

    // useEffect(() => {

    //     const username = 

    // }, []);

    const location = useLocation()
    const username = location.state?.username
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("icon.png")
    const goToHomepage = () => {
        navigate('/homepage', { state: { avatar } })
    }


    const fileInputRef = useRef()
    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleIconChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()

            reader.onload = (e) => {
                const imgElement = document.querySelector('.input_format2 .img_input')
                const imageUrl = e.target.result
                imgElement.src = imageUrl
                setAvatar(imageUrl)
            }

            reader.readAsDataURL(file)
        } else {
            console.log('Please select an image file.')
        }
    }

    return (
        <div className="profile">
            <div class="loginpage_parent_font4">
                {username ? `${username},` : "______ , "}
                WELCOME TO Imors!
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleIconChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <span className="turntosignup" onClick={handleUploadClick}>Upload</span> your Imors Avatar! <span className="turntosignup" onClick={goToHomepage}>or later</span>
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