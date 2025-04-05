import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = ({ username, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log

        if (data && data.events_results) {
          setEvents(data.events_results);
        } else {
          setError('No events found in the response');
        }
      } catch (err) {
        console.error('API Error:', err); // Debug log
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    // Store the event data in localStorage for the details page
    localStorage.setItem('currentEvent', JSON.stringify(event));
    // Navigate to the event details page
    navigate(`/event/${event.title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return (
    <div className="error">
      <h2>Error Loading Events</h2>
      <p>{error}</p>
      <p>Please try again later or contact support if the problem persists.</p>
    </div>
  );

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
          <h2 className="featured-events-title">Featured Events in Vancouver</h2>
        </div>
        
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card" onClick={() => handleEventClick(event)}>
              <h3>{event.title}</h3>
              {event.thumbnail && (
                <img src={event.thumbnail} alt={event.title} className="event-image" />
              )}
              <p className="event-date">{event.date?.when}</p>
              <p className="event-location">{event.address}</p>
              <p className="event-description">{event.description}</p>
              <button className="event-link">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events; 