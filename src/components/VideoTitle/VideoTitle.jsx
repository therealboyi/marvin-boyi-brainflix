import React, { useState, useEffect } from 'react';

<<<<<<< HEAD
const VideoTitle = () => {
=======
const VideoTitle = ({ currentVideoId }) => {
>>>>>>> sprint-2
  const [videoTitle, setVideoTitle] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const fetchApiKey = async () => {
      try {
        const response = await fetch('https://unit-3-project-api-0a5620414506.herokuapp.com/register');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setApiKey(data.api_key);
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
        const response = await fetch('/src/data/video-details.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
>>>>>>> sprint-2
        const updatedVideoDetails = data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
<<<<<<< HEAD
        setVideoTitle(updatedVideoDetails[0].title);
      })
      .catch(error => console.error('Error fetching video details:', error));
  }, [apiKey]);
=======
        const video = updatedVideoDetails.find(video => video.id === currentVideoId);
        setVideoTitle(video ? video.title : '');
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [apiKey, currentVideoId]);
>>>>>>> sprint-2

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
