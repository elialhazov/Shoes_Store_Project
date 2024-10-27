// src/components/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './HomePage.css'; // Import the CSS file for styling
import Banner from './Banner'; // Import the Banner component
import Footer from './Footer'; // Import the Footer component

// Functional component definition
const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]); // State for storing products

  // useEffect hook to fetch products from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(response => setProducts(response.data)) // Set products state with the fetched data
      .catch(error => console.error(error)); // Log any errors
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="home-page container">
      {/* Banner component with props */}
      <Banner 
        imageUrl="/images/istockphoto-1026680336-1024x1024.jpg" 
        altText="Banner Image" 
        title="Welcome to Lech Lecha" 
        subtitle="Your one-stop shop for shoes, sandals, boots, and more!" 
      />
      {/* About section */}
      <div className="about text-center my-4 p-4 bg-white rounded shadow-sm">
        <h2>About Our Store</h2>
        <p>At Lech Lecha, we offer a wide variety of shoes, sandals, boots, and more to meet all your footwear needs. Our mission is to provide high-quality products at affordable prices, ensuring that you find the perfect pair for any occasion. Visit us to experience our exceptional customer service and extensive selection of footwear.</p>
      </div>
      {/* Product grid */}
      <div className="product-grid row">
        {products.slice(0, 9).map(product => ( // Map through the products and display the first 9
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">מחיר: {product.price} ש"ח</p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>הוסף לעגלה</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

// Export the component to be used in other parts of the application
export default HomePage;
















