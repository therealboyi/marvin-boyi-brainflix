// src/components/useVideoDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from './Api';

const useVideoDetails = (currentVideoId) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!currentVideoId) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}`);
        const video = response.data;
        setVideoDetails(video);
        setDuration(parseDuration(video.duration));
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  const parseDuration = (duration) => {
    const parts = duration.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  return { videoDetails, duration };
};

export default useVideoDetails;
