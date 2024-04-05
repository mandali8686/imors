import React, { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCamera } from '@fortawesome/free-solid-svg-icons'
import './Profile.css'


function Profile () {
  const navigate = useNavigate()
  const location = useLocation()
  const items = [email, username, 'Logout']
  const [avatar, setAvatar] = useState(location.state?.avatar)


  const goToHomepage = () => {
    navigate('/Homepage', { state: { avatar, username, email } })
  }

  // Define the functions used in the JSX, e.g., goToGallery, handleExpandClick, handleFileChange, handleSignOut
  // These functions are just placeholders, you need to implement them based on your requirements
  const goToGallery = () => { /* implementation */ }

  const goToImörsHistory = () => {
    navigate('/ImörsHistory', { state: { avatar, username, email } })
  }

  const goToMyFavorites = () => {
    navigate('/MyFavorites', { state: { avatar, username, email } })
  }

  const goToSetting = () => {
    navigate('/Setting', { state: { avatar, username, email } })
  }

  const handleIconChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const imgElement = document.querySelector('.avatar_uploaded_homepage2')
        const imageUrl = e.target.result
        imgElement.src = imageUrl
        setAvatar(imageUrl)
      }

      reader.readAsDataURL(file)
    } else {
      console.log('Please select an image file.')
    }
  }


  const fileInputRef = useRef()
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="Homepage2">
      <div className="sidebar">
        <div className='logo_container'><img onClick={goToHomepage} className='homepage_img_input' src="logo.png" alt="Unloadable" /></div>

        <div className="sidebar_container3">
          <div className="sidebar_container2">· Profile</div>
          <div className="sidebar_container2" onClick={goToImörsHistory}>Imörs History</div>
          <div className="sidebar_container2" onClick={goToMyFavorites}>My Favortites</div>
        </div>

      </div>
      <div className="homepage2_main_content">
        <h1 className="title1">profile</h1>
        <div className="profile_category">Username {username ? `${username}` : ""} <FontAwesomeIcon icon={faPen} style={{ color: "#ffffff", }} /></div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">Email {email ? `${email}` : ""}<FontAwesomeIcon icon={faPen} style={{ color: "#ffffff", }} /></div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">//Password {email ? `${email}` : ""}<FontAwesomeIcon icon={faPen} style={{ color: "#ffffff", }} /></div>
        <br />
        <br />
        <br />
        <br />

      </div>

      <div className="homepage2_avatar_bar">
        <div><input
          type="file"
          accept="image/*"
          onChange={handleIconChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        /><img className='avatar_uploaded_homepage2' src={avatar} alt="Unloadable" />
          <div className={`profile_category1 ${isHovering ? 'hover-background' : ''}`}>
            <FontAwesomeIcon
              className="avatar_edit_icon"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleUploadClick}
              icon={faCamera}
              style={{ color: "#ffffff", }} />
          </div>
        </div>
      </div>

    </div >
  )
}


export default Profile
