import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TabNavigation.css';

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || 'Guest';
  const profileData = location.state?.profileData || {};

  const handleNavigation = (path) => {
    // Pass both username and profileData to all routes
    const state = { 
      username,
      profileData,
      // Preserve any other state that might be present
      ...location.state
    };
    
    switch(path) {
      case '/profile':
        navigate('/profile', { state });
        break;
      case '/friends-events':
        navigate('/friends-events', { state });
        break;
      case '/events':
        navigate('/events', { state });
        break;
      default:
        navigate('/events', { state });
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="tab-navigation">
      <button
        className={`tab-button ${isActive('/events') ? 'active' : ''}`}
        onClick={() => handleNavigation('/events')}
      >
        Events
      </button>
      <button
        className={`tab-button ${isActive('/friends-events') ? 'active' : ''}`}
        onClick={() => handleNavigation('/friends-events')}
      >
        Friends
      </button>
      <button
        className={`tab-button ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => handleNavigation('/profile')}
      >
        Profile
      </button>
    </nav>
  );
};

export default TabNavigation; 