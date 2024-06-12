import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ src, alt, size = 'medium', className = '' }) => {
  const defaultAvatar = '/src/assets/images/default-avatar.jpg';

  return (
    <div className={`avatar avatar--${size} ${className}`} style={{ backgroundColor: '#E1E1E1' }}>
      <img 
        src={src || defaultAvatar} 
        alt={alt} 
        className="avatar__image" 
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = defaultAvatar; 
        }} 
      />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Avatar;
