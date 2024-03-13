import React, { useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useContext(UserContext);
  return autenticado ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
