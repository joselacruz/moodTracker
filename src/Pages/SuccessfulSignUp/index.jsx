import React from 'react';
import Layout from '../../Components/Layout';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo';
import './SuccessfulSignUp.css';

const SuccessfulSignUp = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="SendEmail">
        <div className="form-container">
          <Logo />
          <h1 className="title">Your account has been created!</h1>
          <p className="subtitle">
            Now that you have a Mood Tracker account, log in to access your
            emotion history and keep an ongoing track of your emotional
            well-being!
          </p>
          {/* <img src={emailLogo} alt="email" /> */}
          <button
            className="primary-button login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessfulSignUp;
