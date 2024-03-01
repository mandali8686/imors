import React,{useRef, useEffect} from "react";

const VideoPlayer=({ videoId })=>{

    const videoRef=useRef(null)

    useEffect(()=>{
        if (videoRef.current){

        }

    },[])
    return(<div>
        <video ref={videoRef} width='600' height='450' controls>
            <source src={`http://localhost:3009/api/videos/${videoId}`} type='video/mp4'></source>
            Your browser doesn't support video.
        </video>

    </div>)
}

export default VideoPlayer;