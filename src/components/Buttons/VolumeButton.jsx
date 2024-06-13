import React from 'react';
import './VolumeButton.scss';

const VolumeButton = ({ volume, onVolumeChange, onVolumeToggle }) => {
  const volumeValue = volume * 100;

  return (
    <div className="volume-container">
      <img
        src={volume > 0 ? "/src/assets/icons/volume_up.svg" : "/src/assets/icons/volume_off.svg"}
        alt={volume > 0 ? "Volume Up" : "Volume Off"}
        onClick={onVolumeToggle}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={volumeValue}
        onChange={onVolumeChange}
        className="volume"
        style={{ '--volume-value': `${volumeValue}%` }}
      />
    </div>
  );
};

export default VolumeButton;