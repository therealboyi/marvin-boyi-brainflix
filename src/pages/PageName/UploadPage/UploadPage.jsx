// UploadPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoThumbnail from '../../../components/VideoThumbnail/VideoThumbnail';
import Button from '../../../components/Buttons/Button/Button'; 
import './UploadPage.scss';
import thumbnailImage from '../../../assets/images/Upload-video-preview.jpg'; 
import uploadIcon from '../../../assets/icons/publish.svg'; 
const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Video uploaded with title:", title, "and description:", description);
    alert('Upload successful!');
    navigate('/');
  };

  return (
    <div className="upload-container">
      <h1>Upload Video</h1>
      <div className="upload-content">
        <VideoThumbnail imageSrc={thumbnailImage} />
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">TITLE YOUR VIDEO</label>
            <input
              type="text"
              id="title"
              placeholder="Add a title to your video"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">ADD A VIDEO DESCRIPTION</label>
            <textarea
              id="description"
              placeholder="Add a description to your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="button-group">
            <Button type="submit" iconSrc={uploadIcon} className="button--primary">PUBLISH</Button>
            <span className="cancel-button">CANCEL</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
