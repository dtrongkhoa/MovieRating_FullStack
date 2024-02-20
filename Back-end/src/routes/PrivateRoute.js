import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Route {...rest} render={() => {
      return user && user.id ? children : <Navigate to="/signin" />;
    }} />
  );
}

export default PrivateRoute;