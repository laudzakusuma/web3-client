import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address, disconnect, setSearchTerm } = useStateContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  return (
    <div className="navbar">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for campaigns" 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <div className="search-button" onClick={handleSearch}>
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
          <div style={{ position: 'relative' }}>
            <div className="profile-icon" onClick={() => setToggleDrawer((prev) => !prev)}>
              Me
            </div>
            
            {toggleDrawer && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-item" onClick={() => { navigate('/my-profile'); setToggleDrawer(false); }}>
                  My Profile
                </div>
                <div className="profile-dropdown-item" onClick={() => { disconnect(); setToggleDrawer(false); }}>
                  Disconnect
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;