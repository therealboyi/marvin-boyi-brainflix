// src/components/VideoDescription.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from '../Api';

const VideoDescription = ({ currentVideoId, apiKey }) => {
  const [videoDescription, setVideoDescription] = useState('');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey || !currentVideoId) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}?api_key=${apiKey}`);
        setVideoDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [apiKey, currentVideoId]);

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

