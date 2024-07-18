import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);
  const cartItems = useSelector((state) => state.cart.cart.data || []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <>
      <header className="header" id="navbar">
        <Link to="/" className="logo">Flower Shop</Link>
        <nav className={isMobileMenuOpen ? 'nav-open' : ''}>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
            <li><Link to="/shop" onClick={toggleMobileMenu}>Shop</Link></li>
            <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
            {!isAuthenticated ? (
              <li><Link to="/login" className="login-button" onClick={toggleMobileMenu}>Login</Link></li>
            ) : (
              <li><button className="logout-button" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Logout</button></li>
            )}
          </ul>
        </nav>
        {isAuthenticated && userRole === 'Customer' && (
          <div className="shop-icon">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" onClick={toggleCart} />
            <span className="cart-count">{Object.keys(cartItems).length}</span>
          </div>
        )}
        {isAuthenticated && userRole === 'Seller' && (
          <nav className="seller-nav">
            <ul>
              <li><Link to="/dashboard" onClick={toggleMobileMenu}>My Dashboard</Link></li>
              {/* <li><button className="logout-button" onClick={handleLogout}>Logout</button></li> */}
            </ul>
          </nav>
        )}
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </header>
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}

export default Header;
