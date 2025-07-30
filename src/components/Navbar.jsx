import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './CustomButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
      {/* Di sini bisa ditambahkan input search jika mau */}
      <div style={{ flex: 1 }}>
        {/* Search bar placeholder */}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={{ backgroundColor: address ? '#1dc071' : '#8c6dfd' }}
          handleClick={() => {
            if(address) {
              navigate('create-campaign');
            } else {
              connect();
            }
          }}
        />

        {/* Link ke profil, bisa ditambahkan gambar profil di sini */}
        {address && (
          <Link to="/profile">
             <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#2c2f32', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                {/* Placeholder untuk ikon/gambar profil */}
                <p style={{color: 'white', fontSize: '12px'}}>Me</p>
             </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;