import React from 'react';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = deadline - Date.now() > 0 ? 'X days left' : 'Finished';

  return (
    <div style={{ width: '288px', borderRadius: '15px', backgroundColor: '#1c1c24', cursor: 'pointer' }} onClick={handleClick}>
      <img src={image} alt="fund" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <h3 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '600', fontSize: '16px', color: 'white', textAlign: 'left', lineHeight: '26px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h3>
        <p style={{ marginTop: '5px', fontFamily: 'Epilogue, sans-serif', fontWeight: 'normal', fontSize: '12px', color: '#808191', textAlign: 'left', lineHeight: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '15px', gap: '2px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '600', fontSize: '14px', color: '#b2b3bd', lineHeight: '22px' }}>{amountCollected}</h4>
            <p style={{ marginTop: '3px', fontFamily: 'Epilogue, sans-serif', fontWeight: 'normal', fontSize: '12px', color: '#808191', lineHeight: '18px' }}>Raised of {target}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '600', fontSize: '14px', color: '#b2b3bd', lineHeight: '22px' }}>{remainingDays}</h4>
            <p style={{ marginTop: '3px', fontFamily: 'Epilogue, sans-serif', fontWeight: 'normal', fontSize: '12px', color: '#808191', lineHeight: '18px' }}>Days Left</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '12px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131a' }}>
             <p style={{color: '#fff', fontSize: '10px'}}> Ow </p>
          </div>
          <p style={{ flex: 1, fontFamily: 'Epilogue, sans-serif', fontWeight: 'normal', fontSize: '12px', color: '#808191', overflow: 'hidden', textOverflow: 'ellipsis' }}>by <span style={{ color: '#b2b3bd' }}>{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard;