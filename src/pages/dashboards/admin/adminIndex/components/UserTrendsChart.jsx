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
    { month: 'Jan', player: 5000, provider: 2000, sport: 8000 },
    { month: 'Feb', player: 15000, provider: 10000, sport: 12000 },
    { month: 'Mar', player: 25000, provider: 15000, sport: 15000 },
    { month: 'Apr', player: 30000, provider: 20000, sport: 18000 },
    { month: 'May', player: 28000, provider: 25000, sport: 20000 },
    { month: 'Jun', player: 27000, provider: 32000, sport: 22000 },
    { month: 'July', player: 33000, provider: 35000, sport: 22000 },
    { month: 'Aug', player: 48000, provider: 37000, sport: 21000 },
    { month: 'Sep', player: 50000, provider: 33000, sport: 20000 },
    { month: 'Oct', player: 40000, provider: 30000, sport: 20000 },
    { month: 'Nov', player: 28000, provider: 32000, sport: 22000 },
    { month: 'Dec', player: 20000, provider: 45000, sport: 28000 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2 min-w-0">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">User</h2>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-btn-primary">
          <option>This year</option>
          <option>Last year</option>
          <option>Last 6 months</option>
        </select>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-btn-primary"></div>
          <span className="text-base text-gray-700">Player</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
          <span className="text-base text-gray-700">Service Provider</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-900"></div>
          <span className="text-base text-gray-700">Sport Providers</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPlayer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProvider" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSport" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#111827" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 16 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 16 }}
            tickFormatter={(value) => `${value / 1000}k`}
            ticks={[0, 10000, 20000, 30000, 40000, 50000]}
            domain={[0, 50000]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            formatter={(value) => value.toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="player"
            stroke="#0F766E"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="provider"
            stroke="#FBBF24"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="sport"
            stroke="#111827"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTrendsChart;
