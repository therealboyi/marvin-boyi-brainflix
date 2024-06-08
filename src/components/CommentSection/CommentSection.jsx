import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.scss';
import { formatTimestamp } from '../utils';
import Button from '../Buttons/Button'; // Adjust the import path as necessary

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://unit-3-project-api-0a5620414506.herokuapp.com/register')
      .then(response => {
        setApiKey(response.data.api_key);
      })
      .catch(error => console.error('Error fetching API key:', error));
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    axios.get('/src/data/video-details.json')
      .then(response => {
        const updatedVideoDetails = response.data.map(video => ({
          ...video,
          video: `${video.video}?api_key=${apiKey}`
        }));
        setComments(updatedVideoDetails[0].comments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching video details:', error);
        setLoading(false);
      });
  }, [apiKey]);

  const addNewComment = async (event) => {
    event.preventDefault();

    const isCommentTextEmpty = !commentText.trim();

    setCommentTextError(isCommentTextEmpty);

    if (isCommentTextEmpty) {
      alert('Please enter a comment.');
      return;
    }

    const newComment = {
      name: 'Anonymous',
      comment: commentText,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('https://unit-3-project-api-0a5620414506.herokuapp.com/comments', newComment, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      setComments([...comments, newComment]);
      setCommentText('');
      setCommentTextError(false);
    } catch (error) {
      console.error('Error posting new comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comments">
      <h2 className="comments__counter">{comments.length} Comments</h2>
      <div className="comments__form-container">
        <label htmlFor="comment" className="comments__label">JOIN THE CONVERSATION</label>
        <div className="comments__form-wrapper">
          <img src="/src/assets/images/Mohan-muruge.jpg" alt="User Avatar" className="comments__avatar" />
          <form className="comments__form" onSubmit={addNewComment}>
            <textarea
              id="comment"
              className={`comments__textarea ${commentTextError ? 'error' : ''}`}
              placeholder="Add a new comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <Button type="submit" iconSrc="/src/assets/icons/add_comment.svg" className="comments__button--custom">COMMENT</Button>
          </form>
        </div>
      </div>
      <div className="comments__list">
        {comments.map(comment => (
          <div key={comment.id || comment.timestamp} className="comments__item">
            <img src="./assets/images/Mohan-muruge.jpg" alt="User Avatar" className="comments__avatar" />
            <div className="comments__content">
              <div className="comments__header">
                <span className="comments__name">{comment.name}</span>
                <span className="comments__date">{formatTimestamp(new Date(comment.timestamp))}</span>
              </div>
              <p className="comments__text">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;