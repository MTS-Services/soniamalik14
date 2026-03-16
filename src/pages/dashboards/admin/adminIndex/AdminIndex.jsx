import React from 'react';
import { Download } from 'lucide-react';
import StatsGrid from './components/StatsGrid';
import UserTrendsChart from './components/UserTrendsChart';
import DemandVsSupply from './components/DemandVsSupply';
import HighDemandAlerts from './components/HighDemandAlerts';
import TopLocationsByDemand from './components/TopLocationsByDemand';

const AdminIndex = () => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-btn-primary text-white text-sm sm:text-base font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
          <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>
      {/* Stats Grid */}
      <StatsGrid />

      {/* User Trends & Demand vs Supply */}
      <div className="grid grid-cols-1 gap-3 lg:gap-6 xl:grid-cols-3">
        <UserTrendsChart />
        <DemandVsSupply />
      </div>

      {/* High Demand Alerts & Top Locations */}
      <div className="grid grid-cols-1 gap-3 lg:gap-6 xl:grid-cols-3">
        <HighDemandAlerts />
        <TopLocationsByDemand />
      </div>
    </div>
  );
};

export default AdminIndex;
