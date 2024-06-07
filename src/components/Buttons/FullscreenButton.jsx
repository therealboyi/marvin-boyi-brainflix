import React from 'react';

const FullscreenButton = ({ isFullscreen, onClick }) => {
  return (
    <button onClick={onClick} className="control-button">
      <img
        src={isFullscreen ? "/src/assets/icons/close_fullscreen.svg" : "/src/assets/icons/fullscreen.svg"}
        alt={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      />
    </button>
  );
};

export default FullscreenButton;
