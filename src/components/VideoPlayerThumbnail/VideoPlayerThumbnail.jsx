// src/components/VideoPlayerThumbnail/VideoPlayerThumbnail.jsx
import React from 'react';

const VideoPlayerThumbnail = ({ isPlaying, image, title, onPlayPause }) => (
  <figure className={`video-player__thumbnail ${isPlaying ? 'video-player__thumbnail--hidden' : ''}`} onClick={onPlayPause}>
    <img src={image} alt={title} />
  </figure>
);

export default VideoPlayerThumbnail;