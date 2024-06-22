// src/components/MetricData.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MetricData.scss';
import views from '../../assets/icons/views.svg';
import likes from '../../assets/icons/likes.svg';
import { API_URL, VIDEOS_ENDPOINT } from '../Api';

const MetricData = ({ currentVideoId }) => {
  const [videoMetrics, setVideoMetrics] = useState({ views: 0, likes: 0, channel: '', timestamp: Date.now() });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!currentVideoId) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}`);
        const { views, likes, channel, timestamp } = response.data;
        setVideoMetrics({ views, likes, channel, timestamp: Number(timestamp) });
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.put(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/likes`);
      setVideoMetrics((prevMetrics) => ({
        ...prevMetrics,
        likes: response.data.likes
      }));
      setLiked(true);

      setTimeout(() => setLiked(false), 300); 
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  if (!videoMetrics.views || !videoMetrics.likes || !videoMetrics.channel || !videoMetrics.timestamp) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid Date'; 
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
            <p className="metric-data__item"><img src={views} alt="Views" className="metric-data__icon" /> {videoMetrics.views.toLocaleString()}</p>
          </div>
          <div className="metric-data__column">
            <p className="metric-data__item">{formatDate(videoMetrics.timestamp)}</p>
            <p className="metric-data__item">
              <img
                src={likes}
                alt="Likes"
                className={`metric-data__icon ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              /> {videoMetrics.likes.toLocaleString()}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="metric-data__column">
            <p className="metric-data__item metric-data__item--bold">By {videoMetrics.channel}</p>
            <p className="metric-data__item">{formatDate(videoMetrics.timestamp)}</p>
          </div>
          <div className="metric-data__column">
            <p className="metric-data__item"><img src={views} alt="Views" className="metric-data__icon" /> {videoMetrics.views.toLocaleString()}</p>
            <p className="metric-data__item">
              <img
                src={likes}
                alt="Likes"
                className={`metric-data__icon ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              /> {videoMetrics.likes.toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MetricData;

