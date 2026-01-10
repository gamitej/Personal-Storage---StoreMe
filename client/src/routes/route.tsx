import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Signup = lazy(() => import('@/pages/Auth/Signup'));
const MyDrive = lazy(() => import('@/pages/MyDrive'));
const LoginPage = lazy(() => import('@/pages/Auth/Login'));

const Layouts = lazy(() => import('@/pages/Layouts'));

const CommonPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layouts />
  </Suspense>
);

const router = createBrowserRouter([
  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyDrive />
          </Suspense>
        ),
      },
      {
        path: 'Recent',
        element: <CommonPage />,
      },
      {
        path: 'Photos',
        element: <CommonPage />,
      },
      {
        path: 'shared-with-me',
        element: <CommonPage />,
      },
      {
        path: 'starred',
        element: <CommonPage />,
      },
      {
        path: 'trash',
        element: <CommonPage />,
      },
    ],
  },

  // Public Routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
