import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { Home, Profile, CreateCampaign, CampaignDetails } from './pages';

const App = () => {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <div className="main-content">
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