import React, { useState } from 'react';
import { FiCalendar, FiChevronDown, FiPackage, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import Container from '../../../../components/layout/Container';
import Card from '../../../../components/ui/Card';
import Chat from '../../../../components/ui/Chat';
import SalesChart from '../../../../components/ui/SalesChart';

const StatCard = ({ title, value, subtitle, Icon }) => {
  const trimmed = subtitle ? subtitle.trim() : '';
  const isPos = trimmed.startsWith('+');
  const isNeg = trimmed.startsWith('-');

  return (
    <Card className="p-4">
      <div>
        <div className="text-sm" style={{ color: '#656565' }}>{title}</div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-2xl font-semibold" style={{ color: '#464646' }}>{value}</div>

          <div className="ml-4 flex-shrink-0">
            <div className="bg-[#E7F1F1] rounded-md p-2 flex items-center justify-center">
              {Icon ? <Icon className="h-5 w-5 text-[#0F766E]" aria-hidden /> : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="5" cy="10" r="1.6" fill="#0F766E" />
                  <circle cx="10" cy="10" r="1.6" fill="#0F766E" />
                  <circle cx="15" cy="10" r="1.6" fill="#0F766E" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {subtitle && (
          <div className={`text-sm mt-3 ${isPos ? 'text-green-600' : isNeg ? 'text-red-500' : ''}`} style={{ color: !isPos && !isNeg ? '#656565' : undefined }}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  );
};

const DashboardOverview = () => {
  const [range, setRange] = useState('30');

  // `range` holds the selected option value (e.g. '7', '30', '90')
  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="w-full md:w-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-dashboardTitle]">Dashboard Overview</h2>
              <p className="text-sm md:text-base mt-1 text-[#5B5B5B]">Monitor your customer service performance</p>
            </div>

            <div className="mt-3 md:mt-0 text-left md:text-right w-full md:w-auto">
              <div className="text-sm md:text-base text-[#5B5B5B] mb-2">{`Last ${range} days overview`}</div>
              <div className="relative inline-block w-full md:w-auto">
                <FiCalendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B5B5B] pointer-events-none" aria-hidden />

                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="block w-full md:w-auto pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm text-gray-700 appearance-none"
                  aria-label="Select date range"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>

                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden />
              </div>
            </div>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Active Listings" value="3" subtitle="+12% vs last month" Icon={FiPackage} />
            <StatCard title="Total Revenue" value="$1438.00" subtitle="+8% vs last month" Icon={FiDollarSign} />
            <StatCard title="Pending Orders" value="67" subtitle="-5% vs last month" Icon={FiShoppingCart} />
          </div>

          <SalesChart />

          {/* Top Selling Product - redesigned to match provided screenshot */}
          <div className="bg-white rounded-md p-4 shadow-sm mb-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#191B1C]">Top Selling product</h3>

              <div className="relative inline-flex">
                <select
                  className="block pl-3 pr-8 py-1 bg-white border border-gray-200 rounded-md shadow-sm text-sm text-gray-700 appearance-none"
                  aria-label="Select period"
                >
                  <option>This year</option>
                  <option>Last year</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Batting Gloves', value: 0.72, sold: 23 },
                { name: 'Football Boots', value: 0.88, sold: 23 },
                { name: 'Badminton Racket', value: 0.65, sold: 23 },
                { name: 'Rocket Grip', value: 0.77, sold: 23 },
                { name: 'Basketball Shoes', value: 0.62, sold: 23 },
                { name: 'Tennis Racket', value: 0.84, sold: 23 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="w-full pr-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-base text-[#000000]">{item.name}</div>
                      <div className="text-base text-[#000000] hidden md:block">{item.sold} Sold</div>
                    </div>

                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 rounded-full"
                        style={{ width: `${Math.max(6, Math.round(item.value * 100))}%`, background: 'linear-gradient(90deg, #179B91 0%, #0F766E 100%)' }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 ml-4 md:hidden">{item.sold} Sold</div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default DashboardOverview;
