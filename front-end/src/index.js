import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app'
import Home from './components/home';
import Login from './components/login';
import TheBoss from './components/theBoss';
import Caporegime from './components/caporegime';
import Sonderkommando from './components/sonderkommando';
import Kyles from './components/kyles';
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
    path: '/theBoss',
    element: <TheBoss />,
  },
  {
    path: '/caporegime',
    element: <Caporegime />,
  },
  {
    path: '/sonderkommando',
    element: <Sonderkommando />,
  },
  {
    path: '/kyles',
    element: <Kyles />,
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
