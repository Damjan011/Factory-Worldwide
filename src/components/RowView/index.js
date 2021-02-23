import React from 'react';
import RowValueSetter from '../RowValueSetter';
import './style.css';

const RowView = ({ initialFetch, rowView, totalCount, setRowView }) => {
  if (initialFetch) {
    return (
      <div className="row-view-area">
        <div className="row-view-label">
          View:
        </div>
        <div className="row-view-options">
          <RowValueSetter numOfRows={20} setRowView={setRowView} rowView={rowView} />
          <RowValueSetter numOfRows={50} setRowView={setRowView} rowView={rowView} />
          <RowValueSetter numOfRows={100} setRowView={setRowView} rowView={rowView} />
          <RowValueSetter numOfRows={totalCount} text='(All)' setRowView={setRowView} rowView={rowView} />
        </div>
      </div>
    )
  }
  return null;
}

export default RowView;