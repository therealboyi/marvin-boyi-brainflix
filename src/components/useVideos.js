// src/components/useVideos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from './Api';

const useVideos = (initialVideoId, videoId) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(videoId || initialVideoId || '');

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}`);
        setVideos(response.data);
        if (!initialVideoId && !videoId) {
          const firstVideoId = response.data[0].id;
          setCurrentVideoId(firstVideoId);
        } else {
          setCurrentVideoId(videoId || initialVideoId);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [initialVideoId, videoId]);

  useEffect(() => {
    if (currentVideoId) {
      localStorage.setItem('currentVideoId', currentVideoId);
    }
  }, [currentVideoId]);

  return { videos, currentVideoId, setCurrentVideoId };
};

export default useVideos;
