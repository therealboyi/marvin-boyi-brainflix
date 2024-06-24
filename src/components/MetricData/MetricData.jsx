// MetricData.jsx
import './MetricData.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import viewsIcon from '../../assets/icons/views.svg';
import likesIcon from '../../assets/icons/likes.svg';
import { API_URL, VIDEOS_ENDPOINT } from '../Api';

const MetricData = ({ currentVideoId }) => {
  const [videoMetrics, setVideoMetrics] = useState({ views: 0, likes: 0, channel: '', timestamp: Date.now() });
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

  const handleLike = async () => {
    try {
      const response = await axios.put(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/likes`);
      setVideoMetrics((prevMetrics) => ({
        ...prevMetrics,
        likes: response.data.likes,
      }));
      setLiked(true);

      setTimeout(() => setLiked(false), 300);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (!videoMetrics.views || !videoMetrics.likes || !videoMetrics.channel || !videoMetrics.timestamp) {
    return <div>Loading...</div>;
  }

  return (
    <section className="metric-data">
      <div className="metric-data__left">
        <div className="metric-data__column">
          <p className="metric-data__item metric-data__item--bold">By {videoMetrics.channel}</p>
        </div>
        <div className="metric-data__column metric-data__column--date">
          <p className="metric-data__item">{formatDate(videoMetrics.timestamp)}</p>
        </div>
      </div>
      <div className="metric-data__right">
        <div className="metric-data__column metric-data__column--views">
          <p className="metric-data__item">
            <img src={viewsIcon} alt="Views" className="metric-data__icon" /> {videoMetrics.views.toLocaleString()}
          </p>
        </div>
        <div className="metric-data__column metric-data__column--likes">
          <p className="metric-data__item">
            <img
              src={likesIcon}
              alt="Likes"
              className={`metric-data__icon ${liked ? 'metric-data__icon--liked' : ''}`}
              onClick={handleLike}
            /> {videoMetrics.likes.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MetricData;