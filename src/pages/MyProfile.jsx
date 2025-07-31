import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const allCampaigns = await getCampaigns();
    const userCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    setCampaigns(userCampaigns);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract && address) {
      fetchUserCampaigns();
    }
  }, [address, contract]);

  return (
    <div className="profile-page-container">
      {/* Kartu Header Profil yang Baru */}
      <div className="profile-header-card">
        <h1 className="page-title">My Profile</h1>
        <div className="profile-info">
          <p className="profile-info-label">Wallet Address</p>
          <p className="profile-info-value">{address}</p>
        </div>
        <div className="profile-info">
          <p className="profile-info-label">Campaigns Created</p>
          <p className="profile-info-value">{campaigns.length}</p>
        </div>
      </div>

      {/* Daftar Kampanye Milik Pengguna */}
      <div className="content-card" style={{ marginTop: '2rem' }}>
        <DisplayCampaigns 
          title="My Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </div>
    </div>
  );
};

export default MyProfile;