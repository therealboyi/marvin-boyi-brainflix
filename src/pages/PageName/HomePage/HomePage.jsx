// HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HomePage.scss";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import VideoTitle from "../../../components/VideoTitle/VideoTitle";
import MetricData from "../../../components/MetricData/MetricData";
import VideoDescription from "../../../components/VideoDetails/VideoDetails";
import CommentSection from "../../../components/CommentSection/CommentSection";
import NextVideos from "../../../components/NextVideos/NextVideos";
import axios from 'axios';

const HomePage = ({ initialVideoId }) => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [currentVideoId, setCurrentVideoId] = useState(videoId || initialVideoId || "");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [videos, setVideos] = useState([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get('https://unit-3-project-api-0a5620414506.herokuapp.com/register');
        setApiKey(response.data.api_key);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };
    fetchApiKey();
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
        const response = await axios.get(`https://unit-3-project-api-0a5620414506.herokuapp.com/videos?api_key=${apiKey}`);
        const firstVideoId = response.data[0].id;
        setVideos(response.data);
        if (!initialVideoId && !videoId) {
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
    <div className="app global-grid">
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
                <NextVideos videos={filteredVideos} onVideoClick={(id) => navigate(`/videos/${id}`)} />
              </div>
            )}
          </section>
          {isDesktop && <div className="main-divider"></div>}
          {isDesktop && (
            <div className="next-videos-container">
              <NextVideos videos={filteredVideos} onVideoClick={(id) => navigate(`/videos/${id}`)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
