import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Ensure this file exists and is correctly referenced
import logo from './logo.png';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useLinkedIn, setUseLinkedIn] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ... handle form submission logic
  };

  const handleLinkedInClick = () => {
    window.location.href = "https://www.linkedin.com/login";
  };

  const handleUseLinkedInChange = (event) => {
    setUseLinkedIn(event.target.checked);
    setEmail('');
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="signin-logo"/>
      </div>
      <div className="welcome-container">
        <div className="welcome-message">
          <h2>Welcome to SkyConnect</h2>
          <p>SkyConnect is a platform where you can connect with people and exchange ideas.</p>
        </div>
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3>Sign Up Here</h3>
          {!useLinkedIn && (
            <>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required={!useLinkedIn} disabled={useLinkedIn} />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            </>
          )}
          <div className="linkedin-checkbox-container">
            <label htmlFor="useLinkedIn" className="linkedin-label">Sign up with LinkedIn</label>
            <input type="checkbox" id="useLinkedIn" name="useLinkedIn" checked={useLinkedIn} onChange={handleUseLinkedInChange} />
          </div>
          {useLinkedIn && (
            <div className="linkedin-section">
              <p>Enter your LinkedIn credentials to sign up:</p>
              <button type="button" onClick={handleLinkedInClick} className="linkedin-btn">Sign up with LinkedIn</button>
            </div>
          )}
          <div className="existing-user-prompt">
            <p>Existing user? <Link to="/login" className="login-link">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
