// src/components/NavBar.js

import React from 'react';
import './NavBar.css'; // Import the CSS file for styling
import { FaShoppingCart } from 'react-icons/fa'; // Import shopping cart icon from react-icons

// Functional component definition
const NavBar = ({ onCartClick, onHomeClick, cartItemCount, totalPrice, onOrderClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand button with logo and title */}
        <button className="navbar-brand btn" onClick={onHomeClick}>
          <img src={`${process.env.PUBLIC_URL}/images/26991915.jpg`} alt="Logo" className="logo-icon" />
          Lech Lecha
        </button>
        
        {/* Navbar toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Collapsible navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Home button */}
            <li className="nav-item">
              <button className="btn btn-light mr-2" onClick={onHomeClick}>
                <i className="fas fa-home"></i> Home
              </button>
            </li>
            
            {/* Order button */}
            <li className="nav-item">
              <button className="btn btn-light mr-2" onClick={onOrderClick}>
                <i className="fas fa-receipt"></i> Order
              </button>
            </li>
            
            {/* Cart button with item count and total price */}
            <li className="nav-item">
              <button className="btn btn-light" onClick={onCartClick}>
                <FaShoppingCart size={24} />
                <span className="badge badge-light ml-2">{cartItemCount}</span>
                <span className="ml-2">({totalPrice} ₪)</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the component to be used in other parts of the application
export default NavBar;














