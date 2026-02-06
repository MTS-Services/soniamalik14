import React, { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, FileText, ChevronDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Button from '../../../../components/ui/Button';
import StatsCard from '../../../../components/ui/StatsCard';

const AdminIndex = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [payoutRequests, setPayoutRequests] = useState([
    {
      id: 1,
      name: 'Jerome Bell',
      phone: '(319) 555-0115',
      email: 'sara.cruz@example.com',
      account: '45850217',
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Annette Black',
      phone: '(208) 555-0104',
      email: 'jessica.hanson@example.com',
      account: '66235018',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Ronald Richards',
      phone: '(684) 555-0102',
      email: 'alma.lawson@example.com',
      account: '73018426',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Brooklyn Simmons',
      phone: '(480) 555-0103',
      email: 'debra.holt@example.com',
      account: '69235018',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Robert Fox',
      phone: '(629) 555-0129',
      email: 'michael.mitc@example.com',
      account: '73018426',
      status: 'Completed',
    },
    {
      id: 6,
      name: 'Courtney Henry',
      phone: '(252) 555-0126',
      email: 'willie.jennings@example.com',
      account: '45850217',
      status: 'In Progress',
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

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

  const stats = [
    {
      icon: <DollarSign className="text-btn-primary h-5 w-5" />,
      label: 'Total Revenue',
      value: '$12000',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: <Users className="text-btn-primary h-5 w-5" />,
      label: 'Total Users',
      value: '42,500',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: <TrendingUp className="text-btn-primary h-5 w-5" />,
      label: 'Pending Projects',
      value: '$12,400',
      change: '+26.0%',
      positive: true,
    },
    {
      icon: <FileText className="text-btn-primary h-5 w-5" />,
      label: 'Active Listings',
      value: '452',
      change: '+5.3%',
      positive: true,
    },
  ];

  const eventRequests = [
    { club: 'Red Foxes Club', date: 'Dec 12 2022', status: 'Review' },
    { club: 'Red Foxes Club', date: 'Dec 12 2022', status: 'Review' },
    { club: 'Red Foxes Club', date: 'Dec 12 2022', status: 'Review' },
    { club: 'Red Foxes Club', date: 'Dec 12 2022', status: 'Review' },
    { club: 'Red Foxes Club', date: 'Dec 12 2022', status: 'Review' },
  ];

  const statusOptions = ['In Progress', 'Completed', 'Pending'];

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleStatusChange = (id, newStatus) => {
    setPayoutRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    setOpenDropdown(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white';
      case 'Pending':
        return 'bg-amber-500 text-white';
      case 'In Progress':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const tableColumns = ['Name', 'Phone Number', 'Email', 'Account Number', 'ACTIONS'];

  const renderTableRow = (request) => (
    <>
      <td className="px-4 py-4 text-sm text-gray-900">{request.name}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{request.phone}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{request.email}</td>
      <td className="px-4 py-4 text-sm text-gray-900 font-medium">{request.account}</td>
      <td className="px-4 py-4">
        <div className="relative dropdown-container">
          <button
            onClick={() => toggleDropdown(request.id)}
            className={`inline-flex items-center justify-between w-40 rounded-md px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${getStatusColor(
              request.status
            )}`}
          >
            {request.status}
            <ChevronDown className={`h-4 w-4 transition-transform ${
              openDropdown === request.id ? 'rotate-180' : ''
            }`} />
          </button>
          
          {openDropdown === request.id && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleStatusChange(request.id, option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors ${
                    request.status === option 
                      ? 'bg-gray-100 font-medium text-gray-900' 
                      : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
    </>
  );

  const renderPayoutCard = (request, index) => (
    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-3 shadow-sm">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base text-gray-900">{request.name}</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium text-gray-900">{request.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium text-gray-900">{request.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account:</span>
            <span className="font-medium text-gray-900">{request.account}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="relative dropdown-container">
            <button
              onClick={() => toggleDropdown(request.id)}
              className={`inline-flex items-center justify-between w-full rounded-md px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
              <ChevronDown className={`h-4 w-4 transition-transform ${
                openDropdown === request.id ? 'rotate-180' : ''
              }`} />
            </button>
            
            {openDropdown === request.id && (
              <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleStatusChange(request.id, option)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors ${
                      request.status === option 
                        ? 'bg-gray-100 font-medium text-gray-900' 
                        : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        subtitle="Track loan progress here. You almost reach a goal"
        right={
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Year to date</option>
            </select>
            <Button variant="primary">Create Report</Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="dashboardStatsGrid">
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

      {/* Revenue Overview and Event Request */}
      <div className="grid grid-cols-1 gap-3 lg:gap-6 lg:grid-cols-3">
        {/* Revenue Overview */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600">
              <option>Yearly Revenue Statistics</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
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
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0d9488"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Event Request */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Event Request</h2>
          <div className="mb-6 space-y-4">
            {eventRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-white">
                    R
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{request.club}</div>
                    <div className="text-xs text-gray-500">{request.date}</div>
                  </div>
                </div>
                <button className="text-btn-primary text-sm font-medium hover:opacity-80">
                  {request.status}
                </button>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full rounded-lg py-3">
            Dashboard
          </Button>
        </div>
      </div>

      {/* Payout Request Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <DashboardHeader title="Payout Request" subtitle="Manage payout requests and status updates" className="mb-6" />
          
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {payoutRequests.map((request, index) => renderPayoutCard(request, index))}
            <div className="pt-4">
              <TablePagination
                currentPage={currentPage}
                totalPages={1}
                totalResults={payoutRequests.length}
                resultsPerPage={payoutRequests.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className='hidden md:block'>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <Table columns={tableColumns} data={payoutRequests} renderRow={renderTableRow} />
            </div>
            <div className="pt-4">
              <TablePagination
                currentPage={currentPage}
                totalPages={1}
                totalResults={payoutRequests.length}
                resultsPerPage={payoutRequests.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
