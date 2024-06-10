import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

function Button({ onClick, children, className, type = 'button', iconSrc }) {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {iconSrc && <img src={iconSrc} alt="Button Icon" className="button__icon" />}
      <span className="button__text">{children}</span>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  iconSrc: PropTypes.string,
};

export default Button;
