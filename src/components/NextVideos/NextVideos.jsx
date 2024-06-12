import React from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import './NextVideos.scss';

const NextVideos = ({ videos }) => {
=======
import './NextVideos.scss';

const NextVideos = ({ videos, onVideoClick }) => {
  const handleImageError = (e) => {
    e.target.style.backgroundColor = '#E1E1E1'; 
    e.target.src = ''; 
  };

>>>>>>> sprint-2
  return (
    <div className="next-videos">
      <h2 className="next-videos__title">Next Videos</h2>
      <ul className="next-videos__list">
        {videos.map((video) => (
<<<<<<< HEAD
          <li key={video.id} className="next-videos__item">
=======
          <li
            key={video.id}
            className="next-videos__item clickable"
            onClick={() => onVideoClick(video.id)}
          >
>>>>>>> sprint-2
            <img
              src={video.image}
              alt={video.title}
              className="next-videos__thumbnail"
<<<<<<< HEAD
=======
              onError={handleImageError}
>>>>>>> sprint-2
            />
            <div className="next-videos__info">
              <h3 className="next-videos__video-title">{video.title}</h3>
              <p className="next-videos__channel">{video.channel}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

<<<<<<< HEAD
NextVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      channel: PropTypes.string.isRequired,
    })
  ).isRequired,
};

=======
>>>>>>> sprint-2
export default NextVideos;
