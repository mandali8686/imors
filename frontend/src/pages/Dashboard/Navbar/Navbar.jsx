import React, { useState, useRef } from 'react'
import SongList from './SongList/SongList'
import './Navbar.css'
import { uploadSong } from '../../../api/song'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ email, username, onSongSelect }) => {
  const items = [email, 'Logout']
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const avatar = localStorage.getItem('avatar') || username.png

  const openDropdownMenu = (event) => {
    event.preventDefault()
    setDropdownMenuVisible((prev) => !prev)
  }

  const handleDropdownMenu = (item) => {
    console.log('dropdownlist:', item)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)
      console.log(`${key}: ${value}`)
    }
    setDropdownMenuVisible(false)
    if (item === 'Logout') {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('email')
      navigate('/auth', { replace: true })
    }
    if (item === email) {
      navigate('/profile', { state: { username, email } }, { replace: true })
    }
  }

  const handleAddSong = () => {
    const file = fileInputRef.current.files[0] // Get the selected file
    if (file) {
      uploadSong(file).then((response) => {
        console.log(response) // Handle the response
        // You may want to update the song list or show a success message here
        window.location.reload()
      })
    }
  }

  return (
    <div id="navbar">
      <div className="top">
        <img className="logo_style" src="logo.png" alt="logo"></img>
      </div>
      <SongList onSongSelect={onSongSelect} />
      <div className="footnote">
        <div className="profile" onClick={openDropdownMenu}>
          <img className="avatar_style" src={avatar} alt="user.png" />
          {dropdownMenuVisible && (
            <div className="dropdown-menu">
              {items.map((item, key) => (
                <div
                  className="dropdown-menu-item"
                  key={key}
                  onClick={() => handleDropdownMenu(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleAddSong} // Trigger upload when a file is selected
        />
        <div
          className="add_button"
          onClick={() => fileInputRef.current.click()} // Open file dialog when the button is clicked
        >
          Add
        </div>
      </div>
    </div>
  )
}

export default Navbar
