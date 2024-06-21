// src/components/VideoDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from '../Api';
import './VideoDetails.scss';

const VideoDescription = ({ currentVideoId }) => {
  const [videoDescription, setVideoDescription] = useState('');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!currentVideoId) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}`);
        setVideoDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  if (!videoDescription) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-description">
      <p>{videoDescription}</p>
    </div>
  );
};

export default VideoDescription;
