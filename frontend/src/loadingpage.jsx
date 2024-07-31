// LoadingPage.jsx
import React from 'react';
import './LoadingPage.css'; // CSS faylını əlavə edin

const LoadingPage = () => (
  <div className="loading-container">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#3498db"
        strokeWidth="8"
        fill="none"
        className="loading-circle"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="#3498db"
        fontSize="18"
        dy=".3em"
        fontFamily="'Arial', sans-serif"
        className="loading-text"
      >
        Oxu.az
      </text>
    </svg>
    <p className="loading-message">Yüklənir...</p>
  </div>
);

export default LoadingPage;
