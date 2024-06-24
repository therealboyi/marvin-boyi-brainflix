// src/components/VideoPlayer/VideoPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import useVideoDetails from '../useVideoDetails';
import VideoControls from '../VideoControls/VideoControls';
import FullscreenHandler from '../FullscreenHandler/FullscreenHandler';
import Video from '../Video/Video';
import VideoThumbnail from '../VideoPlayerThumbnail/VideoPlayerThumbnail';
import './VideoPlayer.scss';

const VideoPlayer = ({ currentVideoId, apiKey, onVideoEnd }) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const { videoDetails, duration } = useVideoDetails(currentVideoId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [scrubberValue, setScrubberValue] = useState(0);
  const [bufferValue, setBufferValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setScrubberValue(0);
      setCurrentTime(0);
    }
  }, [currentVideoId]);

  useEffect(() => {
    let timer;
    const handleMouseMove = () => {
      if (!isPlaying) return;

      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowControls(false);
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(false);
      videoRef.current.classList.add('video-player__video--playing');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      videoRef.current.classList.remove('video-player__video--playing');
    }
  };

  const handleScrub = (e) => {
    const scrubTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = scrubTime;
    setScrubberValue(e.target.value);
    setCurrentTime(scrubTime);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.mozRequestFullScreen) {
        videoContainerRef.current.mozRequestFullScreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value / 100;
    videoRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const handleVolumeToggle = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
      videoRef.current.volume = 0;
    } else {
      setVolume(previousVolume);
      videoRef.current.volume = previousVolume;
    }
  };

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <FullscreenHandler videoContainerRef={videoContainerRef} isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}>
      <figure ref={videoContainerRef} className={`video-player video-player--container ${isPlaying ? 'video-player--full-height' : ''}`}>
        <div className="video-player__wrapper">
          <VideoThumbnail
            isPlaying={isPlaying}
            image={videoDetails.image}
            title={videoDetails.title}
            onPlayPause={handlePlayPause}
          />
          <Video
            videoRef={videoRef}
            isPlaying={isPlaying}
            videoSrc={videoDetails.video}
            onPlayPause={handlePlayPause}
            onVideoEnd={onVideoEnd}
            setScrubberValue={setScrubberValue}
            setCurrentTime={setCurrentTime}
            setBufferValue={setBufferValue}
            setIsPlaying={setIsPlaying}
            setShowControls={setShowControls}
          />
          <VideoControls
            isPlaying={isPlaying}
            onTogglePlayPause={handlePlayPause}
            scrubberValue={scrubberValue}
            bufferValue={bufferValue}
            onScrub={handleScrub}
            currentTime={currentTime}
            duration={duration}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleFullscreen}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            onVolumeToggle={handleVolumeToggle}
            showControls={showControls}
          />
        </div>
      </figure>
    </FullscreenHandler>
  );
};

export default VideoPlayer;