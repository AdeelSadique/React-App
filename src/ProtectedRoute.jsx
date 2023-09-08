import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('token');
  if (isAuth) {
    return children;
  } else {
    return <Navigate to={'/'} />;
  }
}

export default ProtectedRoute;
