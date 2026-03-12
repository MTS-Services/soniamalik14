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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-base text-gray-600 mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-5 bg-btn-primary text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
          <Download className="h-6 w-6" />
          Export CSV
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
