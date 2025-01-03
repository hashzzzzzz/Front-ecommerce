import React, { useState, useEffect } from "react";
import image from '../assets/foto22.jpg';
import image1 from '../assets/foto321.jpg';
import image2 from '../assets/foto123.jpg';
import './AbiutImage.css';

const images = [image, image1, image2];

const AboutImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Automatically change every 3 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="slider-container">
            <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link"
            >
                ABOUT US
            </a>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="about-image"
            />
        </div>
    );
};

export default AboutImageSlider;
