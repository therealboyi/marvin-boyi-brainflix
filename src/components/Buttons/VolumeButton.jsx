import React from 'react';

const VolumeButton = ({ volume, onVolumeChange, onVolumeToggle }) => {
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
        value={volume * 100}
        onChange={onVolumeChange}
        className="volume"
      />
    </div>
  );
};

export default VolumeButton;
