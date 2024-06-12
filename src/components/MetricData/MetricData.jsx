import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

const MetricData = () => {
  const [videoMetrics, setVideoMetrics] = useState({ views: '', likes: '', channel: '', timestamp: '' });
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
=======
import './MetricData.scss';
import views from '/Users/user/Documents/Brainstation/marvin-boyi-brainflix/src/assets/icons/views.svg';
import likes from '/Users/user/Documents/Brainstation/marvin-boyi-brainflix/src/assets/icons/likes.svg';

const MetricData = ({ currentVideoId }) => {
  const [videoMetrics, setVideoMetrics] = useState({ views: '', likes: '', channel: '', timestamp: '' });
  const [apiKey, setApiKey] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
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
        const { views, likes, channel, timestamp } = updatedVideoDetails[0];
        setVideoMetrics({ views, likes, channel, timestamp });
      })
      .catch(error => console.error('Error fetching video details:', error));
  }, [apiKey]);
=======
        const video = updatedVideoDetails.find(video => video.id === currentVideoId);
        const { views, likes, channel, timestamp } = video || {};
        setVideoMetrics({ views, likes, channel, timestamp });
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [apiKey, currentVideoId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
>>>>>>> sprint-2

  if (!videoMetrics.views || !videoMetrics.likes || !videoMetrics.channel || !videoMetrics.timestamp) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
<<<<<<< HEAD
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
=======
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
>>>>>>> sprint-2
  };

  return (
    <div className="metric-data">
<<<<<<< HEAD
      <p>Channel: {videoMetrics.channel}</p>
      <p>Date: {formatDate(videoMetrics.timestamp)}</p>
      <p>Views: {videoMetrics.views}</p>
      <p>Likes: {videoMetrics.likes}</p>
=======
      {isMobile ? (
        <>
          <div className="metric-column">
            <p className="metric-item metric-item-bold">By {videoMetrics.channel}</p>
            <p className="metric-item"><img src={views} alt="Views" className="icon" /> {videoMetrics.views}</p>
          </div>
          <div className="metric-column">
            <p className="metric-item">{formatDate(videoMetrics.timestamp)}</p>
            <p className="metric-item"><img src={likes} alt="Likes" className="icon" /> {videoMetrics.likes}</p>
          </div>
        </>
      ) : (
        <>
          <div className="metric-column">
            <p className="metric-item metric-item-bold">By {videoMetrics.channel}</p>
            <p className="metric-item">{formatDate(videoMetrics.timestamp)}</p>
          </div>
          <div className="metric-column">
            <p className="metric-item"><img src={views} alt="Views" className="icon" /> {videoMetrics.views}</p>
            <p className="metric-item"><img src={likes} alt="Likes" className="icon" /> {videoMetrics.likes}</p>
          </div>
        </>
      )}
>>>>>>> sprint-2
    </div>
  );
};

export default MetricData;
