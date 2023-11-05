import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import logo from './logo.png';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // navigate to dashboard page
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    }
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
          {loginError && <div className="login-error">{loginError}</div>}
          <label htmlFor="login-email">Email Address</label>
          <input
            type="text"
            id="login-email"
            aria-label="Email address"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="login-password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
          <div className="new-user-prompt">
            <p>New User? <Link to="/SignUp" className="signup-link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
