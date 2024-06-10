import React, { useState, useEffect } from 'react';
import NextVideos from '../NextVideos/NextVideos';
import PropTypes from 'prop-types';

const Footer = ({ currentVideoId, setCurrentVideoId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/src/data/video-details.json')
      .then(response => response.json())
      .then(data => {
        const filteredVideos = data.filter(video => video.id !== currentVideoId);
        setVideos(filteredVideos);
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, [currentVideoId]);

  return (
    <footer className="footer">
      <NextVideos videos={videos} onVideoClick={setCurrentVideoId} />
    </footer>
  );
};

Footer.propTypes = {
  currentVideoId: PropTypes.string.isRequired,
  setCurrentVideoId: PropTypes.func.isRequired,
};

export default Footer;
