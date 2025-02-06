import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CheckInForm from './components/CheckInForm';
import SignUp from './components/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage or sessionStorage for login status on page load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    // On successful login, set isLoggedIn to true and store in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // On logout, set isLoggedIn to false and remove from localStorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login route: Available to everyone */}
        <Route
          path="/"
          element={<Login setIsLoggedIn={handleLogin} />}
        />

        {/* SignUp route: Available to logged-out users */}
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/check-form" replace /> : <SignUp />}
        />

        {/* Protected CheckInForm route: Only available to logged-in users */}
        <Route
          path="/check-form"
          element={isLoggedIn ? <CheckInForm onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
