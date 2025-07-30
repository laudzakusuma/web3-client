import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { Loader } from './';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  }

  return (
    <div>
      <h1 className="display-campaigns-title">{title} ({campaigns.length})</h1>

      <div className="campaigns-container">
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <p style={{ color: 'var(--color-text-light)' }}>
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