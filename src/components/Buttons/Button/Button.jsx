// Button.jsx
import React from 'react';
import './Button.scss';

function Button({ onClick, children, className, type = 'button', iconSrc }) {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {iconSrc && <img src={iconSrc} alt="Button Icon" className="button__icon" />}
      <span className="button__text">{children}</span>
    </button>
  );
}

export default Button;
