import React, { useEffect, useState } from "react";
import { getUserSongs } from "../../../../api/song"; // Adjust the import path according to your file structure
import "./SongList.css";

const SongList = ({ onSongSelect }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const sessionId = localStorage.getItem("jwtToken"); // Adjust this if you're storing the session ID differently
    getUserSongs(sessionId).then(({ songs }) => {
      setSongs(songs);
    });
  }, []);

  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div
          key={index}
          className="song-item"
          onClick={() => onSongSelect(song.title)}
        >
          {song.title}
        </div>
      ))}
    </div>
  );
};

export default SongList;
