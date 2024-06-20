import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './VideoPlayer.scss';
import PlayPauseButton from '../Buttons/PlayPauseButton/PlayPauseButton';
import VolumeButton from '../Buttons/VolumeButton/VolumeButton';
import FullscreenButton from '../Buttons/FullscreenButton/FullscreenButton';
import Scrubber from '../Buttons/Scrubber/Scrubber';

const VideoPlayer = ({ currentVideoId, onVideoEnd }) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [scrubberValue, setScrubberValue] = useState(0);
  const [bufferValue, setBufferValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoDetails, setVideoDetails] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get('https://unit-3-project-api-0a5620414506.herokuapp.com/register');
        setApiKey(response.data.api_key);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };
    fetchApiKey();
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey || !currentVideoId) return;

      try {
        const response = await axios.get(`https://unit-3-project-api-0a5620414506.herokuapp.com/videos/${currentVideoId}?api_key=${apiKey}`);
        const video = response.data;
        setVideoDetails(video);
        setDuration(parseDuration(video.duration));
        // Stop and reset the video when a new video is loaded
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
          setScrubberValue(0);
          setCurrentTime(0);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };
    if (apiKey && currentVideoId) {
      fetchVideoDetails();
    }
  }, [apiKey, currentVideoId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
  }, [videoDetails]);

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

  const parseDuration = (duration) => {
    const parts = duration.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={videoContainerRef} className={`video-player video-player--container ${isPlaying ? 'video-player--full-height' : ''}`}>
      <div className="video-player__wrapper">
        <div className={`video-player__thumbnail ${isPlaying ? 'video-player__thumbnail--hidden' : ''}`} onClick={handlePlayPause}>
          <img src={videoDetails.image} alt={videoDetails.title} />
        </div>
        <video ref={videoRef} onClick={handlePlayPause} className={`video-player__video ${isPlaying ? 'video-player__video--playing' : ''}`}>
          <source src={`${videoDetails.video}?api_key=${apiKey}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={`video-player__controls ${isPlaying && !showControls ? 'video-player__controls--hidden' : ''} ${isPlaying ? 'video-player__controls--playing' : ''}`}>
          <div className="video-player__controls--left">
            <PlayPauseButton isPlaying={isPlaying} onTogglePlayPause={handlePlayPause} />
          </div>
          <div className="video-player__controls--center">
            <Scrubber
              value={scrubberValue}
              buffer={bufferValue}
              onScrub={handleScrub}
              currentTime={currentTime}
              duration={duration}
            />
          </div>
          <div className="video-player__controls--right">
            <FullscreenButton isFullscreen={isFullscreen} onToggleFullscreen={handleFullscreen} />
            <VolumeButton
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onVolumeToggle={handleVolumeToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;