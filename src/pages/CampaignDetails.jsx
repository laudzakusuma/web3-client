import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
  const { state: campaign } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(campaign.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(campaign.pId);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {r
      toast.error("Please enter a valid donation amount.");
      return;
    }
    setIsLoading(true);
    await donate(campaign.pId, amount);
    toast.success('Donation successful! Thank you for your support.');
    navigate('/');
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <h1 className="page-title" style={{ marginBottom: '1rem' }}>{campaign.title}</h1>

      <div className="details-grid">
        {/* Kolom Kiri: Gambar & Info */}
        <div>
          <img src={campaign.image} alt="campaign" className="campaign-details-image" />
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${calculateBarPercentage(campaign.target, campaign.amountCollected)}%` }}></div>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="fund-card" style={{padding: '1rem'}}>
              <h4 className="fund-card-stat" style={{fontSize: '20px'}}>{remainingDays}</h4>
              <p className="fund-card-stat" style={{fontSize: '14px', color: 'var(--color-text-light)'}}>Days Left</p>
          </div>
          <div className="fund-card" style={{padding: '1rem'}}>
              <h4 className="fund-card-stat" style={{fontSize: '20px'}}>{campaign.amountCollected}</h4>
              <p className="fund-card-stat" style={{fontSize: '14px', color: 'var(--color-text-light)'}}>Raised of {campaign.target} ETH</p>
          </div>
           <div className="fund-card" style={{padding: '1rem'}}>
              <h4 className="fund-card-stat" style={{fontSize: '20px'}}>{donators.length}</h4>
              <p className="fund-card-stat" style={{fontSize: '14px', color: 'var(--color-text-light)'}}>Total Backers</p>
          </div>
        </div>
      </div>

      <div className="details-grid" style={{marginTop: '3rem'}}>
          {/* Kolom Kiri: Story & Donators */}
          <div>
              <h4 className="details-section-title">Creator</h4>
              <div className="fund-card-owner">
                <div className="fund-card-owner-avatar"><p>{campaign.owner.substring(2, 4)}</p></div>
                <p className="fund-card-owner-address"><span>{campaign.owner}</span></p>
              </div>

              <h4 className="details-section-title" style={{ marginTop: '2rem' }}>Story</h4>
              <p style={{ color: 'var(--color-text-light)' }}>{campaign.description}</p>

              <h4 className="details-section-title" style={{ marginTop: '2rem' }}>Donators</h4>
              <div>
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="donator-row">
                    <p className="donator-address">{index + 1}. {item.donator}</p>
                    <p className="donator-amount">{item.donation} ETH</p>
                  </div>
                )) : (
                  <p style={{ color: 'var(--color-text-light)' }}>No donators yet. Be the first one!</p>
                )}
              </div>
          </div>

          {/* Kolom Kanan: Kotak Donasi */}
          <div>
            <div className="fund-box">
              <h4 className="fund-box-title">Fund the campaign</h4>
              <div className="fund-box-input">
                <input type="number" placeholder="ETH 0.1" step="0.01" className="form-field-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="fund-box-pledge">
                  <h4>Back it because you believe in it.</h4>
                  <p>Support the project for no reward, just because it speaks to you.</p>
                </div>
                <CustomButton 
                  btnType="button" 
                  title="Fund Campaign" 
                  styles={{ width: '100%', backgroundColor: 'var(--color-accent-secondary)', marginTop: '1rem' }} 
                  handleClick={handleDonate} 
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CampaignDetails;