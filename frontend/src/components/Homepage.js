import React, { useState,  useRef } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart,faChevronDown, faMusic, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';



function Homepage() {

    const [displayedSongsCount, setDisplayedSongsCount] = useState(10);
    
  const [uploadedSong, setUploadedSong] = useState(null);
  const musicListRef = useRef(null);
  const [musicList, setMusicList] = useState(() => {
    const savedList = localStorage.getItem('musicList');
    return savedList ? JSON.parse(savedList) : [{ id: 0, name: 'No Songs Now', placeholder: true }];
});

const navigate = useNavigate();
    
    // Correctly defined goToHomepage function
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
        <button className='sidebar-button' onClick={goToGallery}><FontAwesomeIcon icon={faHome} /> Home</button>
      
        <button className='sidebar-button'><FontAwesomeIcon icon={faHeart} /> Your List</button>
        <div className="music-list" ref={musicListRef}>
        <ul>
  {musicList.slice(0, displayedSongsCount).map((music) => (
    <li key={music.id}>
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
          <label htmlFor="song-upload">Upload Your Song</label>
          <FontAwesomeIcon icon={faMusic} />
          <input 
            type="file" 
            className="file-upload-input"
            id="song-upload" 
            accept=".mp3,audio/mp3" 
            onChange={handleFileChange} 
          />
        </div>
      <div className='upload'>
        <button className='upload-button'>Upload Audio</button>

      </div>
      
      </div>
      <div className="main-content">
      <div className='login'>
        <button>Share</button>
            <button>Download Video</button>

        </div>
        <h2 className='hp-title'>Welcome to the Imors!</h2>
        
       
        <div className="video-placeholder">
        <video width='100%' height="450" controls>
        <source src="/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>

        <div className="stream-video-placeholder">
        <VideoPlayer videoId='example'/>  
        </div>
      

        <div className='control-bar'>
            <button className='generate'>Generate Video with Selected Music</button>
            <button className='play'> <FontAwesomeIcon icon={faPlayCircle}/> Play the Video!</button>
            

        </div>
      </div>
        
    </div>
  );
}

export default Homepage;
