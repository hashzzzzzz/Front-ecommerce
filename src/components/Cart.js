import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Handle checkout action
  const handleCheckout = () => {
    const userEmail = localStorage.getItem('email');
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else if (!userEmail) {
      alert('Please log in first!');
      navigate('/login', { state: { redirectTo: '/cart' } });
    } else {
      navigate('/buy-now');
    }
  };

  // Handle item removal from the cart
  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, itemIndex) => itemIndex !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }));
  };

  // Calculate total price
  const calculateTotal = () => {
    const total = cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty!</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img
                src={item.img || 'fallback-image.jpg'} // Use fallback image if img is undefined
                alt={item.name}
                className="cart-item-image"
              />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Price: {item.price} €</p>
              </div>
              <button
                className="remove-item-button"
                onClick={() => handleDelete(index)}
                aria-label="Remove item from cart"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <>
          <div className="total-price">
            <p>Total: {calculateTotal()} €</p>
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
