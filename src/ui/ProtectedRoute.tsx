import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="/auth"  state={{ from: location }} replace />;
};

export default ProtectedRoute;