import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import navigation styles
import { Navigation } from 'swiper'; // Import the Navigation module from Swiper

const ProductSlider = () => {
  return (
    <div className="product-slider">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true} // Enable navigation functionality
        modules={[Navigation]} // Register the Navigation module
      >
        <SwiperSlide>
          <img src="image1.jpg" alt="Product Image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="image2.jpg" alt="Product Image 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="image3.jpg" alt="Product Image 3" />
        </SwiperSlide>
        {/* Add more images here */}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
