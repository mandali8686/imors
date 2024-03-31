import "./Gallery.css";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const Gallery = ({ song }) => {
  const generatedVideos = [1, 2, 3];

  return (
    <div id="gallery">
      <h1>{song}</h1>
      {generatedVideos.map((video, index) => (
        <VideoPlayer video={video} key={index} />
      ))}
    </div>
  );
};

export default Gallery;
