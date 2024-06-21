// src/components/VideoTitle.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from '../Api';
import useApiKey from '../useApiKey';

const VideoTitle = ({ currentVideoId }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const apiKey = useApiKey();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey || !currentVideoId) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}?api_key=${apiKey}`);
        setVideoTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [apiKey, currentVideoId]);

  if (!videoTitle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-title">
      <h1 className="video-title__text">{videoTitle}</h1>
    </div>
  );
};

export default VideoTitle;
