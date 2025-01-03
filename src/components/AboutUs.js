import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="about-container">
                <div className="text-container">
                    <p>We are a passionate group of individuals, committed to creating something amazing—a community where creativity and technology meet.</p>
                    <p className="mobile-hidden">
                        Our team consists of designers, developers, and strategists working together to push the boundaries of what's possible.
                    </p>
                    <p className="mobile-hidden"> We believe in continuous learning and growth, and we are always on the lookout for new challenges to tackle.</p>
                    <p className="mobile-hidden">
                        We are committed to creating an e-commerce platform built to adapt and evolve with customer needs. We continuously seek new opportunities.
                    </p>
                    <p className="mobile-hidden">Enjoy our office.</p>
                </div>
            </div>
            <br /><br />
            <div className="products-container">
    <h2 className="products">Products</h2>
</div>
        </section>
    );
};

export default AboutUs;
