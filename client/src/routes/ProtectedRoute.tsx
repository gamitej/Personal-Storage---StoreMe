import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthState } from '@/redux/global/globalSlice';
import { Navbar } from '@/components';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(getAuthState);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
