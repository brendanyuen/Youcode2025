import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import './FriendsEvents.css';

const FriendsEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || 'Guest';
  const friendInterests = location.state?.profileData?.activities || [];
  

  const handleLogout = () => {
    navigate('/login');
  };

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

  // Hardcoded data for friends and events
  const friends = [
    {
      name: 'John Doe',
      image: 'https://plus.unsplash.com/premium_photo-1665203644093-b3b8ebfa4cb3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwaGlraW5nfGVufDB8fDB8fHww',
      events: [
        { title: 'Concert at the Park', date: '2025-04-10' },
        { title: 'Art Exhibition', date: '2025-04-15' },
      ],
      interests: [...new Set([...friendInterests, 'hiking'])],
    },
    { 
      name: 'Jane Smith',
      image: 'https://www.bluemountain.ca/-/media/blue-mountain/2400x1350/plan-your-trip/snow-school/multi-week-programs/fy25/heros/bmr-fy25-multi-week-womans-alpine-ski.jpg?w=480&rev=9cfe61c46fd647be9bb98aba23f7cb68&hash=29832E106108C07B7EE92A8F3C80E58F',
      events: [
        { title: 'Tech Conference', date: '2025-04-12' },
        { title: 'Music Festival', date: '2025-04-20' },
      ],
      interests: [...new Set([...friendInterests, 'Skiing'])],
    },
    {
      name: 'Alice Johnson',
      image: 'https://img.redbull.com/images/c_crop,x_1221,y_1,h_3386,w_2709/c_fill,w_400,h_500/q_auto:low,f_auto/redbullcom/2023/9/6/jpyoaaytb5d6la9lyid1/caroline-marks-teahupoo-tube',
      events: [
        { title: 'Food Festival', date: '2025-04-14' },
        { title: 'Coding Bootcamp', date: '2025-04-18' },
      ],
      interests: [...new Set([...friendInterests, 'Surfing'])],
    },
  ];

  const handleJoinEvent = (friendName, eventTitle) => {
    alert(`You joined ${eventTitle} with ${friendName}`);
    // Navigate to the event page or perform other actions as needed
    // navigate(`/event/${eventTitle.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const handleViewDetails = (eventTitle) => {
    alert(`Viewing details for ${eventTitle}`);
    // Navigate to the event details page or perform other actions as needed
    // navigate(`/event/${eventTitle.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="friends-events-page">
      <header className="friends-events-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="friends-events-title">Friends' Events</h1>
          </div>
          <div className="user-info">
            <span className="user-name">Welcome, {username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <TabNavigation />
      </header>

      <div className="friends-events-section">
        <div className="friends-list">
          {friends.map((friend, index) => (
            <div key={index} className="friend-profile">
              <div className="friend-info">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="friend-image"
                />
                <h3 className="friend-name">{friend.name}</h3>
              </div>
              <div className="profile-interests">
            <h3>Interests</h3>
            <div className="interests-grid">
              {friend.interests && friend.interests.map(activity => (
                <span key={activity} className="interest-tag">
                  {getActivityLabel(activity)}
                </span>
              ))}
            </div>
          </div>
              <div className="friend-events">
                <h4>Events:</h4>
                {friend.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="friend-event">
                    <div className="event-info">
                      <p>{event.title} - {event.date}</p>
                    </div>
                    <div className="event-buttons">
                      <button
                        className="details-button"
                        onClick={() => handleViewDetails(event.title)}
                      >
                        Details
                      </button>
                      <button
                        className="join-event-button"
                        onClick={() => handleJoinEvent(friend.name, event.title)}
                      >
                        Join
                      </button>
                    </div>
                    {eventIndex < friend.events.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsEvents;
