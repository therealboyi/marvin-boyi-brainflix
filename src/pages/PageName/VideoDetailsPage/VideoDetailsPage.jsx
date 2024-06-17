// VideoDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

const VideoDetailsPage = () => {
  const { videoId } = useParams();
  return <HomePage initialVideoId={videoId} />;
};

export default VideoDetailsPage;
