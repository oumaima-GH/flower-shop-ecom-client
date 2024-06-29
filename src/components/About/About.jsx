import React from 'react';
import './About.css';

function About() {
  return (
    <>
    <section className="hero">
    <div className="hero-content">
      <h4>About us</h4>
      <h1>Embarking on the Path to Our Dreams</h1>
      <p>Share some details here. This is a flexible section where you can share anything you want. It could be details or some information.</p>
    </div>
  </section>
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/5409716/pexels-photo-5409716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Florist Image"
          />
        </div>
        <div className="about-content">
          <h2>About Florist</h2>
          <p>
            Welcome to Florist, where floral artistry meets passion for nature's beauty. Our story is rooted in a deep love for flowers and a commitment to creating unforgettable moments for our customers.
          </p>
          <button className="read-more-button">Shop Now</button>
        </div>
      </div>
    </section>
    <section className="story">
      <div className="story-content">
        <h2>Our Story</h2>
        <h1>A Journey from Passion to Florist</h1>
        <p>
          Our journey began with a seed of passion that blossomed into a flourishing business. Allow us to share the story of our founder's deep-rooted love for flowers and how it led to the creation of your trusted floral destination. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>
        <p>
          Explore the tale of dedication, creativity, and a vision to spread the joy of nature’s beauty through the art of floral design. Discover the moments that shaped our founder’s path and paved the way for Florist to become a symbol of floral excellence.
        </p>
      </div>
      <div className="story-image">
        <img src="https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/our-story.jpg" alt="Florist Story" />
      </div>
    </section>
    </>
  );
}

export default About;
