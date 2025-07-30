import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components';
import '../Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-card">
        <h1>Welcome to Web3 Crowdfunding</h1>
        <p>
          A decentralized platform where creators can bring their ideas to life with the power of community. Raise funds for your projects transparently and securely on the blockchain.
        </p>
        <CustomButton
          btnType="button"
          title="Get Started"
          handleClick={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default Landing;