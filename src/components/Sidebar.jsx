import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navlinks } from '../constants';

const Icon = ({ name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`sidebar-icon ${isActive === name ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
    onClick={handleClick}
  >
    {/* Tampilkan gambar ikon, bukan teks */}
    <img 
      src={imgUrl} 
      alt={name} 
      style={{ 
        width: '50%', 
        height: '50%', 
        filter: isActive === name ? 'grayscale(0)' : 'grayscale(1) invert(0.2)' 
      }} 
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-logo">
        CF
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