// src/pages/PageName/UploadPage/UploadPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoThumbnail from '../../../components/VideoThumbnail/VideoThumbnail';
import Button from '../../../components/Buttons/Button/Button';
import { API_URL, VIDEOS_ENDPOINT } from '../../../components/Api';
import './UploadPage.scss';
import thumbnailImage from '../../../assets/images/Upload-video-preview.jpg';
import uploadIcon from '../../../assets/icons/publish.svg';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(thumbnailImage);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', ''); 
    }
    formData.append('channel', 'My Channel');
    formData.append('views', '0');
    formData.append('likes', '0');
    formData.append('duration', '0:00');
    formData.append('video', 'https://unit-3-project-api-0a5620414506.herokuapp.com/stream');
    formData.append('timestamp', Date.now().toString());
    formData.append('comments', JSON.stringify([]));

    try {
      await axios.post(`${API_URL}${VIDEOS_ENDPOINT}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful!');
      navigate('/');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-container__title">Upload Video</h1>
      <hr className="upload-container__divider upload-container__divider--top" />
      <div className="upload-container__content">
        <VideoThumbnail imageSrc={imagePreview} />
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
          <div className="upload-container__form-group">
            <label htmlFor="image" className="upload-container__label">UPLOAD AN IMAGE</label>
            <input
              type="file"
              id="image"
              className="upload-container__input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="upload-container__button-group upload-container__button-group--inside">
            <Button type="submit" iconSrc={uploadIcon} className="button button--primary">PUBLISH</Button>
            <span className="upload-container__cancel-button" onClick={() => navigate('/')}>CANCEL</span>
          </div>
        </form>
        <hr className="upload-container__divider upload-container__divider--bottom-tablet" />
      </div>
      <hr className="upload-container__divider upload-container__divider--bottom-desktop" />
      <div className="upload-container__button-group upload-container__button-group--outside">
        <Button type="submit" iconSrc={uploadIcon} className="button button--primary" onClick={handleSubmit}>PUBLISH</Button>
        <span className="upload-container__cancel-button" onClick={() => navigate('/')}>CANCEL</span>
      </div>
    </div>
  );
};

export default UploadPage;
