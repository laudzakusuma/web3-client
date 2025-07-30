import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '600', fontSize: '18px', textAlign: 'left' }}>{title} ({campaigns.length})</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', gap: '26px' }}>
        {isLoading && (
          <p>Loading campaigns...</p>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '500', fontSize: '14px', color: '#818183' }}>
            You have not created any campaigns yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
          <FundCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        )}
      </div>
    </div>
  )
}

export default DisplayCampaigns;