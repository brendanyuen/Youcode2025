import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import { analyzeEventDescription } from '../utils/eventAnalyzer';
import './EventDetails.css';

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const username = location.state?.username || 'Guest';
  const [activityType, setActivityType] = useState('default');
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const determineActivityType = async () => {
      if (event?.description) {
        setIsAnalyzing(true);
        const type = await analyzeEventDescription(event.description);
        setActivityType(type);
        setIsAnalyzing(false);
      }
    };

    determineActivityType();
  }, [event]);

  // Define recommended gear for different event types
  const recommendedGear = {
    'hiking': [
      { 
        name: 'Beta AR Jacket', 
        description: 'Waterproof shell for unpredictable weather', 
        price: '$499', 
        link: 'https://arcteryx.com/ca/en/c/insulated-jackets?search=Beta%20AR%20Jacket',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000006605-Beta-AR-Jacket-Black-Sapphire-Women-s-Front-View.jpg'
      },
      { 
        name: 'Gamma SL Pants', 
        description: 'Lightweight, breathable softshell pants', 
        price: '$199', 
        link: 'https://arcteryx.com/ca/en?search=Gamma%20SL%20Pants',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009525-Gamma-SL-Pant-Black-Sapphire-Front-View.jpg'
      },
      { 
        name: 'Norvan LD 3', 
        description: 'Trail running shoes for technical terrain', 
        price: '$200', 
        link: 'https://arcteryx.com/ca/en/shop?search=Norvan+LD+3',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009617-Norvan-LD-4-GTX-Shoe-Moonstone-Moonstone-Women-s-Profile.jpg'
      }
    ],
    'running': [
      { 
        name: 'Norvan SL Jacket', 
        description: 'Ultralight waterproof running shell', 
        price: '$299', 
        link: 'https://arcteryx.com/ca/en/shop?search=Cormac%20Crew%20SS',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000007748-Norvan-Windshell-Hoody-Forage-Tatsu-Front-View.jpg'
      },
      { 
        name: 'Cormac Crew SS', 
        description: 'Breathable short-sleeve running shirt', 
        price: '$65', 
        link: 'https://arcteryx.com/ca/en/shop?search=Cormac%20Crew%20SS',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009718-Cormac-Crew-Neck-Shirt-SS-Tatsu-Heather-Front-View.jpg'
      },
      { 
        name: 'Norvan LD 3', 
        description: 'Trail running shoes for technical terrain', 
        price: '$200', 
        link: 'https://arcteryx.com/ca/en/shop?search=Norvan+LD+3',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009617-Norvan-LD-4-GTX-Shoe-Moonstone-Moonstone-Women-s-Profile.jpg'
      }
    ],
    'climbing': [
      { 
        name: 'Alpha SV Jacket', 
        description: 'Most durable waterproof shell', 
        price: '$699', 
        link: 'https://arcteryx.com/ca/en/shop/alpha-sv-jacket',
        image: 'https://arcteryx.com/ca/en/shop/media/catalog/product/a/l/alpha-sv-jacket-24191-black.jpg'
      },
      { 
        name: 'Gamma MX Pants', 
        description: 'Durable softshell pants for climbing', 
        price: '$249', 
        link: 'https://arcteryx.com/ca/en/shop/gamma-mx-pants',
        image: 'https://arcteryx.com/ca/en/shop/media/catalog/product/g/a/gamma-mx-pants-24191-black.jpg'
      },
      { 
        name: 'Aerios FL GTX', 
        description: 'Lightweight approach shoes', 
        price: '$180', 
        link: 'https://arcteryx.com/ca/en/shop/aerios-fl-gtx',
        image: 'https://arcteryx.com/ca/en/shop/media/catalog/product/a/e/aerios-fl-gtx-24191-black.jpg'
      }
    ],
    'default': [
      { 
        name: 'Atom SL', 
        description: 'Versatile midlayer for all conditions', 
        price: '$299', 
        link: 'https://arcteryx.com/ca/en/c/insulated-jackets?search=Atom%20SL',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009511-Atom-SL-Hoody-Black-Women-s-Front-View.jpg'
      },
      { 
        name: 'Gamma SL Pants', 
        description: 'Lightweight, breathable softshell pants', 
        price: '$199', 
        link: 'https://arcteryx.com/ca/en?search=Gamma%20SL%20Pants',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000009525-Gamma-SL-Pant-Black-Sapphire-Front-View.jpg'
      },
      { 
        name: 'Mantis 26 Backpack', 
        description: 'Versatile daypack for all activities', 
        price: '$129', 
        link: 'https://arcteryx.com/ca/en/shop/mens/gamma-sl-pant-9525?search=Mantis%2026%20Backpack',
        image: 'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/S25-X000006044-Mantis-26-Backpack-Black-Soulsonic-Front.jpg'
      }
    ]
  };

  // Get recommended gear based on analyzed activity type
  const gear = recommendedGear[activityType] || recommendedGear.default;

  console.log(activityType);

  

  const handleLogout = () => {
    navigate('/login');
  };

  const handleBackToEvents = () => {
    navigate('/events', { 
      state: { 
        username: location.state?.username,
        profileData: location.state?.profileData || {}
      } 
    });
  };

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

  if (!event) {
    return (
      <div className="error">
        <h2>Event Not Found</h2>
        <p>The event details could not be loaded.</p>
        <button className="back-button" onClick={handleBackToEvents}>
          ← Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <header className="event-details-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="event-details-title">Event Details</h1>
          </div>
          <div className="user-info">
            <span className="user-name">Welcome, {username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <TabNavigation />
      </header>
      
      <div className="event-details-container">
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

          <div className="recommended-gear-section">
            <h2>Recommended Arc'teryx Gear</h2>
            {isAnalyzing ? (
              <div className="analyzing-message">
                <p>Analyzing event description to recommend the best gear...</p>
              </div>
            ) : (
              <div className="gear-grid">
                {gear.map((item, index) => (
                  <div key={index} className="gear-item">
                    <div className="gear-image-container">
                      <img src={item.image} alt={item.name} className="gear-image" />
                    </div>
                    <h3>{item.name}</h3>
                    <p className="gear-description">{item.description}</p>
                    <p className="gear-price">{item.price}</p>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="gear-link"
                    >
                      View Product
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="event-actions">
            {event.website && (
              <a href={renderProperty(event.website)} target="_blank" rel="noopener noreferrer" className="register-button">
                Register Now
              </a>
            )}
            <button className="share-button">Share Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 