// VideoDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoDescription = ({ currentVideoId }) => {
  const [videoDescription, setVideoDescription] = useState('');
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
