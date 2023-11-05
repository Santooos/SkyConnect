import React from 'react';
import './SignIn.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';


function SignIn() {
  // ... any additional logic or state

  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="signin-logo"/>
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
          <button className="login-btn">
            Login
          </button>
          <div className="new-user-prompt">
            <p>New User?</p>
            <Link to="/SignUp" className="signup-link">Sign Up</Link> {/* Link to the signup route */}
            {/* Here you might want to put a link or a button to handle new user registration */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
