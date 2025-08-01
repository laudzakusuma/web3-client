import React, { useState, useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import CrowdfundingABI from '../abis/Crowdfunding.json';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0xd4afBFc0dBaec220e5Db814a4410f4F0EA0170b4',
    CrowdfundingABI.abi
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const { mutateAsync: payoutToOwner } = useContractWrite(contract, 'payoutToOwner');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address,
					form.title,
					form.description,
					ethers.utils.parseUnits(form.target, 18),
					new Date(form.deadline).getTime(),
					form.image,
				],
			});
      console.log("Panggilan kontrak berhasil", data);
    } catch (error) {
      console.log("Panggilan kontrak gagal", error);
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));
    return parsedCampaigns;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }
    return parsedDonations;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
    return data;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        disconnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getDonations,
        donate,
        searchTerm,
        setSearchTerm,
        payoutToOwner,
        isProfileModalOpen,
        setIsProfileModalOpen,
       }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);