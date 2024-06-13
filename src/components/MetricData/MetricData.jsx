import React, { useState, useEffect } from 'react';
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
        const updatedVideoDetails = data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
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

  if (!videoMetrics.views || !videoMetrics.likes || !videoMetrics.channel || !videoMetrics.timestamp) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="metric-data">
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
    </div>
  );
};

export default MetricData;