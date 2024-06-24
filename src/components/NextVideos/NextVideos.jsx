// src/components/NextVideos/NextVideos.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NextVideos.scss';

const NextVideos = ({ videos, onVideoChange }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    window.scrollTo(0, 0); 
    onVideoChange(videoId);
    navigate(`/videos/${videoId}`);
  };

  const handleImageError = (e) => {
    e.target.classList.add('next-videos__thumbnail--error');
    e.target.src = '';
  };

  return (
    <section className="next-videos">
      <h2 className="next-videos__title">Next Videos</h2>
      <div className="next-videos__container">
        {videos.map((video) => (
          <article key={video.id} className="next-videos__item next-videos__item--clickable">
            <Link
              to={`/videos/${video.id}`}
              className="next-videos__link"
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NextVideos;
