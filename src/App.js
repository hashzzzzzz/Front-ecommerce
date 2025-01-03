import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProductGrid from './components/ProductGrid';
import AddProductForm from './components/AddProductForm';
import UpdateCardForm from './components/UpdateProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import DeleteCardForm from './components/DeleteProductForm';
import ProductDetailsPage from './components/ProductDetailsPage';
import Cart from './components/Cart';
import BuyNow from './components/BuyNow';
import ProductBanner from './components/ProductBanner';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';  
import { Elements } from '@stripe/react-stripe-js'; 
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import AboutImage from './components/AboutImage';
import Footer from './components/Footer';
import './App.css';
import ContactUs from './components/ContactUs';

// Stripe promise initialization with your publishable key
const stripePromise = loadStripe('pk_test_51QVgxiDmrMV3SZ5ymn741uk1xnksjP5I3vXdU1tsxZJd7wQAlfQk2iT6eUJG0bGK2GLYUI623kFEklUFXTOdF1UT00y2l8zxFf');

// Basic dashboard and contact pages (non-payment related)
const Dashboard = () => <div>Dashboard Page</div>;


function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3200/api/cards');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  // Remove product from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  // Load user email and cart from localStorage
  useEffect(() => {
    const loggedInEmail = localStorage.getItem('userEmail');
    setUserEmail(loggedInEmail);
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Use empty array if no cart in localStorage
    setCart(storedCart);
    
    fetchProducts(); // Fetch products when the app loads
  }, []);

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar
        onSearch={handleSearch}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <Routes>
      <Route
  path="/Ecommerce"
  element={
    <div>
       
      <ProductBanner
        userEmail={userEmail}
        onAddToCart={handleAddToCart}
      />
        <AboutImage />
        <br />
        <AboutUs />
      
    {/* This will render the About Us section under the banner */}

     
      <ProductGrid
        searchQuery={searchQuery}
        userEmail={userEmail}
        products={products}
        onAddToCart={handleAddToCart}
      />
      <Team />
      <br />
      <Footer />
     
 
    </div>
  }
/>
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              onRemoveFromCart={handleRemoveFromCart}
             
            />
          }
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        
        {/* Wrap BuyNow route with Elements for Stripe payment */}
        <Route
          path="/buy-now"
          element={
            <Elements stripe={stripePromise}>
              <BuyNow cartItems={cart} />
            </Elements>
          }
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/product-add"
          element={
            <ProtectedRoute
              element={<AddProductForm refreshProducts={fetchProducts} />}
              allowedEmail="erollhashani5@gmail.com"
            />
          }
        />
        <Route
          path="/product-update/:id"
          element={
            <ProtectedRoute
              element={<UpdateCardForm refreshProducts={fetchProducts} />}
              allowedEmail="erollhashani5@gmail.com"
            />
          }
        />
        <Route
          path="/product-delete/:id"
          element={
            <ProtectedRoute
              element={<DeleteCardForm refreshProducts={fetchProducts} />}
              allowedEmail="erollhashani5@gmail.com"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
