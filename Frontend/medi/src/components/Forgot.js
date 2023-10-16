


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Forgot() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [keys, setKeys] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleKeys = (e) => {
    setKeys(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch user data based on the provided username from the JSON server
    try {
      const response = await fetch(`http://localhost:6800/user?Username=${username}`);
      const userData = await response.json();

      if (userData.length === 0) {
        setErrorMessage('Username not found');
        return;
      }

      const user = userData[0];
      
      if (user.keys !== keys) {
        setErrorMessage('Key does not match');
        return;
      }

      // Both username and key matched, navigate to reset password page
      navigate('/reset-password', { state: { username } });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form">
      <div>
        <h1>Forgot Password</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="label">Username</label>
        <input
          onChange={handleUserName}
          className="input"
          value={username}
          type="text"
        />

        <label className="label">Key</label>
        <input
          onChange={handleKeys}
          className="input"
          value={keys}
          type="password"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <p>
        Login Here <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
