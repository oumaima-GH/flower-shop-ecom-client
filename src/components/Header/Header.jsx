import React, { useEffect } from 'react';
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
      <a href="#" className='logo'>Flower Shop</a>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <a href="#login" className="login-button">Login</a>
    </header>
  );
}

export default Header;
