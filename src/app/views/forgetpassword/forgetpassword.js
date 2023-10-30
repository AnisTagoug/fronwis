import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = () => {
    axios
      .post(`http://localhost:8093/forgot-password?username=${username}`)
      .then((response) => {
        setMessage(response.data);
        setError('');
      })
      .catch((error) => {
        setMessage('');
        setError('Failed to reset password: ' + error.response.data);
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your username to reset your password.</p>
      <div>
        <label> Username :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button onClick={handleForgotPassword}>Reset Password</button>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ForgotPassword;
