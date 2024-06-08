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

  return (
    <div className="app global-grid">
      <NavBar className="navbar" />
      <main className="main">
        <section className="video-section">
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
    </div>
  );
}

export default App;
