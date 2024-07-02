import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  {login}  from '../../redux/actions/authAction'
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // console.log(email, password);
  const handleSubmit =  (e) => {
    e.preventDefault();
    try{
       dispatch(login(email, password));
      if(isAuthenticated){
        navigate('/');
      }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button className='back' onClick={() => navigate('/')}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back
        </button>
        <h2>Login to Flower Shop</h2>
        <p>Discover the perfect floral expression for every moment and occasion.</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your-email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" className='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
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
