import React from 'react';
import axios from 'axios';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, userEmail, onAddToCart }) => {
  const navigate = useNavigate();
  const { img, name, price, description, _id } = product;

  const handleProductClick = (e) => {
    if (!e.target.classList.contains('add-to-cart-button')) {
      navigate(`/product/${_id}`);
    }
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      // Instead of posting to the backend, the product is added directly to the state in the parent component.
      onAddToCart(product); // Pass the product to the onAddToCart handler in the parent component

      // Optionally, show a confirmation alert
      alert(`${name} has been added to the cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add the product to the cart.');
    }
  };

  // Function to navigate to the product update page (admin only)
  const handleEdit = () => {
    navigate(`/product-update/${_id}`);
  };

  // Check if the current user is an admin
  const isAdmin = userEmail === 'erollhashani5@gmail.com';

  return (
  
    <div className="product-card" onClick={handleProductClick}>
      <div>
      </div>
      <img src={img || 'https://via.placeholder.com/150'} alt={name} className="product-image" />
      <div className="product-body">
        <h3 className="price">{price} €</h3>
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(e) }} className="add-to-cart-button">
          Add to Cart
        </button>
        {isAdmin && (
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;