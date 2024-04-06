import React, { useState, useRef } from 'react'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPen, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Profile = ({ email, username, onSongSelect }) => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [avatar, setAvatar] = useState(location.state?.avatar)

  const goToImörsHistory = () => {
    navigate('/ImörsHistory', { state: { avatar, username, email } })
  }

  const goToMyFavorites = () => {
    navigate('/MyFavorites', { state: { avatar, username, email } })
  }

  const goToAuth = () => {
    navigate('/Auth', { state: { avatar, username, email } })
  }

  const [isHovering, setIsHovering] = useState(false)

  const handleUploadClick = () => {
    fileInputRef.current.click()
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

  return (
    <div id="container">
      <div id="navbar">
        <button className="sidebar-button" onClick={goToAuth}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="top">
          <img src="logo.png" alt="logo"></img>
        </div>
        <div>
          <div className="sidebar_container2">· Profile</div>
          <div className="sidebar_container2" onClick={goToImörsHistory}>
            Imörs History
          </div>
          <div className="sidebar_container2" onClick={goToMyFavorites}>
            My Favortites
          </div>
        </div>
      </div>
      <div id="right-content">
        <h1 className="title1">Profile</h1>
        <div className="profile_category">
          Username {username ? `${username}` : ''}{' '}
          <FontAwesomeIcon icon={faPen} style={{ color: '#ffffff' }} />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">
          Email {email ? `${email}` : ''}
          <FontAwesomeIcon icon={faPen} style={{ color: '#ffffff' }} />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">
          Password {email ? `${email}` : ''}
          <FontAwesomeIcon icon={faPen} style={{ color: '#ffffff' }} />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <img
            className="avatar_uploaded_homepage2"
            src="user.png"
            alt="Unloadable"
          />
          <div
            className={`profile_category1 ${
              isHovering ? 'hover-background' : ''
            }`}>
            <FontAwesomeIcon
              className="avatar_edit_icon"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleUploadClick}
              icon={faCamera}
              style={{ color: '#ffffff' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
