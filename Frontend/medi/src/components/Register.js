

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
export default function Register({ registerUser }) {
  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [numbers, setNumbers] = useState('');
  const [keys, setKeys] = useState('');
  const [errorMessage,setErrorMessage]=useState('');


  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the username change
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the confirm password change
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handling the mobile number change
  const handleMobile = (e) => {
    setNumbers(e.target.value);
  };

  // Handling the keys change
  const handleKeys = (e) => {
    setKeys(e.target.value);
  };

  // Handling the form submission
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      return;
    }
  
    if (!name || !username || !password || !confirmPassword || !numbers || !keys) {
      setErrorMessage('Please fill in all the required fields');
      return;
    }
  
    try {
      // Fetch user data from the server
      const response = await fetch('http://localhost:6800/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Check if username or mobile number already exists
      const existingUser = data.find(
        (user) => user.Username === username || user.numbers === numbers
      );
  
      if (existingUser) {
        setErrorMessage('Username or Mobile Number already exists');
        return;
      }
  
      const userData = {
        name,
        Username: username,
        password,
        confirmpassword: confirmPassword,
        numbers,
        keys,
      };
  
      const postResponse = await fetch('http://localhost:6800/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (postResponse.ok) {
        // Registration successful, navigate to the Login page
        navigate('/login');
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };
  


  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input onChange={handleName} className="input" value={name} type="text" />

        <label className="label">Username</label>
        <input onChange={handleUserName} className="input" value={username} type="text" />

        <label className="label">Password</label>
        <input onChange={handlePassword} className="input" value={password} type="password" />

        <label className="label">Confirm Password</label>
        <input onChange={handleConfirmPassword} className="input" value={confirmPassword} type="password" />

        <label className="label">Mobile Number</label>
        <input onChange={handleMobile} className="input" value={numbers} type="number" />

        <label className="label">Enter Key</label>
        <p>Note: If you forget your password, you can use your key by typing your favorite hero, followed by a set of characters of your choice, and then your favorite film.</p>
        <input onChange={handleKeys} className="input" value={keys} type="password" />

    
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}
