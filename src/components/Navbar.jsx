import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
      {/* Search Bar */}
      <div style={{ flex: 1, display: 'flex', maxWidth: '458px', backgroundColor: '#1c1c24', borderRadius: '20px', height: '52px', padding: '4px' }}>
        <input type="text" placeholder="Search for campaigns" style={{ flex: 1, fontFamily: 'Epilogue, sans-serif', color: 'white', backgroundColor: 'transparent', outline: 'none', padding: '0 1rem' }} />
        <div style={{ width: '72px', height: '100%', borderRadius: '20px', backgroundColor: '#4acd8d', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <p style={{ color: 'white', fontWeight: 'bold' }}>Go</p>
        </div>
      </div>

      {/* Tombol & Profil */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={{ backgroundColor: address ? '#1dc071' : '#8c6dfd' }}
          handleClick={() => {
            if (address) navigate('create-campaign')
            else connect();
          }}
        />
        {address && (
          <Link to="/profile">
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#2c2f32', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <p style={{ color: 'white' }}>Me</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar;