import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
    BarChart3,
    UserPlus,
    Heart,
    X,
    Settings,
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';

// Menu items configuration
const getMenuItems = (role, basePath) => {
    const adminMenu = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: `${basePath}` },
        { id: 'event', label: 'Event', icon: <Calendar className="w-5 h-5" />, path: `${basePath}/event` },
        { id: 'event-details', label: 'Event Details', icon: <CalendarCheck className="w-5 h-5" />, path: `${basePath}/event-details` },
        { id: 'product-request', label: 'Product Request', icon: <Package className="w-5 h-5" />, path: `${basePath}/product-request` },
        { id: 'order', label: 'Order', icon: <ShoppingCart className="w-5 h-5" />, path: `${basePath}/order` },
        { id: 'thread', label: 'Thread', icon: <MessageSquare className="w-5 h-5" />, path: `${basePath}/thread` },
        { id: 'club', label: 'Club', icon: <Users className="w-5 h-5" />, path: `${basePath}/club` },
        { id: 'service', label: 'Service', icon: <Wrench className="w-5 h-5" />, path: `${basePath}/service` },
        { id: 'finances', label: 'Finances', icon: <DollarSign className="w-5 h-5" />, path: `${basePath}/finances` },
        { id: 'role-matrix', label: 'Role Matrix', icon: <Shield className="w-5 h-5" />, path: `${basePath}/role-matrix` },
        { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, path: `${basePath}/settings` },
    ];

    const providerMenu = [
        { id: 'dashboard', label: 'Event', icon: <Calendar className="w-5 h-5" />, path: `${basePath}` },
        { id: 'event-analytics', label: 'Event Analytics', icon: <BarChart3 className="w-5 h-5" />, path: `${basePath}/event-analytics` },
        { id: 'thread', label: 'Thread', icon: <MessageSquare className="w-5 h-5" />, path: `${basePath}/thread` },
        { id: 'service', label: 'Service', icon: <Wrench className="w-5 h-5" />, path: `${basePath}/service` },
        { id: 'service-analytics', label: 'Service Analytics', icon: <BarChart3 className="w-5 h-5" />, path: `${basePath}/service-analytics` },
    ];

    const coachMenu = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: `${basePath}` },
        { id: 'event', label: 'Event', icon: <Calendar className="w-5 h-5" />, path: `${basePath}/event` },
        { id: 'event-analytics', label: 'Event Analytics', icon: <BarChart3 className="w-5 h-5" />, path: `${basePath}/event-analytics` },
        { id: 'thread', label: 'Thread', icon: <MessageSquare className="w-5 h-5" />, path: `${basePath}/thread` },
        { id: 'recruitment', label: 'Recruitment', icon: <UserPlus className="w-5 h-5" />, path: `${basePath}/recruitment` },
    ];

    switch (role) {
        case ROLES.ADMIN:
            return adminMenu;
        case ROLES.PROVIDER:
            return providerMenu;
        case ROLES.COACH:
            return coachMenu;
        default:
            return [];
    }
};

// Get base path for each role
const getBasePath = (role) => {
    switch (role) {
        case ROLES.ADMIN:
            return '/admin';
        case ROLES.PROVIDER:
            return '/provider';
        case ROLES.COACH:
            return '/coach';
        default:
            return '/';
    }
};

// Get role display name
const getRoleTitle = (role) => {
    switch (role) {
        case ROLES.ADMIN:
            return 'Admin';
        case ROLES.PROVIDER:
            return 'Service Provider';
        case ROLES.COACH:
            return 'Club/Coach Designer';
        default:
            return '';
    }
};

const Sidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const basePath = getBasePath(user?.role);
    const menuItems = getMenuItems(user?.role, basePath);
    const roleTitle = getRoleTitle(user?.role);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const handleNavClick = () => {
        // Close sidebar on mobile when a nav item is clicked
        if (window.innerWidth < 1024) {
            onClose?.();
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-63 h-screen bg-white border-r border-gray-200 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>


                {/* Logo */}
                <div className="flex items-center px-5">
                    <Link to="/" onClick={handleNavClick} className="inline-block" aria-label="Home">
                        <img src="/logo.svg" alt="Logo" className="w-30 h-auto pb-5 pt-2.5" />
                    </Link>
                </div>

                {/* Menu */}
                <nav className="flex-1 pb-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            <NavLink
                                to={item.path}
                                end={item.id === 'dashboard' || item.id === 'event'}
                                onClick={handleNavClick}
                                className={({ isActive }) => {
                                    // Make Event (or Event Analytics) appear active when viewing a specific event detail route (/coach/event/:id)
                                    const isEventDetailsRoute = location.pathname.startsWith(`${basePath}/event/`);
                                    // Match only the event list route (exact) so event-analytics doesn't collide
                                    const isEventListRoute = location.pathname === `${basePath}/event`;
                                    const isProvider = user?.role === ROLES.PROVIDER;
                                    const from = location.state?.from;
                                    let extraActive = false;
                                    if (isEventDetailsRoute) {
                                        // if navigated from analytics, highlight Event Analytics
                                        if (from === 'analytics' && item.id === 'event-analytics') extraActive = true;
                                        // if navigated from event page (or direct URL with no state), highlight Event
                                        // Treat `dashboard` as event parent only for PROVIDER role (provider uses dashboard as Event)
                                        if ((from === 'event' || from == null) && (item.id === 'event' || (isProvider && item.id === 'dashboard'))) extraActive = true;
                                    }
                                    // Also make the Event/dashboard menu active when viewing the event list route
                                    if (isEventListRoute && (item.id === 'event' || (isProvider && item.id === 'dashboard'))) {
                                        extraActive = true;
                                    }
                                    const active = isActive || extraActive;
                                    return `w-full flex items-center gap-3 font-medium text-sm px-5 py-3 rounded-none ${active ? 'bg-btn-primary text-white' : 'text-sidebarLink hover:bg-gray-50'
                                        }`;
                                }}
                            >
                                <span className="flex items-center">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </NavLink>
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-200 px-4 py-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-btn-primary hover:bg-gray-50 rounded-none"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;