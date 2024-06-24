// src/components/FullscreenHandler/FullscreenHandler.jsx
import { useEffect } from 'react';

const FullscreenHandler = ({ children, videoContainerRef, isFullscreen, setIsFullscreen }) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setIsFullscreen]);

  return children;
};

export default FullscreenHandler;
