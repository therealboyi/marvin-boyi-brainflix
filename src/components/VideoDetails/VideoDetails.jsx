import React, { useState, useEffect } from 'react';

const VideoDescription = ({ currentVideoId }) => {
  const [videoDescription, setVideoDescription] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch('https://unit-3-project-api-0a5620414506.herokuapp.com/register')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setApiKey(data.api_key);
      })
      .catch(error => console.error('Error fetching API key:', error));
  }, []);

  useEffect(() => {
    if (!apiKey || !currentVideoId) return;

    fetch('/src/data/video-details.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const updatedVideoDetails = data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
        const video = updatedVideoDetails.find(video => video.id === currentVideoId);
        setVideoDescription(video ? video.description : '');
      })
      .catch(error => console.error('Error fetching video details:', error));
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
