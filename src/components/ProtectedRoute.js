import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isProtected = true, isSignupPage = false }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // If the page is protected and the user is not logged in, redirect to login page
  if (isProtected && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If the page is the signup page and the user is already logged in, redirect to the check-form page
  if (isSignupPage && isLoggedIn) {
    return <Navigate to="/check-form" replace />;
  }

  // If the user is allowed to access the route (either logged in or logged out as needed), render the children
  return children;
}

export default ProtectedRoute;
