import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  // Debug logging
  console.log('Event data:', event);

  if (!event) {
    return (
      <div className="error">
        <h2>Event Not Found</h2>
        <p>The event details could not be loaded.</p>
        <button className="back-button" onClick={() => navigate('/events')}>
          ← Back to Events
        </button>
      </div>
    );
  }

  // Helper function to safely render nested object properties
  const renderNestedProperty = (obj, path) => {
    if (!obj) return '';
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
    return value || '';
  };

  // Helper function to safely render object properties
  const renderProperty = (value) => {
    if (typeof value === 'object' && value !== null) {
      if (value.link) return value.link;
      if (value.source) return value.source;
      return JSON.stringify(value);
    }
    return value;
  };

  // Helper function to render location array
  const renderLocation = (locationArray) => {
    if (!Array.isArray(locationArray)) return renderProperty(locationArray);
    return locationArray.join(', ');
  };

  // Helper function to render ticket info array
  const renderTicketInfo = (ticketInfoArray) => {
    if (!Array.isArray(ticketInfoArray)) return null;
    return (
      <div className="ticket-links">
        {ticketInfoArray.map((ticket, index) => (
          <a
            key={index}
            href={ticket.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-link"
          >
            {ticket.source}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <button className="back-button" onClick={() => navigate('/events')}>
          ← Back to Events
        </button>
        
        <div className="event-details-content">
          <h1 className="event-title">{renderProperty(event.title)}</h1>
          
          {event.thumbnail && (
            <div className="event-image-container">
              <img src={renderProperty(event.thumbnail)} alt={renderProperty(event.title)} className="event-details-image" />
            </div>
          )}
          
          <div className="event-info-grid">
            <div className="event-info-section">
              <h2>Event Information</h2>
              <p><strong>Date:</strong> {renderProperty(renderNestedProperty(event, 'date.when'))}</p>
              <p><strong>Location:</strong> {renderLocation(event.address)}</p>
              {event.price && <p><strong>Price:</strong> {renderProperty(event.price)}</p>}
              {event.website && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a href={renderProperty(event.website)} target="_blank" rel="noopener noreferrer">
                    Visit Event Website
                  </a>
                </p>
              )}
              {event.ticket_info && (
                <div className="ticket-info-section">
                  <strong>Link:</strong>
                  {renderTicketInfo(event.ticket_info)}
                </div>
              )}
            </div>

            <div className="event-description-section">
              <h2>About the Event</h2>
              <p>{renderProperty(event.description)}</p>
            </div>
          </div>

          <div className="event-actions">
            {event.website && (
              <a href={renderProperty(event.website)} target="_blank" rel="noopener noreferrer" className="register-button">
                Register Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 