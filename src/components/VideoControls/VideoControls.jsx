// VideoControls.jsx
import React from 'react';
import PlayPauseButton from '../Buttons/PlayPauseButton/PlayPauseButton';
import VolumeButton from '../Buttons/VolumeButton/VolumeButton';
import FullscreenButton from '../Buttons/FullscreenButton/FullscreenButton';
import Scrubber from '../Buttons/Scrubber/Scrubber';

const VideoControls = ({
  isPlaying,
  onTogglePlayPause,
  scrubberValue,
  bufferValue,
  onScrub,
  currentTime,
  duration,
  isFullscreen,
  onToggleFullscreen,
  volume,
  onVolumeChange,
  onVolumeToggle,
  showControls,
}) => (
  <div className={`video-player__controls ${isPlaying && !showControls ? 'video-player__controls--hidden' : ''} ${isPlaying ? 'video-player__controls--playing' : ''}`}>
    <div className="video-player__controls--left">
      <PlayPauseButton isPlaying={isPlaying} onTogglePlayPause={onTogglePlayPause} />
    </div>
    <div className="video-player__controls--center">
      <Scrubber
        value={scrubberValue}
        buffer={bufferValue}
        onScrub={onScrub}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
    <div className="video-player__controls--right">
      <FullscreenButton isFullscreen={isFullscreen} onToggleFullscreen={onToggleFullscreen} />
      <VolumeButton
        volume={volume}
        onVolumeChange={onVolumeChange}
        onVolumeToggle={onVolumeToggle}
      />
    </div>
  </div>
);

export default VideoControls;