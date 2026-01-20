import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';
const HeaderTop = () => {
  return (
    <div className="bg-white py-2">
      <Container>
        <div className="mx-auto flex h-15 items-center justify-between ">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="ESSA HUB Logo" className="h-25 w-25" />
          
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden flex-1 max-w-2xl mx-8 md:block">
          <div className="relative bg-white shadow" >
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
          {/* Location Selector - Hidden on mobile */}
          <button className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-btn-primary hover:bg-gray-100 md:flex">
            <MapPin className="h-4 w-4" />
            <span>Alabama</span>
          </button>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Button variant="primary" size='lg' className="rounded-md text-">
              Sign IN
            </Button>
            <Button variant="secondary" size='lg' className="rounded-md lg:text-base">
              Sign UP
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Visible only on mobile */}
      <div className="px-6 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
          <input
            type="search"
            placeholder="Search for anything..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-btn-primary focus:outline-none focus:ring-1 focus:ring-btn-primary"
          />
        </div>
      </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
