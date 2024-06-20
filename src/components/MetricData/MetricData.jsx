// MetricData.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MetricData.scss';
import views from '../../assets/icons/views.svg';
import likes from '../../assets/icons/likes.svg';

const MetricData = ({ currentVideoId }) => {
  const [videoMetrics, setVideoMetrics] = useState({ views: '', likes: '', channel: '', timestamp: '' });
  const [apiKey, setApiKey] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        const { views, likes, channel, timestamp } = response.data;
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
          <div className="metric-data__column">
            <p className="metric-data__item metric-data__item--bold">By {videoMetrics.channel}</p>
            <p className="metric-data__item"><img src={views} alt="Views" className="metric-data__icon" /> {videoMetrics.views}</p>
          </div>
          <div className="metric-data__column">
            <p className="metric-data__item">{formatDate(videoMetrics.timestamp)}</p>
            <p className="metric-data__item"><img src={likes} alt="Likes" className="metric-data__icon" /> {videoMetrics.likes}</p>
          </div>
        </>
      ) : (
        <>
          <div className="metric-data__column">
            <p className="metric-data__item metric-data__item--bold">By {videoMetrics.channel}</p>
            <p className="metric-data__item">{formatDate(videoMetrics.timestamp)}</p>
          </div>
          <div className="metric-data__column">
            <p className="metric-data__item"><img src={views} alt="Views" className="metric-data__icon" /> {videoMetrics.views}</p>
            <p className="metric-data__item"><img src={likes} alt="Likes" className="metric-data__icon" /> {videoMetrics.likes}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MetricData;
