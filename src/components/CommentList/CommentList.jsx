// src/components/CommentList/CommentList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = ({ comments, deleteComment, isDesktopOrTablet }) => {
  return (
    <ul className="comments__list">
      {comments.map((comment, index) => (
        <li key={comment.id || comment.timestamp} className="comments__list-item">
          <CommentItem
            comment={comment}
            isFirst={isDesktopOrTablet && index === 0}
            deleteComment={deleteComment}
          />
        </li>
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteComment: PropTypes.func.isRequired,
  isDesktopOrTablet: PropTypes.bool.isRequired,
};

export default CommentList;