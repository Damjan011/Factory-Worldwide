import React from 'react';
import './style.css';

const NoData = ({ noData }) => {
  if (noData) {
    return (
      <div className="no-data">
        <p>No data</p>
      </div>
    )
  }
  return null;
}

export default NoData;