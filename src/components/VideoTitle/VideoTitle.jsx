// src/components/VideoTitle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT, fetchApiKey } from '../Api';

const VideoTitle = ({ currentVideoId }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKey();
        setApiKey(key);
      } catch (error) {
        console.error('Error getting API key:', error);
      }
    };

    getApiKey();
  }, []);

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
