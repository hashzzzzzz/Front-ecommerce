import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    img: [], // Array of image URLs
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3200/api/cards/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'img') {
      // Handle the img input as an array of URLs
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value.split(',').map((url) => url.trim()), // Split by comma and trim spaces
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!product.name || !product.description || !product.img.length || !product.price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3200/api/cards/${id}`, product);
      alert('Product updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update product.');
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="update-product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="description">Product Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label htmlFor="img">Product Images (comma separated URLs):</label>
          <textarea
            name="img"
            value={product.img.join(', ')} // Display as comma-separated values
            onChange={handleInputChange}
            placeholder="Enter image URLs, separated by commas"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Product Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateCardForm;
