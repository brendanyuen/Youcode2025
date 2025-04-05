import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    activities: []
  });

  const [errors, setErrors] = useState({});

  const activityOptions = [
    { id: 'hiking', label: 'Hiking' },
    { id: 'swimming', label: 'Swimming' },
    { id: 'kayaking', label: 'Kayaking' },
    { id: 'beach', label: 'Going to the Beach' },
    { id: 'cycling', label: 'Cycling' },
    { id: 'camping', label: 'Camping' },
    { id: 'rock-climbing', label: 'Rock Climbing' },
    { id: 'fishing', label: 'Fishing' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleActivityChange = (activityId) => {
    setFormData(prevData => {
      const activities = prevData.activities.includes(activityId)
        ? prevData.activities.filter(id => id !== activityId)
        : [...prevData.activities, activityId];
      
      return {
        ...prevData,
        activities
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (formData.activities.length === 0) {
      newErrors.activities = 'Please select at least one activity';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would save this data to a backend
      console.log('Profile data:', { ...formData, username });
      
      // Navigate to the events screen
      navigate('/events');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1 className="profile-title">Complete Your Profile</h1>
          <p className="profile-subtitle">Tell us a bit about yourself</p>
        </div>
        
        <div className="profile-content">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>
            
            <div className="form-group">
              <label>Outdoor Activities (Select all that apply)</label>
              <div className="activities-grid">
                {activityOptions.map(activity => (
                  <div 
                    key={activity.id} 
                    className={`activity-option ${formData.activities.includes(activity.id) ? 'selected' : ''}`}
                    onClick={() => handleActivityChange(activity.id)}
                  >
                    <input
                      type="checkbox"
                      id={activity.id}
                      checked={formData.activities.includes(activity.id)}
                      onChange={() => {}}
                      className="activity-checkbox"
                    />
                    <label htmlFor={activity.id}>{activity.label}</label>
                  </div>
                ))}
              </div>
              {errors.activities && <div className="error-message">{errors.activities}</div>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">Complete Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 