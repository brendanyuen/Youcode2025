import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';
  const profileData = location.state?.profileData || {
    firstName: '',
    lastName: '',
    city: '',
    activities: []
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Only redirect if we're not already on the profile page and have no username
  React.useEffect(() => {
    if (!location.state?.username && location.pathname === '/profile') {
      navigate('/');
    }
  }, [location.state, location.pathname, navigate]);

  const getActivityLabel = (id) => {
    const activityMap = {
      'hiking': 'Hiking',
      'swimming': 'Swimming',
      'kayaking': 'Kayaking',
      'beach': 'Going to the Beach',
      'cycling': 'Cycling',
      'camping': 'Camping',
      'rock-climbing': 'Rock Climbing',
      'fishing': 'Fishing'
    };
    return activityMap[id] || id;
  };


  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="profile-title">Profile</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <TabNavigation />
      </header>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header-section">
            <img 
              src="https://media.licdn.com/dms/image/v2/D560BAQHPlkmRLhVzng/company-logo_200_200/B56ZWR3jj3HoAI-/0/1741909015016/youcode_ubc_logo?e=2147483647&v=beta&t=j9g9iiGpNNPziAEu9ArKdYKicRoDUBoZbtmKNE01UdA" 
              alt="Profile" 
              className="profile-image"
            />
            <h2>{`${profileData.firstName} ${profileData.lastName}`}</h2>
            <p className="username">@{username}</p>
          </div>
          
          <div className="profile-info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Location:</strong>
                <span>{profileData.city}</span>
              </div>
              <div className="info-item">
                <strong>Member Since:</strong>
                <span>{new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="profile-interests">
            <h3>Interests</h3>
            <div className="interests-grid">
              {profileData.activities && profileData.activities.map(activity => (
                <span key={activity} className="interest-tag">
                  {getActivityLabel(activity)}
                </span>
              ))}
            </div>
          </div>

          <div className="profile-actions">
            <button className="edit-profile-button">Edit Profile</button>
            <button className="change-password-button">Change Password</button>
          </div>
        </div>

        <div className="profile-card">
          <h3>Upcoming Events</h3>
          <div className="upcoming-events">
            <div className="event-item">
              <h4>STRAVA RUN STEADY CHALLENGE: Spray River Loop Banff</h4>
              <p>Saturday, April 26</p>
              <p>123 Banff Ave, Banff, AB</p>
            </div>
            <div className="event-item">
              <h4>Hiking Trip</h4>
              <p>Sunday, April 16</p>
              <p>Grouse Mountain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 