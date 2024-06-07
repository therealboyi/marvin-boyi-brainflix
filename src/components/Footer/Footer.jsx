import React, { useState, useEffect } from 'react';
import NextVideos from '../NextVideos/NextVideos';

const Footer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/src/data/video-details.json')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching video data:', error));
  }, []);

  return (
    <footer className="footer">
      <NextVideos videos={videos} />
    </footer>
  );
};

export default Footer;
