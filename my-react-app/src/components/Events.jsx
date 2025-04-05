import React, { useState } from 'react';
import './Events.css';

const Events = ({ username, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample events data - in a real app, this would come from an API or database
  const events = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: 'May 15, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'workshop',
      location: 'Online',
      time: '10:00 AM - 2:00 PM'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      date: 'June 3, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'course',
      location: 'YouCode Campus',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      date: 'July 12, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'workshop',
      location: 'Online',
      time: '1:00 PM - 4:00 PM'
    },
    {
      id: 4,
      title: 'Data Science Fundamentals',
      date: 'August 5, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'course',
      location: 'YouCode Campus',
      time: '10:00 AM - 3:00 PM'
    },
    {
      id: 5,
      title: 'Cloud Computing Basics',
      date: 'September 10, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'workshop',
      location: 'Online',
      time: '11:00 AM - 2:00 PM'
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      date: 'October 22, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'course',
      location: 'YouCode Campus',
      time: '9:00 AM - 4:00 PM'
    },
    {
      id: 7,
      title: 'React Advanced Techniques',
      date: 'November 5, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'workshop',
      location: 'Online',
      time: '1:00 PM - 5:00 PM'
    },
    {
      id: 8,
      title: 'Python for Data Analysis',
      date: 'December 10, 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'course',
      location: 'YouCode Campus',
      time: '10:00 AM - 3:00 PM'
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  return (
    <div className="events-container">
      <header className="events-header">
        <h1 className="events-title">YouCode Events</h1>
        <div className="user-info">
          <span className="user-name">Welcome, {username}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>
      
      <main className="events-content">
        <div className="events-header-section">
          <h2 className="featured-events-title">Featured Events</h2>
          <div className="events-filters">
            <button 
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Events
            </button>
            <button 
              className={`filter-button ${activeFilter === 'workshop' ? 'active' : ''}`}
              onClick={() => setActiveFilter('workshop')}
            >
              Workshops
            </button>
            <button 
              className={`filter-button ${activeFilter === 'course' ? 'active' : ''}`}
              onClick={() => setActiveFilter('course')}
            >
              Courses
            </button>
          </div>
        </div>
        
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-category">{event.category}</div>
              </div>
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <div className="event-info">
                  <p className="event-location">
                    <span className="info-icon">📍</span> {event.location}
                  </p>
                  <p className="event-time">
                    <span className="info-icon">⏱️</span> {event.time}
                  </p>
                </div>
                <button className="event-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events; 