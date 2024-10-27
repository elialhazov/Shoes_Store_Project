// src/components/OrderPage.js

import React from 'react';
import './OrderPage.css'; // Import the CSS file for styling

// Functional component definition
const OrderPage = ({ cartItems, onSubmit, onClose }) => {
  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      delivery: e.target.delivery.value,
    };
    onSubmit(orderDetails);
  };

  return (
    <div className="order-page container">
      <button className="close-button btn btn-danger" onClick={onClose}>סגור</button>
      <h2 className="text-center mb-4">ביצוע הזמנה</h2>
      <div className="order-summary">
        {cartItems.map(item => (
          <div className="order-item card mb-3" key={item._id}>
            <div className="card-body d-flex align-items-center">
              <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="img-thumbnail" style={{ width: '50px' }} />
              <div className="item-details ml-3">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">כמות: {item.quantity}</p>
                <p className="card-text">מחיר כולל: {item.price * item.quantity} ש"ח</p>
              </div>
            </div>
          </div>
        ))}
        <h3 className="text-center">מחיר כולל: {totalPrice} ש"ח</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name">שם:</label>
          <input type="text" id="name" name="name" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">אימייל:</label>
          <input type="email" id="email" name="email" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input type="tel" id="phone" name="phone" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">כתובת משלוח:</label>
          <input type="text" id="address" name="address" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="delivery">סוג משלוח:</label>
          <select id="delivery" name="delivery" className="form-control" required>
            <option value="3 ימים">משלוח תוך 3 ימים (בתשלום)</option>
            <option value="14 ימים">משלוח תוך 14 ימים (חינם)</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">בצע הזמנה</button>
      </form>
    </div>
  );
};

// Export the component to be used in other parts of the application
export default OrderPage;














