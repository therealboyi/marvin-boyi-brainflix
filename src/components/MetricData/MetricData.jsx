import React, { useState, useEffect } from 'react';

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
        const updatedVideoDetails = data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
        const { views, likes, channel, timestamp } = updatedVideoDetails[0];
        setVideoMetrics({ views, likes, channel, timestamp });
      })
      .catch(error => console.error('Error fetching video details:', error));
  }, [apiKey]);

  if (!videoMetrics.views || !videoMetrics.likes || !videoMetrics.channel || !videoMetrics.timestamp) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="metric-data">
      <p>Channel: {videoMetrics.channel}</p>
      <p>Date: {formatDate(videoMetrics.timestamp)}</p>
      <p>Views: {videoMetrics.views}</p>
      <p>Likes: {videoMetrics.likes}</p>
    </div>
  );
};

export default MetricData;
