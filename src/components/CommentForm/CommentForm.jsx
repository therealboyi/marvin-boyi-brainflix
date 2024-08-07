// src/components/CommentForm/CommentForm.jsx
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Buttons/Button/Button';
import '../../components/CommentSection/CommentSection.scss';


const CommentForm = ({ onAddComment, isDesktopOrTablet }) => {
  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState(false);

  const handleSubmit = (event) => {
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
    };

    onAddComment(newComment);
    setCommentText('');
    setCommentTextError(false);
  };

  return (
    <section className="comments__form-container">
      <div className="comments__form-wrapper">
        <Avatar src="/src/assets/images/Mohan-muruge.jpg" size="large" className="comments__avatar--margin-top" />
        <div className="comments__form-column">
          <label htmlFor="comment" className="comments__label bold">
            JOIN THE CONVERSATION
          </label>
          <form
            className={`comments__form ${isDesktopOrTablet ? 'comments__form--horizontal' : ''}`}
            onSubmit={handleSubmit}
          >
            <textarea
              id="comment"
              className={`comments__textarea ${commentTextError ? 'comments__textarea--error' : ''}`}
              placeholder="Add a new comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <Button
              type="submit"
              iconSrc="/src/assets/icons/add_comment.svg"
              className="button--primary"
            >
              COMMENT
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommentForm;