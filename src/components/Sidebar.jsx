import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { navlinks } from '../constants';
import logo from '../assets/Crowdfunding.png'; 

const Icon = ({ name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`sidebar-icon ${isActive === name ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
    onClick={handleClick}
  >
    <img 
      src={imgUrl} 
      alt={name} 
      className="sidebar-icon-img"
      style={{ opacity: isActive === name ? 1 : 0.6 }} 
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Gunakan hook useLocation
  const [isActive, setIsActive] = useState('dashboard');

  // Sinkronkan state 'isActive' dengan URL saat ini
  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = navlinks.find(link => link.link === currentPath);
    if (activeLink) {
      setIsActive(activeLink.name);
    }
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-logo">
        <img src={logo} alt="logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
      </Link>

      <div className="sidebar-nav">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            {...link}
            isActive={isActive}
            handleClick={() => {
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;