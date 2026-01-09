import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const LandingPage = lazy(() => import('@/pages/Landing'));

const router = createBrowserRouter([
  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },

  // Public Routes
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

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
