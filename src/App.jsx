// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/PageName/HomePage/HomePage";
import VideoUploadPage from "./pages/PageName/UploadPage/UploadPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import './assets/logo/BrainFlix-logo.svg';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app global-grid">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videos/:videoId" element={<HomePage />} />
          <Route path="/upload" element={<VideoUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
