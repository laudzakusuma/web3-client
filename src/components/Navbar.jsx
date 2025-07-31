import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  // Hapus toggleDrawer, ambil setIsProfileModalOpen dari context
  const { connect, address, setIsProfileModalOpen } = useStateContext();

  return (
    <div className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search for campaigns" className="search-input" />
        <div className="search-button">Go</div>
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
          // OnClick sekarang membuka modal, bukan dropdown
          <div className="profile-icon" onClick={() => setIsProfileModalOpen(true)}>
            Me
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;