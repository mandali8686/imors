import React, { useEffect, useState } from "react";
import { getUserSongs } from "../../../../api/song"; // Adjust the import path according to your file structure
import "./SongList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SongList = ({ onSongSelect }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const sessionId = localStorage.getItem("jwtToken"); // Adjust this if you're storing the session ID differently
    getUserSongs(sessionId).then(({ songs }) => {
      setSongs(songs);
    });
  }, []);

  const handleDelete = (event, songTitle) => {
    event.stopPropagation(); 
    const isConfirmed = window.confirm(`Delete song ${songTitle}?`);
    if (isConfirmed) {
      const updatedSongs = songs.filter(song => song.title !== songTitle);
      setSongs(updatedSongs);
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      alert(`Song "${songTitle}" deleted.`);
    }
  };

  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div key={index} className="song-item">
          <span onClick={() => onSongSelect(song.title)}>
            {song.title}
          </span>
          <span className="delete-icon" onClick={(event) => handleDelete(event, song.title)}>
          <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SongList;
