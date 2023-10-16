


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ loginUser }) {
  const navigate = useNavigate();

  // States for login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handling the username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handling the password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:6800/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const user = data.find((user) => user.Username === username && user.password === password);
      if (user) {
        // Credentials are correct, navigate to home
        setErrorMessage('');
        navigate('/main'); // Adjust the path to your home page
      } else {
        // Invalid credentials, show error message
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      // Handle any errors here
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="form">
      <div>
        <h1>Please Login</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label">Username</label>
        <input
          onChange={handleUsernameChange}
          className="input"
          value={username}
          type="text"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePasswordChange}
          className="input"
          value={password}
          type="password"
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot Password? <Link to="/forgot">Click Here</Link>
      </p>
    </div>
  );
}
