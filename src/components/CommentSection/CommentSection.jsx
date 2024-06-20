// src/components/CommentSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentSection.scss";
import { formatTimestamp } from "../utils";
import Button from "../Buttons/Button/Button";
import Avatar from "../Avatar/Avatar";
import { API_URL, VIDEOS_ENDPOINT } from "../Api";

const CommentSection = ({ currentVideoId, apiKey }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentTextError, setCommentTextError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrTablet(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!apiKey || !currentVideoId) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}?api_key=${apiKey}`
        );
        const sortedComments = response.data.comments.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setComments(sortedComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [apiKey, currentVideoId]);

  const addNewComment = async (event) => {
    event.preventDefault();

    const isCommentTextEmpty = !commentText.trim();

    setCommentTextError(isCommentTextEmpty);

    if (isCommentTextEmpty) {
      alert("Please enter a comment.");
      return;
    }

    const newComment = {
      name: "Anonymous",
      comment: commentText,
    };

    console.log("Posting new comment:", newComment);

    try {
      const response = await axios.post(
        `${API_URL}${VIDEOS_ENDPOINT}/${currentVideoId}/comments?api_key=${apiKey}`,
        newComment
      );
      console.log("Response from server:", response.data);
      setComments([response.data, ...comments]);
      setCommentText("");
      setCommentTextError(false);
    } catch (error) {
      console.error("Error posting new comment:", error);
      console.log("Error details:", error.response.data);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comments">
      <h2 className="comments__counter">{comments.length} Comments</h2>
      <div className="comments__form-container">
        <div className="comments__form-wrapper">
          <Avatar src="/src/assets/images/Mohan-muruge.jpg" size="large" />
          <div className="comments__form-column">
            <span htmlFor="comment" className="comments__label bold">
              JOIN THE CONVERSATION
            </span>
            <form
              className={`comments__form ${
                isDesktopOrTablet ? "comments__form--horizontal" : ""
              }`}
              onSubmit={addNewComment}
            >
              <textarea
                id="comment"
                className={`comments__textarea ${
                  commentTextError ? "comments__textarea--error" : ""
                }`}
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
      </div>
      <div className="comments__list">
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id || comment.timestamp}>
            <div className="comments__divider"></div>
            <div
              className={`comments__item ${
                isDesktopOrTablet && index === 0 ? "comments__item--first" : ""
              }`}
            >
              <Avatar src={comment.avatarUrl} size="large" />
              <div className="comments__content">
                <div className="comments__header">
                  <p className="comments__name bold">{comment.name}</p>
                  <p className="comments__date">
                    {formatTimestamp(new Date(comment.timestamp))}
                  </p>
                </div>
                <p className="comments__text">{comment.comment}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
