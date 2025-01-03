import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Banner.css'; 
import Slider from 'react-slick'; // Import slick-carousel component
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles

const ProductBanner = ({ userEmail, onAddToCart, showAllProducts = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/cards'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  // Slick Carousel settings - disable centerMode to show only full products
  const settings = {
    infinite: true,
    centerMode: false, // Disable centerMode to avoid showing portions of adjacent products
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="product-banner">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} userEmail={userEmail} onAddToCart={onAddToCart} />
            </div>
          ))}
        </Slider>
      </section>

      {showAllProducts && (
        <section className="all-products">
          <h2>All Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <ProductCard product={product} userEmail={userEmail} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductBanner;
