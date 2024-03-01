import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faChevronDown, faMusic, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import Profile2 from './profile2';
import { useLocation } from "react-router-dom";
import { icon } from '@fortawesome/fontawesome-svg-core';



function Homepage() {

  const [displayedSongsCount, setDisplayedSongsCount] = useState(10);
  const [uploadedSong, setUploadedSong] = useState(null);
  const musicListRef = useRef(null);
  const [musicList, setMusicList] = useState(() => {
    const savedList = localStorage.getItem('musicList');
    return savedList ? JSON.parse(savedList) : [{ id: 0, name: 'No Songs Now', placeholder: true }];
  });
  const location = useLocation();
  const avatar = location.state?.avatar;
  const username = location.state?.username;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const goToGallery = () => {
    navigate('/gallery');
  };

  const setAndSaveMusicList = (newList) => {
    setMusicList(newList);  // Update state
    localStorage.setItem('musicList', JSON.stringify(newList));  // Save list to local storage
  };

  const handleExpandClick = () => {
    const newCount = displayedSongsCount + 10;
    setDisplayedSongsCount(newCount);

    if (musicListRef.current) {
      musicListRef.current.scrollTop += musicListRef.current.scrollHeight / (musicList.length / 10);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSong = {
        id: musicList.length ? musicList[musicList.length - 1].id + 1 : 1,
        name: file.name
      };
      setUploadedSong({
        name: file.name,
        url: URL.createObjectURL(file)
      });
      setAndSaveMusicList(musicList.length === 1 && musicList[0].placeholder ? [newSong] : [...musicList, newSong]);
    }
  };


  return (
    <div className="Homepage">
      <div className="sidebar">
        <button className='sidebar-avatar_button'>{avatar && (
          <img className='avatar_uploaded_homepage' src={avatar} />
        )}{username ? `${username},` : ""}</button>
        <button className='sidebar-button' onClick={goToGallery}><FontAwesomeIcon icon={faHome} /> Home</button>

        <button className='sidebar-button'><FontAwesomeIcon icon={faHeart} /> Your List</button>
        <div className="music-list" ref={musicListRef}>
          <ul>
            {musicList.slice(0, displayedSongsCount).map((music) => (
              <li key={music.id} className='font_for_musiclist'>
                <input type="checkbox" id={`song-${music.id}`} />
                <label htmlFor={`song-${music.id}`}>{music.name}</label>
              </li>
            ))}
          </ul>
          {displayedSongsCount < musicList.length && (
            <button className="expand-button" onClick={handleExpandClick}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          )}
        </div>
        <div className="uploaded-song">
          {uploadedSong && (
            <>
              <p>Uploaded Song: {uploadedSong.name}</p>
              {/* If you want to play the uploaded song */}
              <audio controls src={uploadedSong.url}>
                Your browser does not support the audio element.
              </audio>
            </>
          )}
        </div>

        <div className="file-upload">
          <label htmlFor="song-upload" className='font_for_musiclist'>Upload Your Song</label>
          <FontAwesomeIcon icon={faMusic} />
          <input
            type="file"
            className="file-upload-input"
            id="song-upload"
            accept=".mp3,audio/mp3"
            onChange={handleFileChange}
          />
        </div>
        <div><button className='upload-button'>Upload Audio</button></div>
        <div><button className='upload-button'>Generate Video</button></div>

      </div>
      <div className="main-content">
        <div className='login'>
          <button>Share</button>
          <button>Download Video</button>

        </div>
        <h2 className='hp-title'>Welcome to the Imors!</h2>




        <div className="video-placeholder">
          <VideoPlayer videoId='example' />
        </div>


        <div className='control-bar'>
          <button className='play'> <FontAwesomeIcon icon={faPlayCircle} /> Play the Video!</button>


        </div>
      </div>

    </div>
  );
}

export default Homepage;
