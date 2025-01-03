import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Check if there's a token in localStorage to keep the user logged in
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? 'http://localhost:5000/api/users' : 'http://localhost:5000/api/users/login';
    try {
      const response = await axios.post(url, formData);
      if (response.status === 200 || response.status === 201) {
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        if (isSignup) {
          // Redirect to login page after successful signup
          navigate('/login');
        } else {
          // Redirect to home page after successful login
          navigate('/home');
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="login-signup-container">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {formData.name}</h2>
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
