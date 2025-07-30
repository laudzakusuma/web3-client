import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Gagal mengambil data kampanye:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home;