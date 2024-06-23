import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="#" className='logo'>Flower Shop</a>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
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
