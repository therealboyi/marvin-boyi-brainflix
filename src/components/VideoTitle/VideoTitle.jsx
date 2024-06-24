// src/components/VideoTitle.jsx
import React from 'react';
import useVideoDetails from '../useVideoDetails';

const VideoTitle = ({ currentVideoId }) => {
  const { videoDetails } = useVideoDetails(currentVideoId);

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <header className="video-title">
      <h1 className="video-title__text">{videoDetails.title}</h1>
    </header>
  );
};

export default VideoTitle;
