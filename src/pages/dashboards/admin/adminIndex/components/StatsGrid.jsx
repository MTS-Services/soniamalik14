import React from 'react';
import { Users, TrendingUp, FileText, MessageSquare, UserCog, List, ShieldAlert } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = () => {
  const stats = [
    {
      icon: <Users className="text-btn-primary h-7 w-7" />,
      label: 'Total Users',
      value: '12,450',
      change: '+12% vs last month',
      positive: true,
    },
    {
      icon: <UserCog className="text-btn-primary h-7 w-7" />,
      label: 'New Signups',
      value: '1,240',
      change: '+8% vs last month',
      positive: true,
    },
    {
      icon: <List className="text-btn-primary h-7 w-7" />,
      label: 'Live Listings',
      value: '845',
      change: '+5% vs last month',
      positive: true,
    },
    {
      icon: <TrendingUp className="text-btn-primary h-7 w-7" />,
      label: 'Signed Kmps',
      value: '3,120',
      change: '+4% vs last month',
      positive: true,
    },
    {
      icon: <MessageSquare className="text-btn-primary h-7 w-7" />,
      label: 'Messages',
      value: '4850',
      change: '+12% vs last month',
      positive: true,
    },
    {
      icon: <TrendingUp className="text-btn-primary h-7 w-7" />,
      label: 'Outbound Clicks',
      value: '15,250',
      change: '+8% vs last month',
      positive: true,
    },
    {
      icon: <FileText className="text-btn-primary h-7 w-7" />,
      label: 'Pending Approvals',
      value: '52',
      change: '+1% vs last month',
      positive: false,
    },
    {
      icon: <ShieldAlert className="text-btn-primary h-7 w-7" />,
      label: 'Flagged Items',
      value: '3,120',
      change: '+4% vs last month',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
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
  );
};

export default StatsGrid;
