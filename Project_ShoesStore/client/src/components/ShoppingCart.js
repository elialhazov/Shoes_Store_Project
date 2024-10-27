// src/components/ShoppingCart.js
import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, updateQuantity, removeFromCart, onCheckout, onClose }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart-overlay">
      <div className="shopping-cart bg-white rounded shadow-lg p-4">
        <button className="close-button btn btn-danger" onClick={onClose}>סגור</button>
        <h2 className="text-center mb-4">עגלת הקניות שלך</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">העגלה ריקה</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div className="cart-item d-flex justify-content-between align-items-center mb-3" key={item._id}>
                <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="img-thumbnail" style={{ width: '50px' }} />
                <div className="item-details">
                  <h2 className="h5">{item.name}</h2>
                  <p className="mb-1">מחיר ליחידה: {item.price} ש"ח</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                    className="form-control"
                    min="1"
                  />
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => removeFromCart(item._id)}>הסר</button>
                </div>
                <p>מחיר כולל: {item.price * item.quantity} ש"ח</p>
              </div>
            ))}
            <div className="cart-total text-center mt-4">
              <h3>מחיר כולל: {totalPrice} ש"ח</h3>
              <button className="btn btn-success btn-lg" onClick={onCheckout}>בצע הזמנה</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;








