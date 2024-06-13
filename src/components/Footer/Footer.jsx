import React, { useState, useEffect } from 'react';
import NextVideos from '../NextVideos/NextVideos';
import './Footer.scss';

const Footer = ({ currentVideoId, setCurrentVideoId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch('/src/data/video-details.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const filteredVideos = data.filter(video => video.id !== currentVideoId);
        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  return (
    <footer className="footer">
      <NextVideos videos={videos} onVideoClick={setCurrentVideoId} />
    </footer>
  );
};

export default Footer;