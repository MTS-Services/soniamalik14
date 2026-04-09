import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import UpcomingEvents from './components/UpcomingEvents';
import NotificationsList from './components/NotificationsList';

const DashboardOverview = () => {
  return (
    <section className="bg-gray-50 dashboardPy dashboardSpaceY">
      <DashboardHeader userName="Ismail" />
      <UpcomingEvents />
      <NotificationsList />
    </section>
  );
};

export default DashboardOverview;