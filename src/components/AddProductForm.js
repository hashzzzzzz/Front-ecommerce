import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ refreshProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    img: [], // Change to an array
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'img') {
      // Handle multiple image URLs (comma-separated)
      const urls = value.split(',').map((url) => url.trim());
      setNewProduct((prev) => ({ ...prev, img: urls }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
  
    try {
      if (!newProduct.name || !newProduct.description || !newProduct.img.length || !newProduct.price) {
        alert("All fields are required!");
        return;
      }
  
      // Ensure img is an array of strings before submitting
      const validImg = Array.isArray(newProduct.img) ? newProduct.img : newProduct.img.split(',').map((url) => url.trim());
  
      const response = await axios.post('http://localhost:3200/api/cards', {
        ...newProduct,
        img: validImg,
      });
  
      if (response.status === 200 || response.status === 201) {
        alert('Product added successfully!');
        if (refreshProducts) {
          refreshProducts();
        }
        setNewProduct({ name: '', description: '', price: '', img: [] });
      } else {
        setErrorMessage('Failed to add product.');
        alert('Failed to add product.');
      }
  
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response) {
        setErrorMessage(`Failed to add the product. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        setErrorMessage('Failed to add the product. No response from the server.');
      } else {
        setErrorMessage(`Failed to add the product. Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="description"
        value={newProduct.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
      />
      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Product Price"
        required
      />
      <textarea
        name="img"
        value={newProduct.img.join(', ')} // Display as comma-separated values
        onChange={handleChange}
        placeholder="Enter image URLs, separated by commas"
        required
      />
      <button type="submit" disabled={isSubmitting}>Add Product</button>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default AddProductForm;
