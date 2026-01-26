import React from 'react';
import { Bell, User } from 'lucide-react';
import Container from './Container';

const DashboardNavbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Container>
        <div className="flex items-center gap-4">
      </div>
      
      <div className="flex items-center justify-end gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-btn-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">Ismat Nikita</div>
            <div className="text-gray-500">Admin</div>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default DashboardNavbar;
