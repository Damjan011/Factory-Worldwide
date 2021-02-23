import React from 'react';
import './style.css';

const Title = ({ title, description }) => (
  <div className="heading-area">
    <div className="main-label">
      <p>{title}</p>
    </div>
    <div className="main-text">
      <p>{description}</p>
    </div>
  </div>
)

export default Title;