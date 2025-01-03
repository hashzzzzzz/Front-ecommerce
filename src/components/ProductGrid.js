import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ userEmail, searchQuery, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // Number of products to show initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3200/api/cards');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Log the products array to inspect the data
  useEffect(() => {
    console.log('Fetched products:', products);
  }, [products]);

  // Safely filter products based on the search query
  const filteredProducts = products.filter((product) => {
    const productName = product?.name || ''; // Use empty string if name is undefined
    const lowerSearchQuery = searchQuery?.toLowerCase() || ''; // Make sure searchQuery is lowercased and valid
    return productName.toLowerCase().includes(lowerSearchQuery);
  });

  // Handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Show 12 more products
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching fails
  }

  return (
    <div>
      <div className="product-grid">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            userEmail={userEmail}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {/* Show the "Show More" button only if there are more products to display */}
      {visibleCount < filteredProducts.length && (
        <div className="button-container">
          <button onClick={handleShowMore} className="show-more-button">
            Show More Products!
          </button>
        </div>
      )}
      <br /> 
    </div>
  );
};

export default ProductGrid;
