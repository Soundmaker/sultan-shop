import React from 'react';
import {Route, Routes } from 'react-router-dom';
import {authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
  return (
    <Routes>
      {[...publicRoutes, ...authRoutes].map(route =>
        <Route
          path={route.path}
          element={route.element}
          key={route.path}
        />
      )}
    </Routes>
  );
};

export default AppRouter;
