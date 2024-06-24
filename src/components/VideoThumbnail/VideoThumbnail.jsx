// src/components/VideoThumbnail.jsx
import React from 'react';
import './VideoThumbnail.scss';

const VideoThumbnail = ({ imageSrc }) => {
  const handleImageError = (e) => {
    e.target.classList.add('thumbnail-container__image--error');
    e.target.style.display = 'none';
    e.target.parentNode.classList.add('thumbnail-container__image-wrapper--error');
  };

  return (
    <figure className="thumbnail-container">
      <label className="thumbnail-container__label">VIDEO THUMBNAIL</label>
      <div className="thumbnail-container__image-wrapper">
        <img 
          src={imageSrc} 
          alt="Video Thumbnail" 
          className="thumbnail-container__image" 
          onError={handleImageError} 
        />
      </div>
    </figure>
  );
};

export default VideoThumbnail;