// FullscreenButton.jsx
import React from 'react';

const FullscreenButton = ({ isFullscreen, onToggleFullscreen }) => {
  return (
    <button onClick={onToggleFullscreen} className="control-button">
      <img
        src={isFullscreen ? "/src/assets/icons/close_fullscreen.svg" : "/src/assets/icons/fullscreen.svg"}
        alt={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      />
    </button>
  );
};

export default FullscreenButton;
