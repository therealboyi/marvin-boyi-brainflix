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
      <h1 className="upload-container__title">Upload Video</h1>
      <hr className="upload-container__divider upload-container__divider--top" />
      <div className="upload-container__content">
        <VideoThumbnail imageSrc={thumbnailImage} />
        <form onSubmit={handleSubmit} className="upload-container__form">
          <div className="upload-container__form-group">
            <label htmlFor="title" className="upload-container__label">TITLE YOUR VIDEO</label>
            <input
              type="text"
              id="title"
              className="upload-container__input"
              placeholder="Add a title to your video"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="upload-container__form-group">
            <label htmlFor="description" className="upload-container__label">ADD A VIDEO DESCRIPTION</label>
            <textarea
              id="description"
              className="upload-container__textarea"
              placeholder="Add a description to your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
        <hr className="upload-container__divider upload-container__divider--bottom-tablet" />
        <div className="upload-container__button-group upload-container__button-group--inside">
          <Button type="submit" iconSrc={uploadIcon} className="button button--primary" onClick={handleSubmit}>PUBLISH</Button>
          <span className="upload-container__cancel-button" onClick={() => navigate('/')}>CANCEL</span>
        </div>
      </div>
      <hr className="upload-container__divider upload-container__divider--bottom-desktop" />
      <div className="upload-container__button-group upload-container__button-group--outside">
        <Button type="submit" iconSrc={uploadIcon} className="button button--primary" onClick={handleSubmit}>PUBLISH</Button>
        <span className="upload-container__cancel-button" onClick={() => navigate('/')}>CANCEL</span>
      </div>
    </div>
  );
};

export default VideoUpload;





