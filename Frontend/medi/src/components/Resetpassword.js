


import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { state } = location;
  const { username } = state;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      return;
    }

    // Update the user's password on the JSON server
    try {
      const response = await fetch(`http://localhost:6800/user?Username=${username}`);
      const userData = await response.json();

      if (userData.length === 0) {
        setErrorMessage('User not found');
        return;
      }

      const user = userData[0];
      user.password = password;
      user.confirmpassword=password;
      const updateResponse = await fetch(`http://localhost:6800/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (updateResponse.ok) {
        // Password updated successfully, navigate to login page
        navigate('/login');
      } else {
        setErrorMessage('Password update failed');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form">
      <div>
        <h1>Reset Password</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="label">New Password</label>
        <input
          onChange={handlePasswordChange}
          className="input"
          value={password}
          type="password"
        />

        <label className="label">Confirm Password</label>
        <input
          onChange={handleConfirmPasswordChange}
          className="input"
          value={confirmPassword}
          type="password"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="btn" type="submit">
          Reset Password
        </button>
      </form>
      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
