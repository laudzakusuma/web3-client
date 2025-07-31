import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const ProfileModal = () => {
  const navigate = useNavigate();
  const { isProfileModalOpen, setIsProfileModalOpen, disconnect } = useStateContext();

  if (!isProfileModalOpen) return null;

  const handleNavigation = (path) => {
    navigate(path);
    setIsProfileModalOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsProfileModalOpen(false);
  };

  return (
    <div className="profile-modal-overlay" onClick={() => setIsProfileModalOpen(false)}>
      {/* Kartu modal, event propagation dihentikan agar klik di dalam tidak menutup modal */}
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-item" onClick={() => handleNavigation('/my-profile')}>
          My Profile
        </div>
        <div className="profile-modal-item" onClick={handleDisconnect}>
          Disconnect
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;