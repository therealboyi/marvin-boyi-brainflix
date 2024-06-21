// VideoThumbnail.jsx
import React from 'react';
import './VideoThumbnail.scss';

const VideoThumbnail = ({ imageSrc }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentNode.style.backgroundColor = '#E1E1E1';
  };

  return (
    <div className="thumbnail-container">
      <label className="thumbnail-container__label">VIDEO THUMBNAIL</label>
      <div className="thumbnail-container__image-wrapper">
        <img 
          src={imageSrc} 
          alt="Video Thumbnail" 
          className="thumbnail-container__image" 
          onError={handleImageError} 
        />
      </div>
    </div>
  );
};

export default VideoThumbnail;