import React from 'react';
import './style.css';

const RowValueSetter = ({ numOfRows, setRowView, rowView, text }) => {
  return (
    <div onClick={() => setRowView(numOfRows)} className={`${rowView === numOfRows ? 'active' : ''} row-option`}>
      <p>{numOfRows} rows {text}</p>
    </div>
  )
}

export default RowValueSetter;