// src/components/useVideos.js
import { useState, useEffect } from 'react';
import { fetchData, VIDEOS_ENDPOINT } from './Api';

const useVideos = (initialVideoId, videoId) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(videoId || initialVideoId || '');

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const data = await fetchData(VIDEOS_ENDPOINT);
        setVideos(data);
        if (!initialVideoId && !videoId) {
          const firstVideoId = data[0].id;
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