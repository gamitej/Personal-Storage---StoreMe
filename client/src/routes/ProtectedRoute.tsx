import { Navbar } from '@/components';
import { useSelector } from 'react-redux';
import { SideBarLink, sideBarLinks } from '@/utils';
import { getAuthState } from '@/redux/global/globalSlice';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(getAuthState);

  const selectedPageName = sideBarLinks.find(
    (link) => link.path === location.pathname,
  )?.name;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /**
   * TSX
   */
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-4 px-6 flex h-[calc(100vh-80px)]">
        {/* Sidebar navigation */}
        <aside className="w-60 flex flex-col gap-4">
          {sideBarLinks.map((link: SideBarLink) => {
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-2 rounded-full cursor-pointer ${
                  location.pathname === link.path
                    ? 'bg-(--pink) text-white font-semibold'
                    : 'hover:bg-gray-200 text-(--dark-gray) font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </aside>
        {/* Main content area */}
        <div className="p-8 flex-1 bg-gray-100 rounded-2xl ml-6">
          <h1 className="h1 text-(--dark-gray) text-xl font-bold">
            {selectedPageName}
          </h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProtectedRoute;
