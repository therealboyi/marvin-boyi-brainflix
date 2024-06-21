// src/pages/PageName/Homepage/HomePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useVideos from '../../../components/useVideos';
import useIsDesktop from '../../../components/useIsDesktop';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import VideoTitle from '../../../components/VideoTitle/VideoTitle';
import MetricData from '../../../components/MetricData/MetricData';
import VideoDescription from '../../../components/VideoDetails/VideoDetails';
import CommentSection from '../../../components/CommentSection/CommentSection';
import NextVideos from '../../../components/NextVideos/NextVideos';
import './HomePage.scss';

const HomePage = ({ initialVideoId }) => {
  const { videoId } = useParams();
  const isDesktop = useIsDesktop();
  const { videos, currentVideoId, setCurrentVideoId } = useVideos(initialVideoId, videoId);

  const filteredVideos = videos.filter(video => video.id !== currentVideoId);

  const handleVideoChange = (newVideoId) => {
    setCurrentVideoId(newVideoId);
  };

  return (
    <main className="main">
      <section className="video-section">
        <VideoPlayer currentVideoId={currentVideoId} />
      </section>
      <div className="content-container">
        <section className="headline">
          <div className="headline-container">
            <VideoTitle currentVideoId={currentVideoId} />
            <div className="divider title-divider"></div>
            <MetricData currentVideoId={currentVideoId} />
            <div className="divider"></div>
          </div>
          <VideoDescription currentVideoId={currentVideoId} />
          <div className="comment-section-container">
            <CommentSection currentVideoId={currentVideoId} />
          </div>
          {!isDesktop && (
            <div className="next-videos-container">
              <NextVideos videos={filteredVideos} onVideoChange={handleVideoChange} />
            </div>
          )}
        </section>
        {isDesktop && <div className="main-divider"></div>}
        {isDesktop && (
          <section className="next-videos-container">
            <NextVideos videos={filteredVideos} onVideoChange={handleVideoChange} />
          </section>
        )}
      </div>
    </main>
  );
};

export default HomePage;
