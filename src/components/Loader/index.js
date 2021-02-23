import React from 'react';
import './style.css';

const Loader = ({ initialFetch, message }) => {
  if (initialFetch) {
    return (
      <div className="loading-container">
        <div className="loader">
        </div>
        <div class="loading-label">
          <p>
            {message}
          </p>
        </div>
      </div>
    )
  }
  return null;
}

export default Loader;