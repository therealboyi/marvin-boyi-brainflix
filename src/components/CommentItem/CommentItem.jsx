// src/components/CommentItem/CommentItem.jsx
import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import { formatTimestamp } from "../utils";
import "./CommentItem.scss";

const CommentItem = ({ comment, isFirst, deleteComment }) => (
  <>
    <div className="comment-item__divider"></div>
    <div className={`comment-item ${isFirst ? "comment-item--first" : ""}`}>
      <Avatar src={comment.avatarUrl} size="large" className="comment-item__avatar comments__placeholderavatar--margin-top" />
      <div className="comment-item__content">
        <div className="comment-item__header">
          <p className="comment-item__name bold">{comment.name}</p>
          <time className="comment-item__date">
            {formatTimestamp(new Date(comment.timestamp))}
          </time>
        </div>
        <p className="comment-item__text">{comment.comment}</p>
        <button className="comment-item__delete-button" onClick={() => deleteComment(comment.id)}>Delete</button>
      </div>
    </div>
  </>
);

CommentItem.propTypes = {
  comment: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    comment: PropTypes.string,
  }).isRequired,
  isFirst: PropTypes.bool,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentItem;