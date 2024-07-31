import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Yalnız autentifikasiya olunmuş istifadəçilərə xüsusi səhifələrə giriş imkanı verir
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Burada öz autentifikasiya yoxlama məntiqinizi istifadə edin
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Burada öz autentifikasiya yoxlama məntiqinizi istifadə edin

  return isAuthenticated && isAdmin ? Component : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
