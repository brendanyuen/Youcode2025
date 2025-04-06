import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    temperature: 12,
    condition: 'Rainy',
    icon: '☔️',
    humidity: 80,
    windSpeed:9
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
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  // Create a unique key for each event
  const createEventKey = (event, index) => {
    if (event.id) return event.id;
    return `event-${index}-${Date.now()}`;
  };

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
        
        if (!data.events_results || !Array.isArray(data.events_results)) {
          setEvents([]);
          return;
        }

        // Add IDs to API events
        const limitedEvents = data.events_results.slice(0, 4).map((event, index) => ({
          ...event,
          id: `api-event-${index}-${Date.now()}`
        }));
        
        // Always include the Arc'teryx Banff event
        const arcTeryxEvent = {
          id: `arc-teryx-banff-${Date.now()}`,
          title: "Arc'teryx Banff Grand Opening Celebration!",
          date: { when: "2024-04-12" },
          address: "123 Main St, Banff, AB",
          description: "Big news, Banff. We're bringing world-class gear to world-class terrain - Arc'teryx Banff opens Spring 2025! A big announcement deserves a big celebration! Join us for our Grand Opening Day celebration, we promise a day full of community, music, refreshments and some special surprises in store!",
          thumbnail: "https://d3m889aznlr23d.cloudfront.net/img/events/id/459/459136409/assets/34dbcc0f0cdd3d58c3e8f32f370dac4c.JS_03883.jpg",
          website: "https://community-events.arcteryx.com/arcteryxbanffgrandopening",
          ticket_info: [
            {
              source: "Community Events",
              link: "https://community-events.arcteryx.com/arcteryxbanffgrandopening"
            }
          ]
        };

        const arcTeryxEvent2 = {
          id: `strava-run-steady-${Date.now()}`,
          title: "STRAVA RUN STEADY CHALLENGE: Spray River Loop Banff",
          date: { when: "2024-04-26" },
          address: "123 Banff Ave, Banff, AB",
          description: "rails for a 6.5 KM run on Spray River Loop, Saturday April 26th at 8AM. Co-presented with our friends from Minotaur Sky Race! Arc'teryx believes that no matter where you go or how you got there, getting outside is good for your body and mind. Whether your chasing a summit in the high alpine or hitting the trails after work, building a steady routine can be inspiring.",
          thumbnail: "https://d3m889aznlr23d.cloudfront.net/img/events/id/459/459167681/assets/a48ded161d500ad488c11c8d2bb1985d.25_Arc_StravaRunSteady_RedemptionPage-1200x800-en.jpg",
          website: "https://community-events.arcteryx.com/stravarunsteadychallengebmf25",
          ticket_info: [
            {
              source: "Community Events",
              link: "https://community-events.arcteryx.com/stravarunsteadychallengebmf25"
            }
          ]
        };

        // Add the Arc'teryx events to the beginning of the array
        limitedEvents.unshift(arcTeryxEvent);
        limitedEvents.unshift(arcTeryxEvent2);

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
    navigate(`/events/${event.id}`, { 
      state: { 
        event,
        username,
        profileData: location.state?.profileData || {}
      } 
    });
  };

  const handleLogout = () => {
    // In a real app, you would clear any auth tokens or user data here
    navigate('/login'); // Navigate to the login page
  };

  const handleFriendsEventsClick = () => {
    navigate('/friends-events', { 
      state: { 
        username,
        profileData: location.state?.profileData || {},
        // Preserve any other state that might be present
        ...location.state
      } 
    });
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
        <div className="header-top">
          <div className="header-left">
            <h1 className="events-title">YouCode Events</h1>
          </div>
          <div className="user-info">
            <span className="user-name">Welcome, {username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button 
              className="friends-events-button" 
              onClick={handleFriendsEventsClick}>
              View Friends' Events
            </button>
          </div>
        </div>
        <TabNavigation />
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
        <h2 className="featured-events-title">Upcoming Events</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div 
              key={createEventKey(event, index)}
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
                placeholder="e.g., hiking, fishing, etc."
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