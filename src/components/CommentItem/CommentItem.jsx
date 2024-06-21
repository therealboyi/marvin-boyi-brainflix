// src/components/CommentItem/CommentItem.jsx
import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import { formatTimestamp } from "../utils";
import "./CommentItem.scss";

const CommentItem = ({ comment, isFirst }) => (
  <>
    <div className="comment-item__divider"></div>
    <div className={`comment-item ${isFirst ? "comment-item--first" : ""}`}>
      <Avatar src={comment.avatarUrl} size="large" />
      <div className="comment-item__content">
        <div className="comment-item__header">
          <p className="comment-item__name bold">{comment.name}</p>
          <p className="comment-item__date">
            {formatTimestamp(new Date(comment.timestamp))}
          </p>
        </div>
        <p className="comment-item__text">{comment.comment}</p>
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
};

export default CommentItem;