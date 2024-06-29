import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button className='back' onClick={() => navigate('/')}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back
        </button>
        <h2>Login to Flower Shop</h2>
        <p>Discover the perfect floral expression for every moment and occasion.</p>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your-email@gmail.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit" className='submit'>Log In</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <span onClick={handleSignUpClick} className="signup-text">Sign Up</span></p>
        </div>
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default LoginPage;
