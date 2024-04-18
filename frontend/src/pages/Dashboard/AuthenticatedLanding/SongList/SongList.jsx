import React, { useEffect, useState, useRef } from "react";
import { useSelectedSong } from "../../../../context/selectedSong/SelectedSongContext";
import { TbVinyl } from "react-icons/tb";
import { getUserSongs, uploadSong } from "../../../../api/song";
import { Button } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

import "./SongList.css";

const Song = ({ song }) => {
  const { setSelectedSong } = useSelectedSong();

  const handleClick = () => {
    setSelectedSong(song);
  };

  return (
    <li as="li" onClick={handleClick}>
      {song.title}
    </li>
  );
};

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddSong = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const response = await uploadSong(file);
      if (response.error !== "N/A") {
        console.error("Upload error:", response.error);
      } else {
        alert("Song uploaded successfully: " + response.message);
        getUserSongs().then(({ songs }) => {
          setSongs(songs);
        });
      }
    }
  };

  useEffect(() => {
    getUserSongs()
      .then(({ songs }) => {
        setSongs(songs);
        console.log(songs);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  return (
    <div id="song-list">
      <div>
        <TbVinyl />
        <h2>Songs</h2>
      </div>
      <ul>
        {songs.map((song) => (
          <Song key={song._id} song={song} />
        ))}
      </ul>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="audio/*"
      />
      <Button variant="info" onClick={handleAddSong}>
        <IoIosAddCircleOutline />
        Add Song
      </Button>
    </div>
  );
};

export default SongList;
