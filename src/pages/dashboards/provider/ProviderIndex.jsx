import React from 'react';
import { Calendar, BarChart3, Users, TrendingUp } from 'lucide-react';
import DashboardHeader from '../../../components/ui/DashboardHeader';
import Button from '../../../components/ui/Button';
import StatsCard from '../../../components/ui/StatsCard';

const ProviderIndex = () => {
  const stats = [
    {
      icon: <Calendar className="text-btn-primary h-5 w-5" />,
      label: 'Active Events',
      value: '12',
      change: '+3',
      positive: true,
    },
    {
      icon: <Users className="text-btn-primary h-5 w-5" />,
      label: 'Total Clients',
      value: '156',
      change: '+18',
      positive: true,
    },
    {
      icon: <BarChart3 className="text-btn-primary h-5 w-5" />,
      label: 'Services Booked',
      value: '89',
      change: '+12%',
      positive: true,
    },
    {
      icon: <TrendingUp className="text-btn-primary h-5 w-5" />,
      label: 'Revenue',
      value: '$4,500',
      change: '+8.5%',
      positive: true,
    },
  ];

  return (
    <div className="p-6">
      <DashboardHeader
        title="Service Provider Dashboard"
        description="Manage your events and services"
        subtitle="Manage your events and services"
        right={<Button variant="primary">New Event</Button>}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
          />
        ))}
      </div>

      {/* Placeholder Content */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100">
        <DashboardHeader
          title="Recent Activity"
          subtitle="Your recent events and service bookings will appear here."
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default ProviderIndex;
