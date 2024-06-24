// src/components/Video/Video.jsx
import React, { useEffect } from 'react';

const Video = ({
  videoRef,
  isPlaying,
  videoSrc,
  onPlayPause,
  onVideoEnd,
  setScrubberValue,
  setCurrentTime,
  setBufferValue,
  setIsPlaying,
  setShowControls,
}) => {
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const updateScrubber = () => {
      const value = (video.currentTime / video.duration) * 100;
      setScrubberValue(value);
      setCurrentTime(video.currentTime);
      requestAnimationFrame(updateScrubber);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferEnd = video.buffered.end(video.buffered.length - 1);
        const bufferValue = (bufferEnd / video.duration) * 100;
        setBufferValue(bufferValue);
      }
    };

    const handleLoadedMetadata = () => {
      requestAnimationFrame(updateScrubber);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
      videoRef.current.classList.remove('video-player__video--playing');
      if (onVideoEnd) onVideoEnd();
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoRef, onVideoEnd, setScrubberValue, setCurrentTime, setBufferValue, setIsPlaying, setShowControls]);

  return (
    <div className="video-player__video-container" onClick={onPlayPause}>
      <video ref={videoRef} className={`video-player__video ${isPlaying ? 'video-player__video--playing' : ''}`}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;