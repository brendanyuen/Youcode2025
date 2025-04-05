import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // Dummy event data
      const dummyEvent = {
        title: "Vancouver International Jazz Festival",
        thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        date: {
          when: "June 23-25, 2024"
        },
        address: "Various Venues, Vancouver, BC",
        description: "Join us for the 38th annual Vancouver International Jazz Festival! This three-day event features world-class jazz musicians from around the globe, performing in various venues across the city. From traditional jazz to contemporary fusion, there's something for every music lover.",
        type: "festival"
      };
      setEvent(dummyEvent);
      setLoading(false);
    }, 1000);
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
  if (!event) return <div className="error">Event not found</div>;

  const clothingRecs = getClothingRecommendations(event.type?.toLowerCase() || 'default');

  return (
    <div className="event-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back to Events</button>
      
      <div className="event-details-content">
        <div className="event-header">
          <h1>{event.title}</h1>
          {event.thumbnail && (
            <img src={event.thumbnail} alt={event.title} className="event-image" />
          )}
        </div>

        <div className="event-info">
          <div className="event-section">
            <h2>Event Details</h2>
            <p className="event-date">📅 {event.date?.when}</p>
            <p className="event-location">📍 {event.address}</p>
            <p className="event-description">{event.description}</p>
          </div>

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