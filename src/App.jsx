import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
// import Header from './components/Header/Header'

function App() {
  return (
    <div className="app global-grid">
      <NavBar className="navbar" />
      <main className="main">
        <section className="video-section">
          <video>Video Player Component</video>
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
    </div>
  );
}

export default App;
