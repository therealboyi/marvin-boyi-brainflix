import React, { useState, useEffect } from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoTitle from "./components/VideoTitle/VideoTitle";
import MetricData from "./components/MetricData/MetricData";
import VideoDescription from "./components/VideoDetails/VideoDetails";
import CommentSection from "./components/CommentSection/CommentSection";

function App() {
  const [currentVideoId, setCurrentVideoId] = useState(() => {
    return localStorage.getItem('currentVideoId') || "";
  });

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
          <div className="divider main-divider"></div>
          <Footer currentVideoId={currentVideoId} setCurrentVideoId={setCurrentVideoId} />
        </div>
      </main>
    </div>
  );
}

export default App;
