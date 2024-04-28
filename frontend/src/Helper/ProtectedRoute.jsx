import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { autenticado, handleValidarToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const access_token = window.localStorage.getItem('token');

  useEffect(() => {
    if (access_token) {
      handleValidarToken(access_token)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [access_token]);

  if (loading) {
    return null;
  }

  if (!autenticado) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
