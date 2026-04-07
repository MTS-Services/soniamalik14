import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';

const DashboardNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getBasePath = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return '/admin';
      case ROLES.PROVIDER:
        return '/provider';
      case ROLES.COACH:
        return '/coach';
      default:
        return '/dashboard';
    }
  };

  const handleProfileClick = () => {
    const role = user?.role;
    const path =
      role === ROLES.PROVIDER
        ? '/provider/settings'
        : role === ROLES.ADMIN
          ? '/admin/settings'
          : role === ROLES.COACH
            ? '/coach/settings'
            : getBasePath(role);
    navigate(path);
  };

  const avatarSrc =
    user?.avatar ||
    user?.image ||
    'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D';

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
      {/* Left side - Menu button and Logo (mobile) */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu - mobile only */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        
        {/* Logo - mobile only */}
        <img 
          src="/logo.svg" 
          alt="Logo" 
          className="lg:hidden h-8 w-auto" 
        />
      </div>
      
      {/* Right side - Notification and Profile */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2 lg:gap-3 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={avatarSrc}
            alt="User avatar"
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover"
          />
          <div className="hidden sm:block text-base">
            <div className="font-medium text-gray-900">{user?.name || 'Ismat Nikita'}</div>
            <div className="text-gray-500">{user?.role || 'Member'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
