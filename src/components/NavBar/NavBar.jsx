// NavBar.jsx
import React from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Buttons/Button/Button';
import './NavBar.scss';

function NavBar() {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <img
            src="/src/assets/logo/BrainFlix-logo.svg"
            alt="BrainFlix Logo"
            className="header__logo-image"
          />
        </a>
      </div>
      <div className="header__search-avatar-wrapper">
        <div className="header__search-container">
          <img
            src="/src/assets/icons/search.svg"
            alt="Search Icon"
            className="header__search-icon"
          />
          <input
            type="text"
            placeholder="Search"
            className="header__search-input"
          />
        </div>
        <div className="header__avatar header__avatar--inside">
          <Avatar src="/src/assets/images/Mohan-muruge.jpg" alt="Avatar" size="large" />
        </div>
      </div>
      <Button type="submit" iconSrc="/src/assets/icons/upload.svg" className="header__button">Upload</Button>
      <div className="header__avatar header__avatar--outside">
        <Avatar src="/src/assets/images/Mohan-muruge.jpg" alt="Avatar" size="large" />
      </div>
    </header>
  );
}

export default NavBar;
