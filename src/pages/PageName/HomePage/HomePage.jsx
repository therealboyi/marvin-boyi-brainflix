// src/components/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./HomePage.scss";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import VideoTitle from "../../../components/VideoTitle/VideoTitle";
import MetricData from "../../../components/MetricData/MetricData";
import VideoDescription from "../../../components/VideoDetails/VideoDetails";
import CommentSection from "../../../components/CommentSection/CommentSection";
import NextVideos from "../../../components/NextVideos/NextVideos";
import { API_URL, VIDEOS_ENDPOINT, fetchApiKey } from "../../../components/Api";

const HomePage = ({ initialVideoId }) => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [currentVideoId, setCurrentVideoId] = useState(videoId || initialVideoId || "");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [videos, setVideos] = useState([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKey();
        setApiKey(key);
      } catch (error) {
        console.error('Error getting API key:', error);
      }
    };

    getApiKey();
  }, []);

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
      if (!apiKey) return;

      try {
        const response = await axios.get(`${API_URL}${VIDEOS_ENDPOINT}?api_key=${apiKey}`);
        setVideos(response.data);
        if (!initialVideoId && !videoId) {
          const firstVideoId = response.data[0].id;
          setCurrentVideoId(firstVideoId);
          navigate(`/videos/${firstVideoId}`, { replace: true });
        } else {
          setCurrentVideoId(videoId || initialVideoId);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [apiKey, initialVideoId, navigate, videoId]);

  useEffect(() => {
    if (currentVideoId) {
      localStorage.setItem('currentVideoId', currentVideoId);
    }
  }, [currentVideoId]);

  const filteredVideos = videos.filter(video => video.id !== currentVideoId);

  return (
    <main className="main">
      <section className="video-section">
        <VideoPlayer currentVideoId={currentVideoId} apiKey={apiKey} />
      </section>
      <div className="content-container">
        <section className="headline">
          <div className="headline-container">
            <VideoTitle currentVideoId={currentVideoId} apiKey={apiKey} />
            <div className="divider title-divider"></div>
            <MetricData currentVideoId={currentVideoId} apiKey={apiKey} />
            <div className="divider"></div>
          </div>
          <VideoDescription currentVideoId={currentVideoId} apiKey={apiKey} />
          <div className="comment-section-container">
            <CommentSection currentVideoId={currentVideoId} apiKey={apiKey} />
          </div>
          {!isDesktop && (
            <div className="next-videos-container">
              <NextVideos videos={filteredVideos} onVideoClick={(id) => navigate(`/videos/${id}`)} />
            </div>
          )}
        </section>
        {isDesktop && <div className="main-divider"></div>}
        {isDesktop && (
          <footer className="next-videos-container">
            <NextVideos videos={filteredVideos} onVideoClick={(id) => navigate(`/videos/${id}`)} />
          </footer>
        )}
      </div>
    </main>
  );
};

export default HomePage;

