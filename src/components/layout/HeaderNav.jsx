import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import Container from './Container';
import { CiUser } from 'react-icons/ci';
import { useAuth } from '../../context/AuthContext';

const HeaderNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Discover', href: '/discover' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Services', href: '/services' },
    { name: 'News', href: '/news' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-nav-bg border-b border-gray-200 shadow-sm">
      <Container>
        {/* Desktop Navigation */}
        <div className="hidden items-center justify-between py-2 lg:flex">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-normal transition-colors ${
                  isActive(item.href)
                    ? 'text-btn-primary border-btn-primary border-b-2 pb-1'
                    : 'hover:text-btn-primary text-navigation'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                {/* <span className="text-sm text-gray-600">Welcome, {user?.name}</span> */}
                <Button variant="secondary" size="xs" className="rounded-md text-xs py-1.5">
                  My Orders
                </Button>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Logout"
                >
                  <LogOut className="text-secondary-text h-5 w-5" />
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link to="/signin">
                <Button variant="primary" size="xs" className="rounded-md text-xs py-1.5">
                  Sign In
                </Button>
              </Link>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <CiUser className="text-secondary-text h-5 lg:w-7 lg:h-7 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 pb-4 lg:hidden">
            <nav className="flex flex-col space-y-1 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm lg:text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-secondary text-btn-primary'
                      : 'text-navigation hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                {isAuthenticated ? (
                  <>
                    {/* <div className="px-3 py-2 text-sm text-gray-600">
                      Welcome, {user?.name}
                    </div> */}
                    <Button variant="secondary" className="w-full rounded-md">
                      My Orders
                    </Button>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 flex items-center justify-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="w-full rounded-md">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HeaderNav;
