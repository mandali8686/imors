import React, { useState, useRef } from "react";
import SongList from "./SongList/SongList";
import "./Navbar.css";
import { uploadSong } from "../../../api/song";

const Navbar = ({ email, username, onSongSelect }) => {
  const items = [email, username, "Logout"];
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  const fileInputRef = useRef(null);

  const openDropdownMenu = (event) => {
    event.preventDefault();
    setDropdownMenuVisible((prev) => !prev);
  };

  const handleDropdownMenu = (item) => {
    console.log(item);
    setDropdownMenuVisible(false);
  };

  const handleAddSong = () => {
    const file = fileInputRef.current.files[0]; // Get the selected file
    if (file) {
      uploadSong(file).then((response) => {
        console.log(response); // Handle the response
        // You may want to update the song list or show a success message here
      });
    }
  };

  return (
    <div id="navbar">
      <div className="top">
        <img src="logo.png" alt="logo"></img>
      </div>
      <SongList onSongSelect={onSongSelect} />
      <div className="footnote">
        <div className="profile" onClick={openDropdownMenu}>
          <img src="user.png" alt="" />
          {dropdownMenuVisible && (
            <div className="dropdown-menu">
              {items.map((item, key) => (
                <div
                  className="dropdown-menu-item"
                  key={key}
                  onClick={() => handleDropdownMenu(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAddSong} // Trigger upload when a file is selected
        />
        <button
          className="large-button"
          onClick={() => fileInputRef.current.click()} // Open file dialog when the button is clicked
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Navbar;
