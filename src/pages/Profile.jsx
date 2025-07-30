import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
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
    if(contract && address) {
      fetchUserCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile;