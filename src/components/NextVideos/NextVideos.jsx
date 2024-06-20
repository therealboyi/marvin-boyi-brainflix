// NextVideos.jsx
import React from 'react';
import './NextVideos.scss';

const NextVideos = ({ videos, onVideoClick }) => {
  const handleImageError = (e) => {
    e.target.style.backgroundColor = '#E1E1E1';
    e.target.src = '';
  };

  const handleVideoClick = (videoId) => {
    window.scrollTo(0, 0);
    onVideoClick(videoId);
  };

  return (
    <div className="next-videos">
      <h2 className="next-videos__title">Next Videos</h2>
      <div className="next-videos__container">
        {videos.map((video) => (
          <article
            key={video.id}
            className="next-videos__item next-videos__item--clickable"
            onClick={() => handleVideoClick(video.id)}
          >
            <img
              src={video.image}
              alt={video.title}
              className="next-videos__thumbnail"
              onError={handleImageError}
            />
            <div className="next-videos__info">
              <h3 className="next-videos__video-title">{video.title}</h3>
              <p className="next-videos__channel">{video.channel}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NextVideos;
