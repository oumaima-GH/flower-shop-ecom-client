import React from 'react';
import './CallToAction.css';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="call-to-action">
      <h2>Explore Our Exquisite Floral Collections & Shop Now for the Perfect Blooms</h2>
      <Link to="/shop" className='shop-btn'>Shop Now</Link>
    </section>
  );
}

export default CallToAction;
