import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faShoppingCart,
  faRightToBracket,
  faPhone,
  faSearch,
  faPowerOff,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import './nav.css';
import logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, cartItems = [], onRemoveFromCart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status whenever location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');  // Remove the authentication token
    localStorage.removeItem('userEmail');  // Optional: If you're storing userEmail in localStorage
    localStorage.removeItem('cart');  // Optional: Clear the cart from localStorage
    navigate('/login');  // Redirect to login page after logout
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value); // Call parent onSearch if provided
  };

  // Navigate to checkout or login
  const handleCheckout = () => {
    const token = localStorage.getItem('token');  // Check if the user is logged in
    if (token) {
      navigate('/buy-now');  // Proceed to checkout if logged in
    } else {
      navigate('/login');  // Redirect to login page if not logged in
    }
  };

  // Ensure proper image URL
  const getImageUrl = (image) => {
    return image?.startsWith('http') || image?.startsWith('/')
      ? image
      : 'https://via.placeholder.com/50';
  };

  // Format price to two decimal places
  const formatPrice = (price) => {
    const priceValue = Number(price);
    return isNaN(priceValue) ? '0.00' : priceValue.toFixed(2);
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    onRemoveFromCart?.(itemId); // Call parent handler if provided
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/" aria-label="Go to homepage">
          <img src={logo} alt="e-commerce logo" className="logo-image" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          aria-label="Search products"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button className="search-button" aria-label="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/" aria-label="Home" className="nav-link">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>

        {/* Cart Dropdown */}
        <li
          className="cart-dropdown"
          onMouseEnter={() => setShowCartDropdown(true)}
          onMouseLeave={() => setShowCartDropdown(false)}
        >
          <Link to="/cart" aria-label="Go to cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          {showCartDropdown && (
            <div className="cart-dropdown-menu">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li key={item._id} className="cart-item">
                      <img
                        src={item.img || 'https://via.placeholder.com/50'}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">${formatPrice(item.price)}</p>
                      </div>
                      <button
                        className="remove-item-button"
                        aria-label="Remove item from cart"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              )}
            </div>
          )}
        </li>

        {/* Contact Link */}
        <li>
          <Link to="/contact" aria-label="Contact us" className="nav-link">
            <FontAwesomeIcon icon={faPhone} />
          </Link>
        </li>

        {/* Login/Logout Button */}
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="nav-link"
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          ) : (
            <Link to="/login" aria-label="Login" className="nav-link">
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
