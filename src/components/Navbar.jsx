import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';
import { navlinks } from '../constants';
import { menu, close } from '../assets';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connect, address, disconnect, setIsProfileModalOpen } = useStateContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState('dashboard');

  useEffect(() => {
    const activeLink = navlinks.find(link => link.link === location.pathname);
    if (activeLink) {
      setIsActive(activeLink.name);
    }
  }, [location.pathname]);

  return (
    <div className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search for campaigns" className="search-input" />
        <div className="search-button">Go</div>
      </div>

      {/* Navigasi Desktop */}
      <div className="navbar-actions-desktop">
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
          <div className="profile-icon" onClick={() => setIsProfileModalOpen(true)}>
            Me
          </div>
        )}
      </div>

      {/* Tombol Menu Mobile */}
      <div className="navbar-actions-mobile">
        <div className="profile-icon" onClick={() => setToggleDrawer((prev) => !prev)}>
            <img 
                src={`data:image/svg+xml;utf8,${toggleDrawer ? close : menu}`}
                alt="menu"
                style={{ width: '60%', height: '60%', objectFit: 'contain' }}
            />
        </div>
      </div>

      {/* Drawer Menu Mobile */}
      {toggleDrawer && (
        <div className={`mobile-drawer ${toggleDrawer ? 'visible' : ''}`}>
            {navlinks.map((link) => (
                <div 
                    key={link.name}
                    className={`mobile-drawer-item ${isActive === link.name ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                        navigate(link.link);
                    }}
                >
                    {link.name}
                </div>
            ))}
            <div className="mobile-drawer-actions">
                <CustomButton
                    btnType="button"
                    title={address ? 'Disconnect' : 'Connect'}
                    styles={{ width: '100%', backgroundColor: address ? '#e84141' : 'var(--color-accent-secondary)' }}
                    handleClick={() => {
                        if (address) disconnect();
                        else connect();
                        setToggleDrawer(false);
                    }}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;