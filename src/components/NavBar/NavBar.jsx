import React from 'react';
import Button from '../Buttons/Button';
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
          <img
            src="/src/assets/images/Mohan-muruge.jpg"
            alt="Avatar"
            className="header__avatar-image"
          />
        </div>
      </div>
      <Button className="primary" iconSrc="/src/assets/icons/upload.svg">
        Upload
      </Button>
      <div className="header__avatar header__avatar--outside">
        <img
          src="/src/assets/images/Mohan-muruge.jpg"
          alt="Avatar"
          className="header__avatar-image"
        />
      </div>
    </header>
  );
}

export default NavBar;