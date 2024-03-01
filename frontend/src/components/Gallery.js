import React from "react"
import "../App.css"
import Navbar from "./Navbar"


const Gallery = () => {
    const lowerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        height: "50vh",
        width: "100vw",
        backgroundColor: "black",
        marginTop: '10vh',
        marginLeft: '2.5vw',

    }

    const videoContainerStyle = {
        width: '80%',
        height: '80%',
        backgroundColor: '#000',

    }

    return (
        <div className="Gallery" style={{ backgroundColor: 'black', position: 'relative' }}>

            <Navbar/>
            <div style={lowerStyle}>
            <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height='300' controls>
        <source src="/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
        <div className="gallery-video-placeholder" style={videoContainerStyle}>
        <video width='100%' height="300" controls>
        <source src="/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
            </div>
        </div>
    )
}

export default Gallery
