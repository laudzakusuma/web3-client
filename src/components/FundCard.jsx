import React from 'react';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div className="fund-card" onClick={handleClick}>
      <img src={image} alt="fund" className="fund-card-image" />

      <div className="fund-card-content">
        <h3 className="fund-card-title">{title}</h3>
        <p className="fund-card-description">{description}</p>

        <div className="fund-card-stats">
          <div className="fund-card-stat">
            <h4>{amountCollected}</h4>
            <p>Raised of {target}</p>
          </div>
          <div className="fund-card-stat">
            <h4>{remainingDays}</h4>
            <p>Days Left</p>
          </div>
        </div>

        <div className="fund-card-owner">
          <div className="fund-card-owner-avatar">
            <p>{owner.substring(2, 4)}</p>
          </div>
          <p className="fund-card-owner-address">by <span>{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard;
