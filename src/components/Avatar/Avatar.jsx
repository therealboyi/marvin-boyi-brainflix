// Avatar.jsx
import React, { useState, useEffect } from 'react';
import './Avatar.scss';

const Avatar = ({ src, size = 'medium', className = '' }) => {
  const defaultAvatar = '/src/assets/images/default-avatar.jpg';
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    setImageSrc(null);  
  };

  return (
    <div className={`avatar avatar--${size} ${className}`} style={{ backgroundColor: '#E1E1E1' }}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          className="avatar__image" 
          onError={handleError} 
        />
      ) : (
        <div className="avatar__placeholder" style={{ backgroundImage: `url(${defaultAvatar})` }}></div>
      )}
    </div>
  );
};

export default Avatar;
