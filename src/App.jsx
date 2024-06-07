import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import NextVideos from './components/NextVideos/NextVideos';
import Footer from './components/Footer/Footer';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
// import Buttons from './components/Buttons';

function App() {
  const nextVideos = [
    {},
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
            <h1>Video Title</h1>
            <h2>Video Details</h2>
            <p>Video Description</p>
          </div>
          <div className="comment-section-container">
            <p>Comment Section Component</p>
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
