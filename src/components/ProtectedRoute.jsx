import React from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  // Check if the user is logged in by checking for the presence of a token
  const token = Cookies.get('eIfu_ATK') || null;

  const location = useLocation();

  // If the user is logged in, redirect to a different route (e.g., home)
  if (token) {
      return <Navigate to="/dashboard" state={{ from: location }} replace/>;
    }else{
        return <Outlet />;
    }

  // If the user is not logged in, allow them to access the route's element
  return element;
};

export default ProtectedRoute;
