import React, { useState } from 'react';
import axios from 'axios';
import styles from'./signup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cin, setCin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    // Add validation here if needed
    if (password !== confirmedPassword) {
      setErrorMessage('Password and confirmed password do not match.');
      return;
    }

    axios
      .post('http://localhost:8093/signup', {
        username,
        password,
        confirmedPassword,
        email,
        cin,
      })
      .then((response) => {
        // Handle successful signup
        console.log('Signup successful:', response.data);
        // Optionally, you can redirect the user to the login page or take other actions
      })
      .catch((error) => {
        // Handle signup error
        console.error('Error during signup:', error);
        setErrorMessage('An error occurred during signup. Please try again.');
      });
  };

  return (
    <div id="msform" className="msform">
      <fieldset className="fieldset">
        <h2 className="fs-title">Signup</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>CIN:</label>
          <input
            type="text"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={handleSignup} className="action-button">Signup</button>
      </fieldset>
    </div>
  );
};


export default Signup;
