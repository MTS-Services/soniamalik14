import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const UserTrendsChart = () => {
  const chartData = [
    { month: 'Jan', value: 5000 },
    { month: 'Feb', value: 6500 },
    { month: 'Mar', value: 5800 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 5200 },
    { month: 'Jun', value: 3800 },
    { month: 'Jul', value: 7200 },
    { month: 'Aug', value: 8500 },
    { month: 'Sep', value: 7800 },
    { month: 'Oct', value: 9200 },
    { month: 'Nov', value: 8000 },
    { month: 'Dec', value: 7500 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2 min-w-0">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">User</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-btn-primary"></div>
            <span className="text-sm text-gray-600">Player</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm text-gray-600">Service Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-600">Sport Providers</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0d9488"
            strokeWidth={2}
            fill="url(#colorValue1)"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#colorValue2)"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#9ca3af"
            strokeWidth={2}
            fill="url(#colorValue3)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTrendsChart;
