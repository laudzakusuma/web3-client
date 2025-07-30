import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x01475C4B89d4e4576dB0e86d1845e9E0a11c0818');
  
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const address = useAddress();
  const connect = useMetamask();

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

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
       }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);