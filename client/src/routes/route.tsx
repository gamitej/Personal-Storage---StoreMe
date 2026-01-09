import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LandingPage = lazy(() => import('@/pages/Landing'));

export const Route = () => {
  const router = createBrowserRouter([
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <div>Login Page</div>,
    },
    {
      path: '/signup',
      element: <div>Signup Page</div>,
    },
    {
      path: '*',
      element: <div>404 Not Found</div>,
    },
  ]);
};
