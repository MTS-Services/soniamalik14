import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Menu, X, LogOut } from 'lucide-react';
import { CiUser } from 'react-icons/ci';
import Button from '../ui/Button';
import Container from '../layout/Container';
import { useAuth } from '../../context/AuthContext';

const HeaderTop = ({ onMenuClick, isMenuOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-white py-2">
      <Container>
        {/* Mobile Header: [Menu + Search] --- Logo (centered) --- [User] */}
        <div className="flex lg:hidden items-center justify-between py-1 ">
          {/* Left: Menu & Search together */}
          <div className="flex items-center gap-1">
            <button 
              onClick={onMenuClick}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/logo.svg" alt="ESSA HUB Logo" className="h-20 w-20" />
          </Link>

          {/* Right: User */}
          <button className="p-2 -mr-2 hover:bg-gray-100 rounded-md">
            <CiUser className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
              <input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-btn-primary focus:outline-none focus:ring-1 focus:ring-btn-primary"
              />
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:flex h-15 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="ESSA HUB Logo" className="h-25 w-25" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative bg-white shadow">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-900" />
              <input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-xs border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-btn-primary focus:outline-none focus:ring-1 focus:ring-btn-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-9">
            {/* Location Selector */}
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-btn-primary hover:bg-gray-100">
              <MapPin className="h-4 w-4" />
              <span>Alabama</span>
            </button>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <Link to="/signin">
                  <Button variant="primary" className="rounded-md">
                    Sign IN
                  </Button>
                </Link>
                <Button variant="secondary" className="rounded-md lg:text-base">
                  Sign UP
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* <span className="text-sm text-gray-700">Welcome, <strong>{user?.name}</strong></span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-btn-primary hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button> */}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
