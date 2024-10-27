// src/components/Banner.js

import React from 'react';
import './Banner.css'; // Import the CSS file for styling

// Functional component definition
const Banner = ({ imageUrl, altText, title, subtitle }) => {
  return (
    <div className="banner">
      {/* Banner image */}
      <img src={imageUrl} alt={altText} className="banner-image" />
      
      {/* Overlay content */}
      <div className="banner-overlay">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

// Export the component to be used in other parts of the application
export default Banner;


