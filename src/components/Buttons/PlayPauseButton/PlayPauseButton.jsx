// PlayPauseButton.jsx
import React from 'react';

const PlayPauseButton = ({ isPlaying, onTogglePlayPause }) => {
  return (
    <button onClick={onTogglePlayPause} className="control-button">
      <img
        src={isPlaying ? "/src/assets/icons/pause.svg" : "/src/assets/icons/play.svg"}
        alt={isPlaying ? "Pause" : "Play"}
      />
    </button>
  );
};

export default PlayPauseButton;
