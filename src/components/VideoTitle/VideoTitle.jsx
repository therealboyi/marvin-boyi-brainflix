// VideoTitle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoTitle = ({ currentVideoId }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get('https://unit-3-project-api-0a5620414506.herokuapp.com/register');
        setApiKey(response.data.api_key);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };
    fetchApiKey();
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey || !currentVideoId) return;

      try {
        const response = await axios.get(`https://unit-3-project-api-0a5620414506.herokuapp.com/videos/${currentVideoId}?api_key=${apiKey}`);
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
