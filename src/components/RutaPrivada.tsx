import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaPrivada: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return localStorage.getItem('sesion') === 'activa'
    ? children
    : <Navigate to="/" />;
};

export default RutaPrivada;
