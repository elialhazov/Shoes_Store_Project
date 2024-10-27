// src/App.js

import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ShoppingCart from './components/ShoppingCart';
import OrderPage from './components/OrderPage';
import Footer from './components/Footer';
import './App.css';
import axios from 'axios';

function App() {
  const [showCart, setShowCart] = useState(false); // State to control the visibility of the shopping cart
  const [showOrderPage, setShowOrderPage] = useState(false); // State to control the visibility of the order page
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Retrieve cart from local storage or initialize it to an empty array
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage whenever it changes
  }, [cart]);

  const handleCartClick = () => {
    setShowCart(true);
    setShowOrderPage(false); // Show the cart and hide the order page
  };

  const handleHomeClick = () => {
    setShowCart(false);
    setShowOrderPage(false); // Hide both the cart and the order page
  };

  const handleOrderClick = () => {
    setShowOrderPage(true);
    setShowCart(false); // Show the order page and hide the cart
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ); // Increase quantity if the product is already in the cart
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Add new product to the cart
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    ); // Update the quantity of a product in the cart
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId)); // Remove a product from the cart
  };

  const handleOrderSubmit = async (orderDetails) => {
    try {
      const response = await axios.post('http://localhost:5001/api/orders', {
        ...orderDetails,
        cartItems: cart,
      });
      if (response.status === 201) {
        alert('ההזמנה בוצעה בהצלחה!');
        setCart([]);
        setShowOrderPage(false); // Clear the cart and hide the order page upon successful order submission
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('שגיאה בביצוע ההזמנה. נסה שנית.');
    }
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0); // Calculate total item count in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price of items in the cart

  return (
    <div className="App">
      <NavBar
        onCartClick={handleCartClick}
        onHomeClick={handleHomeClick}
        onOrderClick={handleOrderClick}
        cartItemCount={cartItemCount}
        totalPrice={totalPrice}
      />
      {!showCart && !showOrderPage && <HomePage addToCart={addToCart} />}
      {showCart && !showOrderPage && <ShoppingCart
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleOrderClick} // Pass the function to proceed to the order page
      />}
      {showOrderPage && <OrderPage
        cartItems={cart}
        onClose={() => setShowOrderPage(false)}
        onSubmit={handleOrderSubmit}
      />}
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default App;










