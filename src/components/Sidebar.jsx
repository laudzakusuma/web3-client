import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      style={{ filter: isActive === name ? 'grayscale(0)' : 'grayscale(1) brightness(1.5)' }} 
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="sidebar">
      {/* Ganti teks 'CF' dengan gambar logo */}
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