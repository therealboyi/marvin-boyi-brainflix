import React from 'react';
import './Scrubber.scss';
<<<<<<< HEAD
=======
import scrubIcon from '../../assets/icons/scrub.svg';
>>>>>>> sprint-2

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const Scrubber = ({ value, buffer, onScrub, currentTime, duration }) => {
  const getBackground = () => {
    return `linear-gradient(to right, 
      #0095FF ${value}%, 
      #AFAFAF ${value}% ${buffer}%, 
      #000000 ${buffer}% 100%)`;
  };

  return (
    <div className="scrubber-container">
      <span className="timer">{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onScrub}
        className="scrubber"
        style={{ background: getBackground() }}
      />
      <span className="timer">{formatTime(duration)}</span>
    </div>
  );
};

export default Scrubber;
