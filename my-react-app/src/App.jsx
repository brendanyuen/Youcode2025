import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import FriendsEvents from './components/FriendsEvents';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<UserProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/friends-events" element={<FriendsEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
