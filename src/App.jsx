<<<<<<< HEAD
import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
<<<<<<< HEAD
=======
import NextVideos from './components/NextVideos/NextVideos';
import Footer from './components/Footer/Footer';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import VideoTitle from './components/VideoTitle/VideoTitle';
import MetricData from './components/MetricData/MetricData';
import VideoDescription from './components/VideoDetails/VideoDetails';
import CommentSection from './components/CommentSection/CommentSection';
>>>>>>> feature

function App() {
  const nextVideos = [
    // your next videos data
  ];
=======
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
>>>>>>> sprint-2

  return (
    <div className="app global-grid">
      <NavBar className="navbar" />
      <main className="main">
        <section className="video-section">
<<<<<<< HEAD
          <VideoPlayer />
        </section>
        <section className="headline">
          <div className="headline-container">
            <VideoTitle />
            <MetricData />
          </div>
          <VideoDescription />
          <div className="comment-section-container">
            <CommentSection />
          </div>
        </section>
        <section className="next-video-section">
          <div>Next Videos Component</div>
          <div>Next Videos Component</div>
          <div>Next Videos Component</div>
          <div>Next Videos Component</div>
        </section>
      </main>
      <Footer videos={nextVideos} />
=======
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
>>>>>>> sprint-2
    </div>
  );
}

export default App;
