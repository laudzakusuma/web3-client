import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { useStateContext } from './context';
import { Toaster } from 'react-hot-toast';
import { Sidebar, Navbar, ProfileModal } from './components';
import { Home, MyProfile, CreateCampaign, CampaignDetails, Landing, Login, Onboarding, Payment, Withdraw } from './pages';

const ProtectedRoute = () => {
  const { address } = useStateContext();
  if (!address) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppLayout = () => {
  const { isProfileModalOpen } = useStateContext();

  return (
    <div className={`app-layout-container ${isProfileModalOpen ? 'content-blurred' : ''}`}>
      <div className="app-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-content">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <ProfileModal />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Rute Terlindungi */}
      <Route element={<ProtectedRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          {/* Dihapus: Rute /profile yang lama */}
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Route>
      </Route>

      {/* Rute default */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default App;