import React, { useState, useEffect } from 'react';

const VideoTitle = () => {
  const [videoTitle, setVideoTitle] = useState('');
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
    if (!apiKey) return;

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
        setVideoTitle(updatedVideoDetails[0].title);
      })
      .catch(error => console.error('Error fetching video details:', error));
  }, [apiKey]);

  if (!videoTitle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-title">
      <h1>{videoTitle}</h1>
    </div>
  );
};

export default VideoTitle;
