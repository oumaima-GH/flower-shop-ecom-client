import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('navbar');
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header" id="navbar">
      <Link to="/" className='logo'>Flower Shop</Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <Link to="/login" className="login-button">Login</Link>
    </header>
  );
}

export default Header;
