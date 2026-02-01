import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Navbar */}
                <DashboardNavbar onMenuClick={toggleSidebar} />
                
                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;