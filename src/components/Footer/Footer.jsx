import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h2 className="footer-title">Flower Shop</h2>
                <p className="footer-description">
                    Welcome to the world of Florist, where flowers come to life with love and creativity.
                    Discover our story, our passion for flowers, and our commitment to making every moment memorable.
                </p>
            </div>
            <div className="footer-section">
                <h2 className="footer-title">Links</h2>
                <ul className="footer-links">
                    <li className="footer-link-item"><a href="/" className="footer-link active">Home</a></li>
                    <li className="footer-link-item"><a href="/about" className="footer-link">About</a></li>
                    <li className="footer-link-item"><a href="/shop" className="footer-link">Shop</a></li>
                    <li className="footer-link-item"><a href="/contact" className="footer-link">Contact</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h2 className="footer-title">Contact Us</h2>
                <p className="footer-contact">
                    Address: 13 Fifth Avenue, New York 101660<br/>
                    Email: <a href="mailto:contact@info.com" className="footer-link">contact@info.com</a><br/>
                    Phone: +91 987 654 321
                </p>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 2024 Flower Shop</p>
            </div>
        </footer>
    );
}

export default Footer;
