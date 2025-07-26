

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? children
      ? children           // caso vecchio: prop children presente
      : <Outlet />         // caso nuovo: usa gli outlet annidati
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;