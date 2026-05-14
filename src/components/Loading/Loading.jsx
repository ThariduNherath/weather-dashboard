import React from 'react';
import '../../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">
        <h2>Loading Weather Data</h2>
        <p>Fetching real-time weather information...</p>
      </div>
    </div>
  );
};

export default Loading;