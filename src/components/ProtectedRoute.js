import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedEmail }) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  // Check if user is logged in and has the correct email
  if (!token || email !== allowedEmail) {
    return <Navigate to="/login" replace />;  // Redirect to login page if not authorized
  }

  return element;  // Render the protected route
};

export default ProtectedRoute;
