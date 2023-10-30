import React, { useState } from 'react';
import axios from 'axios';
import TokenService from '../util/tokenService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import Signup from '../signup/signup';
import ForgotPassword from '../forgetpassword/forgetpassword';
import './login.css'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // New state variable for login status
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://localhost:8093/login', {
        username,
        password,
      })
      .then((response) => {
        console.log('Response Headers:', response.headers);
        const token = response.headers.authorization;
        console.log('Received Token:', token);
        if (token) {
          TokenService.saveToken(token);
          setLoggedIn(true); // Set user as logged in
        } else {
          console.error('Token not found in response headers.');
          // Handle the error condition if needed
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Handle login error if needed
      });
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <div className="login-page">
      <div className="container">
        {loggedIn ? (
          TokenService.isAdmin() ? (
            navigate('/dashboard') 
          ) : (
            <div className="row justify-content-center">
              {/* ... Rest of your login form */}
            </div>
          )
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="login-box">
                <h2 className="card-title">Login</h2>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form>
                <div className="user-box">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>
                  <a
                    className="login-button"
                    onClick={handleLogin}
                  >
                    Login
                  </a>
                  <a
                    className="signup-button"
                    onClick={openSignupModal}
                  >
                    Signup
                  </a>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={openForgotPasswordModal}
                  >
                    Forgot Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
  
        <Modal
          isOpen={isSignupModalOpen}
          onRequestClose={closeSignupModal}
          // Add modal styles and configurations here if needed
        >
          {/* Render the Signup component in the modal */}
          <Signup />
        </Modal>
        <Modal
          isOpen={isForgotPasswordModalOpen}
          onRequestClose={closeForgotPasswordModal}
          // Add modal styles and configurations here if needed
        >
          {/* Render the ForgotPassword component in the modal */}
          <ForgotPassword onClose={closeForgotPasswordModal} />
        </Modal>
      </div>
    </div>
  );
  
  
              }  

export default Login;
