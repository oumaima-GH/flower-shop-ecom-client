import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <button className='back' onClick={() => navigate('/login')}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back
        </button>
        <h2>Register to Flower Shop</h2>
        <p>Discover the perfect floral expression for every moment and occasion.</p>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="email" placeholder="Your Username" required />
          </div>
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
          <div className="form-group">
            <label>Verify Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
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
          <button type="submit" className='submit'>Register</button>
        </form>
        <div className="signup-link">
          <p>Already have an account? <span onClick={handleSignInClick} className="signin-text">Sign In</span></p>
        </div>
      </div>
      <div className="register-image"></div>
    </div>
  );
};

export default Register;
