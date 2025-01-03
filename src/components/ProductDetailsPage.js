import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks
import './ProductsDeatiledPage.css';
import Slider from 'react-slick'; // Import React Slick
import 'slick-carousel/slick/slick.css'; // Import slick styles
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null); // State to store product details
  const { productId } = useParams(); // Fetch product ID from URL params
  const navigate = useNavigate(); // Navigation hook for redirecting

  // Fetch product details based on productId from the URL
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3200/api/cards/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]); // Dependency array ensures the effect is called when productId changes

  if (!product) {
    return <p>Loading product details...</p>; // Display loading message if data is not fetched yet
  }

  // Function to handle checkout (redirect to buy now page)
  const handleCheckout = () => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      alert('Please log in first!');
      navigate('/login', { state: { redirectTo: `/products/${productId}` } }); // Redirect to login if not logged in
    } else {
      navigate('/buy-now', { state: { productPrice: product.price, productId: productId, productName: product.name, productImage: product.img[0] } }); // Redirect to buy-now page with product details
    }
  };

  // Slider settings for the image carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>

      {/* Image Slider */}
      <div className="product-slider">
        {Array.isArray(product.img) ? (
          <Slider {...sliderSettings}>
            {product.img.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${product.name} ${index + 1}`} className="product-image" />
              </div>
            ))}
          </Slider>
        ) : (
          <div>
            <img src={product.img} alt={product.name} className="product-image" />
          </div>
        )}
      </div>

      {/* Product Description and Price */}
      <p>{product.description}</p>
      <p>{product.price} €</p>

      {/* Checkout Button */}
      <button onClick={handleCheckout} className="checkout-button">
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetailsPage;
