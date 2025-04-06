import React from 'react';
import { useLocation } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import './Testing.css';

const Testing = () => {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  return (
    <div className="testing-page">
      <header className="testing-header">
        <div className="header-left">
          <h1 className="testing-title">Testing Page</h1>
        </div>
      </header>

      <TabNavigation />

      <div className="testing-content">
        <div className="testing-card">
          <h2>Testing Information</h2>
          <p>Username: {username}</p>
          <p>This is a test page to debug routing issues.</p>
        </div>
      </div>
    </div>
  );
};

export default Testing; 