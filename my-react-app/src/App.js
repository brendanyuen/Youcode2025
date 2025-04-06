import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import FriendsEvents from './components/FriendsEvents';
import Profile from './components/Profile';
import Testing from './components/Testing';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/friends-events" element={<FriendsEvents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App; 