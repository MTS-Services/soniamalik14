import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import UpcomingEvents from './components/UpcomingEvents';
import NotificationsList from './components/NotificationsList';

const DashboardOverview = () => {
  return (
    <section className=" dashboardPy dashboardSpaceY">
      <DashboardHeader userName="Ismail" />
      <UpcomingEvents />
      <NotificationsList />
    </section>
  );
};

export default DashboardOverview;