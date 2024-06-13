import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.scss';
import PlayPauseButton from '../Buttons/PlayPauseButton';
import VolumeButton from '../Buttons/VolumeButton';
import FullscreenButton from '../Buttons/FullscreenButton';
import Scrubber from '../Buttons/Scrubber';

const VideoPlayer = ({ currentVideoId }) => {
  const videoRef = useRef(null);
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
  const [isFullHeight, setIsFullHeight] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('https://unit-3-project-api-0a5620414506.herokuapp.com/register');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setApiKey(data.api_key);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };
    fetchApiKey();
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey) return;

      try {
        const response = await fetch('/src/data/video-details.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const updatedVideoDetails = data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
        const video = updatedVideoDetails.find(video => video.id === currentVideoId);
        setVideoDetails(video);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };
    fetchVideoDetails();
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
      setDuration(video.duration);
      requestAnimationFrame(updateScrubber);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsFullHeight(false);
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

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsFullHeight(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsFullHeight(false);
    }
  };

  const handleScrub = (e) => {
    const scrubTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = scrubTime;
    setScrubberValue(e.target.value);
    setCurrentTime(scrubTime);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
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
    <div className={`video-player-container ${isFullHeight ? 'full-height' : ''}`}>
      <div className="video-player">
        {!isPlaying && (
          <div className="thumbnail" onClick={handlePlayPause}>
            <img src={videoDetails.image} alt={videoDetails.title} />
          </div>
        )}
        <video ref={videoRef} onClick={handlePlayPause} style={{ display: isPlaying ? 'block' : 'none' }}>
          <source src={videoDetails.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="controls">
          <div className="left-controls">
            <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} />
          </div>
          <div className="center-controls">
            <Scrubber 
              value={scrubberValue} 
              buffer={bufferValue} 
              onScrub={handleScrub} 
              currentTime={currentTime} 
              duration={duration} 
            />
          </div>
          <div className="right-controls">
            <FullscreenButton isFullscreen={isFullscreen} onClick={handleFullscreen} />
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