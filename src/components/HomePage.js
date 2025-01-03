import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

const HomePage = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <div>
      {/* Pass handleSearch as onSearch prop */}
      <Navbar onSearch={handleSearch} />
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
