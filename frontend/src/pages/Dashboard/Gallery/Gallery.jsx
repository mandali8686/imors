import "./Gallery.css";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import React, { useState } from 'react';

const Gallery = ({ song }) => {
  //const [selectedModel, setSelectedModel] = useState('');
  const generatedVideos = [1, 2, 3];
  const modelTitles = ["Mapdreamer", "Drawing", "Faces"]; 
  const [checkedModels, setCheckedModels] = useState({
    Mapdreamer: false,
    Drawing: false,
    Faces: false
  });

  // Handle change for checkboxes
  const handleCheckboxChange = (model) => {
    setCheckedModels((prevCheckedModels) => ({
      ...prevCheckedModels,
      [model]: !prevCheckedModels[model]
    }));
  };

  const renderTable = () => {
    return (
      <table className="generated-table">
        <tbody>
          {modelTitles.map((model, index) => (
            
            <React.Fragment key={index}>
              <tr>
                <td className="gif-placeholder">GIF placeholder for {model}</td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      name={model}
                      checked={checkedModels[model]}
                      onChange={() => handleCheckboxChange(model)}
                    />
                    {model}
                  </label>
                </td>
              </tr>
              <button className='large-button'>Select Model and Generate</button>
              
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div id="gallery">
      <h1>{song}</h1>
      
      {song && renderTable()}
      {generatedVideos.map((video, index) => (
        <VideoPlayer video={video} key={index} />
      ))}
    </div>
  );
};

export default Gallery;
