// src/components/CommentSection/CommentSection.jsx
import React from 'react';
import './CommentSection.scss';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import useComments from '../useComments';

const CommentSection = ({ currentVideoId, isDesktopOrTablet }) => {
  const { comments, loading, addComment, deleteComment } = useComments(currentVideoId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="comments">
      <h2 className="comments__counter">{comments.length} Comments</h2>
      <CommentForm onAddComment={addComment} />
      <CommentList comments={comments} deleteComment={deleteComment} isDesktopOrTablet={isDesktopOrTablet} />
    </section>
  );
};

export default CommentSection;