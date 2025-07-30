import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { connect, address } = useStateContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', md: { flexDirection: 'row' }, gap: '1.5rem', marginBottom: '2.5rem' }}>
      <div style={{ lg: { flex: 1 }, display: 'flex', flexDirection: 'row', maxWidth: '458px', backgroundColor: '#1c1c24', borderRadius: '9999px', height: '52px', padding: '4px' }}>
        <input type="text" placeholder="Search for campaigns" style={{ flex: 1, fontFamily: 'Epilogue, sans-serif', fontWeight: 'normal', fontSize: '14px', placeholder: { color: '#4b5264' }, color: 'white', backgroundColor: 'transparent', outline: 'none', padding: '0 1rem' }} />
        <div style={{ width: '72px', height: '100%', borderRadius: '20px', backgroundColor: '#4acd8d', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <p style={{ color: 'white', fontWeight: 'bold' }}>Go</p>
        </div>
      </div>

      <div style={{ display: 'none', lg: { display: 'flex' }, flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={{ backgroundColor: address ? '#1dc071' : '#8c6dfd' }}
          handleClick={() => {
            if (address) navigate('create-campaign')
            else connect();
          }}
        />
        <Link to="/profile">
          <div style={{ width: '52px', height: '52px', borderRadius: '9999px', backgroundColor: '#2c2f32', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <p style={{ color: 'white' }}>Me</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;