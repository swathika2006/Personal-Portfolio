// ============================================
// Admin Layout — Protected admin wrapper
// ============================================
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaTachometerAlt, FaAward } from 'react-icons/fa';
import Loader from '../components/common/Loader';
import ThemeToggle from '../components/common/ThemeToggle';

const sidebarLinks = [
  { name: 'Dashboard',       path: '/admin/dashboard',       icon: <FaTachometerAlt /> },
  { name: 'Projects',        path: '/admin/projects',        icon: <FaProjectDiagram /> },
  { name: 'Certifications',  path: '/admin/certifications',  icon: <FaAward /> },
  { name: 'Messages',        path: '/admin/messages',        icon: <FaEnvelope /> },
];

const AdminLayout = ({ children }) => {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const location = useLocation();

  // Show loader while checking auth
  if (loading) return <Loader />;

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-900 border-r border-dark-200 dark:border-dark-800 flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-dark-200 dark:border-dark-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-heading font-bold text-lg">
              ES
            </div>
            <div>
              <p className="font-heading font-bold text-sm dark:text-white">Admin Panel</p>
              <p className="text-xs text-dark-500 dark:text-dark-400">{user?.name}</p>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-dark-200 dark:border-dark-800 space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-dark-500 dark:text-dark-400">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800 transition-all"
          >
            <FaHome />
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
