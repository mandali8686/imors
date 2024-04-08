import React, { useState, useRef } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

const ImörsHistory = ({ email, username }) => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const goToProfile = () => {
    navigate('/Profile')
  }

  const goToAuth = () => {
    navigate('/Auth')
  }

  const goToMyFavorites = () => {
    navigate('/MyFavorites')
  }

  const [isHovering, setIsHovering] = useState(false)

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
  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar')
    return savedAvatar || 'user.png'
  })


  return (
    <div id="container">
      <div id="navbar">
        <button className="sidebar-button" onClick={goToAuth}>
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <div className="top">
          <img src="logo.png" alt="logo"></img>
        </div>
        <div>
          <div className="sidebar_container2" onClick={goToProfile}>
            Profile
          </div>
          <div className="sidebar_container2">· Imörs History</div>
          <div className="sidebar_container2" onClick={goToMyFavorites}>
            My Favortites
          </div>
        </div>
      </div>
      <div id="right-content">
        <h1 className="title1">Imörs History</h1>
      </div>
    </div>
  )
}

export default ImörsHistory
