// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/PageName/HomePage/HomePage";
import VideoDetailsPage from "./pages/PageName/VideoDetailsPage/VideoDetailsPage";
import VideoUploadPage from "./pages/PageName/UploadPage/UploadPage";
import './assets/logo/BrainFlix-logo.svg'

function App() {
  return (
    <Router>
      <div className="app global-grid">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videos/:videoId" element={<VideoDetailsPage />} />
          <Route path="/upload" element={<VideoUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

