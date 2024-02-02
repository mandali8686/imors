import React, { useState,  useRef } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart,faChevronDown, faMusic, faPlayCircle } from '@fortawesome/free-solid-svg-icons';


function Homepage() {

    const [displayedSongsCount, setDisplayedSongsCount] = useState(10);
  const musicListRef = useRef(null);

  const musicList = [
    { id: 1, name: 'Song 1' },
    { id: 2, name: 'Song 2' },
    { id: 3, name: 'Song 3' },
    { id: 4, name: 'Song 4' },
    { id: 5, name: 'Song 5' },
    { id: 6, name: 'Song 6' },
    { id: 7, name: 'Song 7' },
    { id: 8, name: 'Song 8' },
    { id: 9, name: 'Song 9' },
    { id: 10, name: 'Song 10' },
    { id: 11, name: 'Song 11' },
    { id: 12, name: 'Song 12' },
    { id: 13, name: 'Song 13' },
    { id: 14, name: 'Song 14' },
    { id: 15, name: 'Song 15' },
    { id: 16, name: 'Song 16' },

    // ... Replace with songs in dataset
  ];

 
  const handleExpandClick = () => {
    const newCount = displayedSongsCount + 10;
    setDisplayedSongsCount(newCount);

    if (musicListRef.current) {
      musicListRef.current.scrollTop += musicListRef.current.scrollHeight / (musicList.length / 10);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file); // For now, just log the file object
  };

  return (
    <div className="Homepage">
      <div className="sidebar"> 
        <button className='sidebar-button'><FontAwesomeIcon icon={faHome} /> Home</button>
      
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

        <div className="file-upload">
          <label htmlFor="song-upload">Upload Your Song</label>
          <FontAwesomeIcon icon={faMusic} />
          <input 
            type="file" 
            id="song-upload" 
            accept="audio/*" 
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
        <source src="/example.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
