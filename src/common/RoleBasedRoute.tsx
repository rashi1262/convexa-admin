// src/common/RoleBasedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ProtectedRoutes';

interface RoleBasedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!allowedRoles.includes(role || '')) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RoleBasedRoute;
