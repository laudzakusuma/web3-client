import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { daysLeft } from '../utils';
import toast from 'react-hot-toast';

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const { address, contract, getCampaigns, payoutToOwner } = useStateContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
      setUserCampaigns(filteredCampaigns);
    } catch (error) {
      console.error("Failed to fetch user campaigns", error);
      toast.error("Could not fetch your campaigns.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract && address) {
      fetchUserCampaigns();
    }
  }, [address, contract]);

  const handlePayout = async (campaignId) => {
    setIsLoading(true);
    try {
      await payoutToOwner({ args: [campaignId] });
      toast.success("Funds have been withdrawn successfully!");
      // Refresh data setelah penarikan berhasil
      fetchUserCampaigns();
    } catch (error) {
      console.error("Failed to payout", error);
      toast.error("Withdrawal failed. Please check conditions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page-container">
      {isLoading && <Loader />}
      <div className="profile-header-card">
        <h1 className="page-title">Withdraw Funds</h1>
        <p style={{ color: 'var(--color-text-light)', marginTop: '1rem' }}>
          Manage and withdraw funds from your completed campaigns.
        </p>
      </div>

      <div className="withdraw-campaigns-list">
        {userCampaigns.length > 0 ? (
          userCampaigns.map((campaign) => {
            const isDeadlinePassed = new Date(campaign.deadline).getTime() < Date.now();
            const canWithdraw = isDeadlinePassed && !campaign.paidOut && campaign.amountCollected > 0;

            return (
              <div key={campaign.pId} className="withdraw-card">
                <img src={campaign.image} alt={campaign.title} className="withdraw-card-image" />
                <div className="withdraw-card-content">
                  <h3 className="fund-card-title">{campaign.title}</h3>
                  <div className="withdraw-card-stats">
                    <p>Collected: <span>{campaign.amountCollected} ETH</span></p>
                    <p>Deadline: <span>{new Date(campaign.deadline).toLocaleDateString()}</span></p>
                  </div>
                  <div className="withdraw-card-status">
                    {campaign.paidOut ? (
                      <p className="status-paid-out">Paid Out</p>
                    ) : isDeadlinePassed ? (
                      <p className="status-ready">Ready to Withdraw</p>
                    ) : (
                      <p className="status-active">Campaign Active ({daysLeft(campaign.deadline)})</p>
                    )}
                  </div>
                  <CustomButton
                    btnType="button"
                    title="Withdraw Funds"
                    styles={{ 
                      width: '100%', 
                      marginTop: '1rem',
                      backgroundColor: canWithdraw ? 'var(--color-accent-primary)' : 'var(--color-bg-element)',
                      cursor: canWithdraw ? 'pointer' : 'not-allowed'
                    }}
                    handleClick={() => canWithdraw && handlePayout(campaign.pId)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="content-card">
            <p style={{ color: 'var(--color-text-light)' }}>You have not created any campaigns yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;