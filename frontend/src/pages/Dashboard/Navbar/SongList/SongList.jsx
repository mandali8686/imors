import React, { useEffect, useState } from "react";
import { getUserSongs, deleteSong } from "../../../../api/song"; 
import "./SongList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const SongList = ({ onSongSelect }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    
    const sessionId = localStorage.getItem("jwtToken");
    getUserSongs(sessionId).then(({ songs }) => {
      setSongs(songs);
    }).catch(error => {
      console.error("Error fetching songs:", error);

    });
  }, []);

  const handleDelete = (event, songId, songTitle) => {
    event.stopPropagation();
    const isConfirmed = window.confirm(`Delete song ${songTitle}?`);
    if (isConfirmed) {
     
      deleteSong(songId).then(() => {
        
        const updatedSongs = songs.filter(song => song._id !== songId);
        setSongs(updatedSongs);
        alert(`Song "${songTitle}" deleted.`);
      }).catch(error => {
        console.error("Failed to delete the song:", error);
        
        alert(`Failed to delete the song "${songTitle}".`);
      });
    }
  };

  return (
    <div className="song-list">
      {songs.map(song => (
        <div key={song._id} className="song-item">
          <span onClick={() => onSongSelect(song.title)}>
            {song.title}
          </span>
          <span className="delete-icon" onClick={(event) => handleDelete(event, song._id, song.title)}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SongList;
