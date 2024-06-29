import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <>
    <div className="heroContact-section">
    <div className="heroContact-content">
    <div className="heroContact-text">
            <p>Contact Us</p>
            <h2>Get in Touch with Our Experts Team</h2>
            <p>Share some details here. This is a flexible section where you can share anything you want. It could be details or some information.</p>
          </div>
        </div>
      </div>
    <div className="contact-form-container">
      <div className="contact-details">
        <h2>Get In Touch With Us</h2>
        <p>Share some details here. This is a flexible section where you can share anything you want. It could be details or some information.</p>
        <div className="contact-info">
          <p><strong>Address</strong></p>
          <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
          <hr />
          <p><strong>Phone</strong></p>
          <p>(+91) 987 654 321</p>
          <hr />
          <p><strong>Email</strong></p>
          <p>info@contact.com</p>
        </div>
      </div>
      <form className="contact-form">
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Comment or Message</label>
          <textarea name="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Contact;
