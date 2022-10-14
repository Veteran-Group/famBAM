import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Card, Image, Text } from '@mantine/core'
import './styles/videocard.css';

const VideoCard = () => {

  let { videoList, setVideoList, currentVideo, setCurrentVideo } = useContext(AppContext)

  if (videoList.length !== 0) {
    return (
      <>
      {videoList.map((video) => {
        return (
          <div onClick={() => {setCurrentVideo(video.videoId)}} className="video-card">
            <div className="title">{video.title}</div>
            <img src={video.thumbnail} className="thumbnail" />
          </div>
        )
      })}
      </>
    )
  } else {
    return (
      <>
      <div>Hello World</div>
      </>
    )
  }

}

export default VideoCard;