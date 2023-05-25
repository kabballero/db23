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
    path: '/admins',
    element: <TheBoss />,
  },
  {
    path: '/operator/:username',
    element: <Caporegime />,
  },
  {
    path: '/teachers',
    element: <Sonderkommando />,
  },
  {
    path: '/students/:userName',
    element: <Kyles />,
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
