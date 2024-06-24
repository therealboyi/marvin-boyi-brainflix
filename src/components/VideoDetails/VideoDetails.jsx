// src/components/VideoDetails.jsx
import React from 'react';
import useVideoDetails from '../useVideoDetails';
import './VideoDetails.scss';

const VideoDetails = ({ currentVideoId }) => {
  const { videoDetails } = useVideoDetails(currentVideoId);

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="video-description">
      <p>{videoDetails.description}</p>
    </section>
  );
};

export default VideoDetails;
