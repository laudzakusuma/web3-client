import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { Home, Profile, CreateCampaign, CampaignDetails } from './pages';

const App = () => {
  return (
    <div style={{ position: 'relative', display: 'flex', padding: '1rem', backgroundColor: '#13131a', minHeight: '100vh', color: 'white' }}>
      <div style={{ marginRight: '2.5rem', display: 'none', '@media (min-width: 640px)': { display: 'flex' } }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;