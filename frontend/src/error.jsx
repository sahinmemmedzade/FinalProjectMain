// ErrorPage.jsx
import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        {/* Background */}
        <rect x="0" y="0" width="800" height="600" fill="#1e1e1e"/>

        {/* Explosion Effect */}
        <circle cx="400" cy="300" r="150" fill="#ff5722" opacity="0.6"/>
        <circle cx="400" cy="300" r="200" fill="#ff5722" opacity="0.4"/>
        <circle cx="400" cy="300" r="250" fill="#ff5722" opacity="0.2"/>

        {/* Newspaper Icons */}
        <svg x="300" y="200" width="100" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.89 21.11 2 20 2ZM4 4H20V18H4V4ZM20 20H4V22H20V20Z" fill="#fff"/>
        </svg>
        <svg x="450" y="250" width="120" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.89 21.11 2 20 2ZM4 4H20V18H4V4ZM20 20H4V22H20V20Z" fill="#fff"/>
        </svg>
        <svg x="320" y="350" width="80" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.89 21.11 2 20 2ZM4 4H20V18H4V4ZM20 20H4V22H20V20Z" fill="#fff"/>
        </svg>
        <svg x="500" y="400" width="90" height="110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.89 21.11 2 20 2ZM4 4H20V18H4V4ZM20 20H4V22H20V20Z" fill="#fff"/>
        </svg>

        {/* Error Message */}
        <text x="400" y="300" fontSize="60" textAnchor="middle" fill="#fff" dy=".3em">404</text>
        <text x="400" y="370" fontSize="40" textAnchor="middle" fill="#fff">Page Not Found</text>
        <text x="400" y="420" fontSize="24" textAnchor="middle" fill="#ccc">The page you're looking for doesn't exist.</text>

        {/* Decorative Elements */}
        <text x="400" y="500" fontSize="16" textAnchor="middle" fill="#fff">Please check the URL or return to the homepage.</text>
        
        {/* Logo Below Circle */}
        <svg x="50%" y="530" width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'translate(-100px, 0)' }}>
          <circle cx="25" cy="25" r="20" fill="#ff5722"/>
          <text x="50%" y="50%" textAnchor="middle" fontSize="20" fill="#fff" dy=".3em">Oxu.az</text>
        </svg>
      </svg>
    </div>
  );
}

export default ErrorPage;
