/**
 * Protected Route Wrapper: Guards admin pages from unauthorized users
 */

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../components/Loading';

export const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <Loading text="Authenticating..." />;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
};
