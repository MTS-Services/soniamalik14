import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    CalendarCheck,
    Package,
    ShoppingCart,
    MessageSquare,
    Users,
    Wrench,
    DollarSign,
    Shield,
    LogOut,
} from 'lucide-react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'event', label: 'Event', icon: <Calendar className="w-5 h-5" /> },
        { id: 'event-details', label: 'Event Details', icon: <CalendarCheck className="w-5 h-5" /> },
        { id: 'product-request', label: 'Product Request', icon: <Package className="w-5 h-5" /> },
        { id: 'order', label: 'Order', icon: <ShoppingCart className="w-5 h-5" /> },
        { id: 'thread', label: 'Thread', icon: <MessageSquare className="w-5 h-5" /> },
        { id: 'club', label: 'Club', icon: <Users className="w-5 h-5" /> },
        { id: 'service', label: 'Service', icon: <Wrench className="w-5 h-5" /> },
        { id: 'finances', label: 'Finances', icon: <DollarSign className="w-5 h-5" /> },
        { id: 'role-matrix', label: 'Role Matrix', icon: <Shield className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="flex items-center px-5">
                <img src="/logo.svg" alt="Logo" className="w-30 h-auto pb-5 pt-2.5" />
            </div>

            {/* Menu */}
            <nav className="flex-1 pb-4 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = activeItem === item.id;
                    return (
                        <div key={item.id} className="">
                                        <NavLink
                                            to={`/${item.id}`}
                                            onClick={() => setActiveItem(item.id)}
                                            className={({ isActive: navIsActive }) =>
                                                `w-full flex items-center gap-3 px-4 py-3 rounded-none ${
                                                    navIsActive ? 'bg-btn-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                                                }`
                                            }
                                        >
                                            <span className="flex items-center">{item.icon}</span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </NavLink>
                        </div>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-gray-200 px-4 py-3">
                <Link
                    to="/logout"
                    onClick={() => {
                        // TODO: replace with real logout logic
                        console.log('logout');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-btn-primary hover:bg-gray-50 rounded-none"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log Out</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;