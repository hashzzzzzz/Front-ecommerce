import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    if (token && userEmail) {
      setIsLoggedIn(true);  // Set logged-in status if token and email exist
      // Redirect based on user email or to a default route
      if (userEmail === 'erollhashani5@gmail.com') {
        navigate('/add-product');  // Redirect to protected route if correct email
      } else {
        navigate('/');  // Redirect to homepage for other users
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? 'http://localhost:3200/api/users/register' : 'http://localhost:3200/api/users/login';

    try {
      let response;
      if (isSignup) {
        response = await axios.post(url, formData);
        if (response.status === 201) {
          // On successful signup
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', formData.email);  // Store the email
          setIsSignup(false);  // Switch to login view after successful signup
          navigate('/login');
        }
      } else {
        response = await axios.post(url, formData);
        if (response.status === 200) {
          // On successful login
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', formData.email);  // Store the email
          // Redirect based on user email
          if (formData.email === 'erollhashani5@gmail.com') {
            navigate('/add-product');  // Redirect to protected route
          } else {
            navigate('/');  // Redirect to homepage for other users
          }
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="login-signup-container">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {localStorage.getItem('email')}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isSignup ? <h2>Sign Up</h2> : <h2>Login</h2>}
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>

          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
