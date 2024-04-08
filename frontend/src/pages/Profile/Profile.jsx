import React, { useState, useRef, useEffect } from 'react'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faCamera,
  faSave,
  faLeftLong,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateUsername, changePassword } from '../../api/user'

const Profile = () => {
  const location = useLocation()
  const { email, username: initialUsername } = location.state || {}
  console.log('Email:', email)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  //const location = useLocation();
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [username, setUsername] = useState(initialUsername)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState(null)

  useEffect(() => {
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
  }, [username, email])

  //Edit username part
  const toggleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const saveUsername = () => {
    console.log('Saving username:', username)
    if (username) {
      updateUsername(email, username)
        .then((response) => {
          console.log(response) // Handle the response
          localStorage.setItem('username', username)
        })
        .catch((error) => {
          console.error('Error updating username:', error)
        })
    }
    setIsEditingUsername(false)
  }

  //Edit password
  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword)
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const savePassword = () => {
    console.log('Saving password:', newPassword)
    if (newPassword) {
      changePassword(email, newPassword).then((response) => {
        console.log(response) // Handle the response
        //window.location.reload();
      })
    }
    setIsEditingPassword(false)
  }

  //Sidebar navigation part
  const goToImörsHistory = () => {
    navigate('/ImörsHistory', { state: { avatar, username, email } })
  }

  const goToMyFavorites = () => {
    navigate('/MyFavorites', { state: { avatar, username, email } })
  }

  const goToDashboard = () => {
    navigate('/', { state: { avatar, username, email } })
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
        localStorage.setItem('avatar', imageUrl)
      }

      reader.readAsDataURL(file)
    } else {
      console.log('Please select an image file.')
    }
  }

  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar')
    return savedAvatar || 'user.png'
  })

  useEffect(() => {
    console.log(avatar)
  }, [avatar])

  return (
    <div id="container">
      <div id="navbar">
        <button className="sidebar-button" onClick={goToDashboard}>
          <FontAwesomeIcon icon={faLeftLong} />
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
          Username:
          {!isEditingUsername ? (
            <>
              {username ? `${username}` : ''}
              <FontAwesomeIcon
                icon={faPen}
                onClick={toggleEditUsername}
                style={{
                  color: 'black',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <FontAwesomeIcon
                icon={faSave}
                onClick={saveUsername}
                style={{
                  color: 'black',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              />
            </>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">
          Email: {email ? `${email}` : ''}
          {/* <FontAwesomeIcon icon={faPen} style={{ color: 'black' }} /> */}
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="profile_category">
          Password:
          {!isEditingPassword ? (
            <>
              <FontAwesomeIcon
                icon={faPen}
                onClick={toggleEditPassword}
                style={{
                  color: 'black',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <FontAwesomeIcon
                icon={faSave}
                onClick={savePassword}
                style={{
                  color: 'black',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              />
            </>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div>
        <div className="avatar">
          <input
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <img
            className="avatar_uploaded_homepage2"
            src={avatar}
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
