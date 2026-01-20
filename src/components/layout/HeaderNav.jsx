import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Button from '../ui/Button';
import Container from './Container';
import { CiUser } from 'react-icons/ci';

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-nav-bg border-b border-gray-200 shadow-sm">
      <Container>
        {/* Desktop Navigation */}
        <div className="hidden items-center justify-between py-2 md:flex">
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
            <Button variant="secondary" size="xs" className="rounded-md text-xs py-1.5">
              My Orders
            </Button>
            <button className=" p-2 hover:bg-gray-100">
              <CiUser  className="text-secondary-text h-5 lg:w-7 lg:h-7 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex items-center justify-between py-3 md:hidden">
          <span className="text-sm font-semibold text-[#1C1C1C]">Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-btn-primary text-[#1C1C1C] focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="border-t border-gray-200 pb-4 md:hidden">
            <nav className="flex flex-col space-y-1 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
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
                <Button variant="secondary" className="w-full rounded-md">
                  My Orders
                </Button>
                <button className="text-secondary-text flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100">
                  <User className="h-4 w-4" />
                  Profile
                </button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HeaderNav;
