import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = ({ username, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    temperature: 18,
    condition: 'Sunny',
    icon: '☀️',
    humidity: 65,
    windSpeed: 12
  });
  const [filters, setFilters] = useState({
    type: '',
    date: '',
    city: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    type: '',
    date: '',
    city: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams();
        if (appliedFilters.type) queryParams.append('type', appliedFilters.type);
        if (appliedFilters.city) queryParams.append('city', appliedFilters.city);
        if (appliedFilters.date) queryParams.append('date', appliedFilters.date);

        const response = await fetch(`http://localhost:3001/api/events?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        
        // Validate the data structure
        if (!data.events_results || !Array.isArray(data.events_results)) {
          setEvents([]);
          return;
        }

        const limitedEvents = data.events_results.slice(0, 4);
        setEvents(limitedEvents);
      } catch (err) {
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [appliedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleEventClick = (event) => {
    // Store the event data in localStorage for the details page
    localStorage.setItem('currentEvent', JSON.stringify(event));
    // Navigate to the event details page
    navigate(`/event/${event.title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const handleLogout = () => {
    // In a real app, you would clear any auth tokens or user data here
    navigate('/login'); // Navigate to the login page
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
    <div className="events-page">
      <header className="events-header">
        <h1 className="events-title">YouCode Events</h1>
        <div className="user-info">
          <span className="user-name">Welcome, {username}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="events-section">
        <div className="weather-info">
          <div className="weather-main">
            <span className="weather-icon">{weather.icon}</span>
            <span className="weather-temp">{weather.temperature}°C</span>
          </div>
          <div className="weather-details">
            <p>{weather.condition}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.windSpeed} km/h</p>
          </div>
        </div>
        <h2 className="featured-events-title">Featured Events in Vancouver</h2>
        <div className="events-grid">
          {events.slice(0, 4).map((event, index) => (
            <div 
              key={index} 
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              {event.thumbnail && (
                <img src={event.thumbnail} alt={event.title} className="event-image" />
              )}
              <div className="event-info">
                <h2>{event.title}</h2>
                <p className="event-date">📅 {event.date?.when}</p>
                <p className="event-location">📍 {event.address}</p>
                <p className="event-description">{event.description}</p>
                <button className="learn-more">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section-container">
        <div className="filter-section">
          <div className="filter-inputs">
            <div className="filter-input">
              <label htmlFor="type">Event Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                placeholder="e.g., concert, festival"
              />
            </div>
            <div className="filter-input">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="e.g., Vancouver"
              />
            </div>
            <div className="filter-input">
              <label htmlFor="date">Date:</label>
              <select
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
              >
                <option value="">Select Date Range</option>
                <option value="date:today">Today's Events</option>
                <option value="date:tomorrow">Tomorrow's Events</option>
                <option value="date:week">This Week's Events</option>
                <option value="date:weekend">This Weekend's Events</option>
                <option value="date:next_week">Next Week's Events</option>
                <option value="date:month">This Month's Events</option>
                <option value="date:next_month">Next Month's Events</option>
              </select>
            </div>
          </div>
          <h3 className="filter-title">Filter Events</h3>
          <button className="search-button" onClick={handleSearch}>
            Search Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events; 