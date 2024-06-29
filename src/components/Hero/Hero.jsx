import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Welcome to Florist</h2>
        <h1>Let's Make Beautiful Flowers a Part of Your Life.</h1>
        <p>Explore a vibrant tapestry of blooms and arrangements that add color, fragrance, and elegance to your life. Discover the perfect floral expression for every moment and occasion.</p>
        <Link to="/shop" className="shop-now-button">Shop Now</Link>
      </div>
    </section>
  );
}

export default Hero;
