import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from '../components';
import '../Landing.css';

const Login = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  useEffect(() => {
    if (address) {
      navigate('/onboarding');
    }
  }, [address, navigate]);

  return (
    <div className="landing-container">
      <div className="glass-card">
        <h1>Connect Your Wallet</h1>
        <p>
          To continue, please connect your Web3 wallet. This is your gateway to creating, funding, and managing campaigns on the platform.
        </p>
        <CustomButton
          btnType="button"
          title="Connect Wallet"
          handleClick={() => connect()} 
          styles={{ background: 'linear-gradient(to right, var(--color-accent-primary), #27a063)', color: 'white' }}
        />
      </div>
    </div>
  );
};

export default Login;
