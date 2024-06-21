// src/components/useComments.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from '../components/Api';
import useApiKey from './useApiKey';


const useComments = (currentVideoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = useApiKey();

  useEffect(() => {
    const fetchComments = async () => {
      if (!apiKey || !currentVideoId) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/comments?api_key=${apiKey}`
        );
        const sortedComments = response.data.comments.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setComments(sortedComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [apiKey, currentVideoId]);

  const addComment = async (newComment) => {
    try {
      const response = await axios.post(
        `${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/comments?api_key=${apiKey}`,
        newComment
      );
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error("Error posting new comment:", error);
    }
  };

  return { comments, loading, addComment };
};

export default useComments;
