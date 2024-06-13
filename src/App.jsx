// App.jsx
import React, { useState, useEffect } from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoTitle from "./components/VideoTitle/VideoTitle";
import MetricData from "./components/MetricData/MetricData";
import VideoDescription from "./components/VideoDetails/VideoDetails";
import CommentSection from "./components/CommentSection/CommentSection";
import NextVideos from "./components/NextVideos/NextVideos";

function App() {
  const [currentVideoId, setCurrentVideoId] = useState(() => {
    return localStorage.getItem('currentVideoId') || "";
  });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!currentVideoId) {
        try {
          const response = await fetch('/src/data/video-details.json');
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          setCurrentVideoId(data[0].id);
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
      }
    };

    fetchVideoData();
  }, [currentVideoId]);

  useEffect(() => {
    if (currentVideoId) {
      localStorage.setItem('currentVideoId', currentVideoId);
    }
  }, [currentVideoId]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch('/src/data/video-details.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const filteredVideos = data.filter(video => video.id !== currentVideoId);
        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  return (
    <div className="app global-grid">
      <NavBar className="navbar" />
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
          </section>
          {isDesktop && <div className="main-divider"></div>}
          {isDesktop && (
            <div className="next-videos-container">
              <NextVideos videos={videos} onVideoClick={setCurrentVideoId} />
            </div>
          )}
        </div>
      </main>
      {!isDesktop && (
        <div className="next-videos-container">
          <NextVideos videos={videos} onVideoClick={setCurrentVideoId} />
        </div>
      )}
    </div>
  );
}

export default App;
