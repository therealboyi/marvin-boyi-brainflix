import React from 'react';

const PlayPauseButton = ({ isPlaying, onClick }) => {
  return (
    <button onClick={onClick} className="control-button">
      <img
        src={isPlaying ? "/src/assets/icons/pause.svg" : "/src/assets/icons/play.svg"}
        alt={isPlaying ? "Pause" : "Play"}
      />
    </button>
  );
};

export default PlayPauseButton;
