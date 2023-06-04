import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app'
import Home from './components/home';
import Login from './components/login';
import TheBoss from './components/admin/theBoss';
import Caporegime from './components/operators/caporegime';
import Kyles from './components/users/kyles';
const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login/:role',
    element: <Login />,
  },
  {
    path: '/admins/:username',
    element: <TheBoss />,
  },
  {
    path: '/operator/:username',
    element: <Caporegime />,
  },
  {
    path: '/users/:userName',
    element: <Kyles />,
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
