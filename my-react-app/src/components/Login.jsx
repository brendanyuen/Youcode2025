import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LogoWhite from '../assets/Full-logo-white.png'; // Adjust the path as necessary

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (isLogin) {
      // Handle login logic here
      console.log('Login:', formData);
      navigate('/events', { state: { username: formData.username } });
    } else {
      // Handle account creation and navigate to profile setup
      console.log('Create Account:', formData);
      navigate('/profile-setup', { state: { username: formData.username } });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-banner">
          <div className="banner-content">
            <div className="logo-placeholder">
              <img src={LogoWhite} alt="Logo" style={{ width: '100%', height: 'auto' }} />
            </div>
            <h1 className="title">Welcome to YouCode</h1>
            <p className="subtitle">Your Gateway to Learning</p>
          </div>
        </div>
        
        <div className="login-content">
          <div className="login-form-container">
            <div className="form-toggle">
              <button 
                className={isLogin ? 'active' : ''} 
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={!isLogin ? 'active' : ''} 
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <button type="submit" className="submit-button">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 