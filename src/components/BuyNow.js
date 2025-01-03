import React, { useState, useEffect, useRef } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './BuyNow.css';

const BuyNow = ({ cart = [] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const initialLoadRef = useRef(false); // Ref to track initial load

  // Load cart data and calculate total amount
  useEffect(() => {
    if (initialLoadRef.current) return; // Skip the effect on initial render
    initialLoadRef.current = true;

    let cartData = cart;

    // Check if user is coming from the ProductDetails page (single product)
    if (location.state?.productPrice) {
      // For single product checkout
      setTotalAmount(location.state.productPrice * 100); // Convert to cents
      setCartItems([{
        price: location.state.productPrice,
        name: location.state.productName,
        img: location.state.productImage   // Ensure image is valid
      }]);
    } else if (cart.length > 0) {
      // For cart checkout
      const cartTotal = cart.reduce((total, item) => total + item.price, 0) * 100; // Convert to cents
      setTotalAmount(cartTotal);
      setCartItems(cart);
    } else {
      // Fallback: Load cart from localStorage if no cart prop
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartTotal = savedCart.reduce((total, item) => total + item.price, 0) * 100; // Convert to cents
      setTotalAmount(cartTotal);
      setCartItems(savedCart);
    }
  }, [cart, location.state]); // Add proper dependencies

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded
    }

    if (totalAmount === 0) {
      setPaymentError('Your cart is empty or no product selected.');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3200/payment/create-payment-intent', {
        amount: totalAmount, // Send calculated amount to the backend
      });
      

      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentError(error.message);
        setPaymentSuccess(false);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setPaymentError(null);
        // Clear cart on success
        localStorage.removeItem('cart');
        setCartItems([]);
        setTotalAmount(0);
      }
    } catch (error) {
      setPaymentError('An error occurred while processing the payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-now-container">
      <h2 className="buy-now-title">Secure Payment</h2>
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img
                src={item.img || 'placeholder-image-url.jpg'}  // Ensure item.image exists or use placeholder
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span>{item.name}</span>
                <br />
                <span>{item.price.toFixed(2)} €</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">Total: {(totalAmount / 100).toFixed(2)} €</p>
      </div>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="card-element-container">
          <CardElement className="card-element" />
        </div>
        {paymentError && <div className="payment-error">{paymentError}</div>}
        {paymentSuccess && <div className="payment-success">Payment successful!</div>}
        <button type="submit" className="pay-button" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};  

export default BuyNow;
