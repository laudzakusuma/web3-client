import React from 'react';

const Loader = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
      <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
        Transaction is in progress...<br/>
        Please wait.
      </p>
    </div>
  )
}

export default Loader;