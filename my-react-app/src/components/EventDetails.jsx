import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = ({ username, onLogout }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    temperature: 18,
    condition: 'Sunny',
    icon: '☀️',
    humidity: 65,
    windSpeed: 12
  });

  useEffect(() => {
    // Dummy event data
    const dummyEvents = [
      {
        title: "Vancouver International Jazz Festival",
        date: { when: "June 28, 2024" },
        address: "Various Venues, Vancouver, BC",
        description: "Join us for the 38th annual Vancouver International Jazz Festival! This year's festival features over 300 concerts across 40 venues, showcasing local and international jazz artists. From intimate club performances to large outdoor concerts, there's something for every jazz enthusiast.",
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ticket_info: "Tickets available at Ticketmaster",
        price: "From $25",
        website: "https://www.coastaljazz.ca",
        type: "festival"
      },
      {
        title: "Vancouver Pride Parade",
        date: { when: "August 4, 2024" },
        address: "Downtown Vancouver, BC",
        description: "Celebrate diversity and inclusion at the Vancouver Pride Parade! Join thousands of participants and spectators for this vibrant celebration of the 2SLGBTQIA+ community. The parade features colorful floats, performances, and a festival in the park.",
        thumbnail: "https://images.unsplash.com/photo-1511795409834-432f31197ce6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ticket_info: "Free to attend",
        price: "Free",
        website: "https://www.vancouverpride.ca",
        type: "festival"
      },
      {
        title: "Vancouver Cherry Blossom Festival",
        date: { when: "April 1-30, 2024" },
        address: "Various Locations, Vancouver, BC",
        description: "Experience the beauty of spring in Vancouver during the Cherry Blossom Festival. Enjoy guided walks, photography workshops, and cultural events celebrating the city's 40,000 cherry trees. Don't miss the Sakura Days Japan Fair and the Big Picnic under the blossoms!",
        thumbnail: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ticket_info: "Most events are free",
        price: "Free",
        website: "https://www.vcbf.ca",
        type: "festival"
      },
      {
        title: "Vancouver International Film Festival",
        date: { when: "September 28 - October 8, 2024" },
        address: "Various Cinemas, Vancouver, BC",
        description: "The Vancouver International Film Festival (VIFF) is one of the largest film festivals in North America. Screenings include feature films, documentaries, and shorts from around the world, with special focus on Canadian and Asian cinema.",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1459&q=80",
        ticket_info: "Tickets available at VIFF Box Office",
        price: "From $15",
        website: "https://www.viff.org",
        type: "festival"
      }
    ];

    // Find the event by index
    const eventIndex = parseInt(eventId);
    if (isNaN(eventIndex) || eventIndex < 0 || eventIndex >= dummyEvents.length) {
      setError('Event not found');
      setLoading(false);
      return;
    }

    setEvent(dummyEvents[eventIndex]);
    setLoading(false);
  }, [eventId]);

  const getClothingRecommendations = (eventType) => {
    const recommendations = {
      'concert': {
        casual: 'Comfortable jeans or pants with a stylish top',
        formal: 'Dress pants or skirt with a blouse or button-down shirt',
        accessories: 'Comfortable shoes for standing, light jacket for outdoor venues'
      },
      'sports': {
        casual: 'Athletic wear, comfortable shoes',
        formal: 'Team colors or jerseys, comfortable walking shoes',
        accessories: 'Hat, sunglasses, sunscreen'
      },
      'theater': {
        casual: 'Smart casual attire',
        formal: 'Dress or suit',
        accessories: 'Light jacket or wrap'
      },
      'festival': {
        casual: 'Comfortable, weather-appropriate clothing',
        formal: 'Festival-chic outfits',
        accessories: 'Comfortable shoes, hat, sunglasses'
      },
      'default': {
        casual: 'Smart casual attire',
        formal: 'Business casual or formal wear',
        accessories: 'Weather-appropriate outerwear'
      }
    };

    return recommendations[eventType] || recommendations.default;
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div className="error">Event not found</div>;

  const clothingRecs = getClothingRecommendations(event.type?.toLowerCase() || 'default');

  return (
    <div className="event-details-page">
      <header className="event-details-header">
        <h1 className="event-details-title">YouCode Events</h1>
        <div className="user-info">
          <span className="user-name">Welcome, {username}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="event-details-container">
        <div className="event-details-card">
          <div className="event-image-container">
            <img src={event.thumbnail} alt={event.title} className="event-details-image" />
          </div>
          <div className="event-details-content">
            <h2>{event.title}</h2>
            <div className="event-meta">
              <p className="event-date">📅 {event.date.when}</p>
              <p className="event-location">📍 {event.address}</p>
              <p className="event-price">💰 {event.price}</p>
            </div>
            <p className="event-description">{event.description}</p>
            <div className="event-actions">
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="event-button">
                Visit Website
              </a>
              <button className="event-button" onClick={() => navigate('/events')}>
                Back to Events
              </button>
            </div>
          </div>
        </div>

        <div className="weather-card">
          <h3>Weather Forecast</h3>
          <div className="weather-content">
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
        </div>

        <div className="event-details-content">
          <div className="event-section">
            <h2>Clothing Recommendations</h2>
            <div className="clothing-recommendations">
              <div className="recommendation-category">
                <h3>Casual</h3>
                <p>{clothingRecs.casual}</p>
              </div>
              <div className="recommendation-category">
                <h3>Formal</h3>
                <p>{clothingRecs.formal}</p>
              </div>
              <div className="recommendation-category">
                <h3>Accessories</h3>
                <p>{clothingRecs.accessories}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 