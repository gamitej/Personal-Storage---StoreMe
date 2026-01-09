import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserAuth } from '@/redux/global/globalSlice';
import { Navbar } from '@/components';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(getUserAuth);

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
