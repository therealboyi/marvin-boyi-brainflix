// src/components/useComments.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, VIDEOS_ENDPOINT } from './Api';

const useComments = (currentVideoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!currentVideoId) return;

      setLoading(true);

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}`);
        const sortedComments = response.data.comments.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setComments(sortedComments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [currentVideoId]);

  const addComment = async (newComment) => {
    try {
      const response = await axios.post(
        `${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/comments`,
        newComment
      );
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error('Error posting new comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return { comments, loading, addComment, deleteComment };
};

export default useComments;
