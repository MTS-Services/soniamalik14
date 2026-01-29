import React from 'react';
import { Calendar, Users, BarChart3, UserPlus } from 'lucide-react';
import DashboardHeader from '../../../components/ui/DashboardHeader';
import Button from '../../../components/ui/Button';
import StatsCard from '../../../components/ui/StatsCard';

const CoachIndex = () => {
  const stats = [
    {
      icon: <Calendar className="text-btn-primary h-5 w-5" />,
      label: 'Upcoming Events',
      value: '8',
      change: '+2',
      positive: true,
    },
    {
      icon: <Users className="text-btn-primary h-5 w-5" />,
      label: 'Team Members',
      value: '24',
      change: '+5',
      positive: true,
    },
    {
      icon: <BarChart3 className="text-btn-primary h-5 w-5" />,
      label: 'Event Views',
      value: '1,245',
      change: '+22%',
      positive: true,
    },
    {
      icon: <UserPlus className="text-btn-primary h-5 w-5" />,
      label: 'New Recruits',
      value: '7',
      change: '+3',
      positive: true,
    },
  ];

  return (
    <div className="p-6">
      <DashboardHeader
        title="Coach Dashboard"
        description="Manage your club, events, and recruitment"
        subtitle="Manage your club, events, and recruitment"
        right={<Button variant="primary">New Recruit</Button>}
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
          title="Team Overview"
          subtitle="Your team members and recruitment activity will appear here."
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default CoachIndex;
