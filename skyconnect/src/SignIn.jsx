import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import './SignIn.css';
import logo from './logo.png';

function SignIn() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = () => {
    // Handle login logic here
    // ...

    // Redirect to Dashboard component after successful login
    navigate('/chatwindow'); // Use navigate with the correct route
  };

  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="signin-logo" />
      </div>
      <div className="welcome-container">
        <div className="welcome-message">
          <h2>Welcome to SkyConnect</h2>
          <p>SkyConnect is a platform where you can connect with people and exchange ideas. You can also find a job here.</p>
        </div>
      </div>
      <div className="login-container">
        <div className="login-form">
          <h3>Login Here</h3>
          <label htmlFor="login-email">Email Address</label>
          <input
            type="text"
            id="login-email"
            aria-label="Email address"
            placeholder="Email address"
          />
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="login-password"
            aria-label="Password"
          />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="new-user-prompt">
            <p>New User? <Link to="/signup" className="signup-link">Sign Up</Link></p> {/* Ensure the route is lowercase */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
