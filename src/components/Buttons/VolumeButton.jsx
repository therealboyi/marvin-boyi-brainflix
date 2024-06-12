import React from 'react';
<<<<<<< HEAD

const VolumeButton = ({ volume, onVolumeChange, onVolumeToggle }) => {
=======
import './VolumeButton.scss';

const VolumeButton = ({ volume, onVolumeChange, onVolumeToggle }) => {
  const volumeValue = volume * 100;

>>>>>>> sprint-2
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
<<<<<<< HEAD
        value={volume * 100}
        onChange={onVolumeChange}
        className="volume"
=======
        value={volumeValue}
        onChange={onVolumeChange}
        className="volume"
        style={{ '--volume-value': `${volumeValue}%` }}
>>>>>>> sprint-2
      />
    </div>
  );
};

export default VolumeButton;
