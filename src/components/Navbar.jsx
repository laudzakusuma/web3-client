import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search for campaigns" className="search-input" />
        <div className="search-button">
          Go
        </div>
      </div>

      <div className="navbar-actions">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={{ backgroundColor: address ? 'var(--color-accent-primary)' : 'var(--color-accent-secondary)' }}
          handleClick={() => {
            if (address) navigate('create-campaign');
            else connect();
          }}
        />
        {address && (
          <Link to="/profile">
            <div className="profile-icon">
              Me
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
