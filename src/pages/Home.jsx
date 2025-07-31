import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  
  const { address, contract, getCampaigns, searchTerm } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
      setFilteredCampaigns(data);
    } catch (error) {
      console.error("Gagal mengambil data kampanye:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = campaigns.filter(campaign => 
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    } else {
      setFilteredCampaigns(campaigns);
    }
  }, [searchTerm, campaigns]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={filteredCampaigns}
    />
  )
}

export default Home;