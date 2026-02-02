import React from 'react';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';

const StatCard = ({ title, value, subtitle }) => (
  <Card className="p-4">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-xl font-semibold text-gray-900 mt-2">{value}</div>
    {subtitle && <div className="text-sm text-green-600 mt-1">{subtitle}</div>}
  </Card>
);

const DashboardOverview = () => {
  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#111827]">Dashboard Overview</h2>
            <p className="text-sm text-gray-500">Monitor your customer service performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Active Listings" value="3" subtitle="+12% vs last month" />
            <StatCard title="Total Revenue" value="$1438.00" subtitle="+8% vs last month" />
            <StatCard title="Pending Orders" value="67" subtitle="-5% vs last month" />
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
            <div className="h-48 bg-gradient-to-b from-[#CFF2EC] to-white rounded-md flex items-center justify-center text-sm text-gray-400">Chart placeholder</div>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Top Selling product</h3>
            <div className="space-y-4">
              {['Batting Gloves','Football Boots','Badminton Racket','Rocket Grip','Basketball Shoes','Tennis Racket'].map((t) => (
                <div key={t} className="flex items-center justify-between">
                  <div className="w-3/4">
                    <div className="text-sm text-gray-700 mb-1">{t}</div>
                    <div className="w-full bg-gray-100 h-3 rounded overflow-hidden">
                      <div className="bg-gradient-to-r from-[#0F766E] to-[#0d655d] h-3 w-3/4" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 ml-4">23 Sold</div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default DashboardOverview;
