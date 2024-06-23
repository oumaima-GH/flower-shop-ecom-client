import React from 'react';
import './About.css';

function About() {
  return (
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
          <button className="read-more-button">Read More</button>
        </div>
      </div>
    </section>
  );
}

export default About;
