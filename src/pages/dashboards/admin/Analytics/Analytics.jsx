import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Calendar } from 'lucide-react';

const Analytics = () => {
    const [dateRange, setDateRange] = useState('month');

    const analyticsData = {
        totalUsers: '24,586',
        activeUsers: '18,342',
        totalEvents: '1,245',
        totalListings: '3,890',
        avgEngagement: '4.2%',
        conversionRate: '2.8%',
    };

    const statsCards = [
        { label: 'Total Users', value: analyticsData.totalUsers, icon: Users, color: 'bg-blue-50', textColor: 'text-blue-600' },
        { label: 'Active Users', value: analyticsData.activeUsers, icon: TrendingUp, color: 'bg-green-50', textColor: 'text-green-600' },
        { label: 'Total Events', value: analyticsData.totalEvents, icon: Calendar, color: 'bg-purple-50', textColor: 'text-purple-600' },
        { label: 'Total Listings', value: analyticsData.totalListings, icon: BarChart3, color: 'bg-orange-50', textColor: 'text-orange-600' },
    ];

    const topEvents = [
        { id: 1, name: 'Premium Tennis Court', views: 5420, bookings: 234, revenue: '$8,920' },
        { id: 2, name: 'Football Stadium Rental', views: 4890, bookings: 189, revenue: '$7,560' },
        { id: 3, name: 'Badminton Hall', views: 3670, bookings: 145, revenue: '$5,800' },
        { id: 4, name: 'Swimming Pool Access', views: 3210, bookings: 128, revenue: '$5,120' },
        { id: 5, name: 'Gym Membership', views: 2980, bookings: 95, revenue: '$3,800' },
    ];

    const userTrends = [
        { period: 'Week 1', signups: 234, active: 189, retention: '78%' },
        { period: 'Week 2', signups: 312, active: 256, retention: '82%' },
        { period: 'Week 3', signups: 278, active: 234, retention: '84%' },
        { period: 'Week 4', signups: 425, active: 367, retention: '86%' },
    ];

    return (
        <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor platform performance and user engagement metrics.</p>
                </div>

                {/* Date Range Selector */}
                <div className="mb-6 flex gap-2 flex-wrap">
                    {['week', 'month', 'quarter', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${dateRange === range
                                    ? 'bg-[#0f766e] text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsCards.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{card.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <card.icon className={`w-6 h-6 ${card.textColor}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                    {/* Top Events */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Top Performing Events</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Event Name</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Views</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Bookings</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {topEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{event.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.views.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.bookings}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#0f766e]">{event.revenue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* User Trends */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">User Trends</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Period</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Signups</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Active</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Retention</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {userTrends.map((trend, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{trend.period}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{trend.signups}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{trend.active}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-green-600">{trend.retention}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <p className="text-sm text-gray-600 mb-2">Average Engagement Rate</p>
                        <p className="text-3xl font-bold text-[#0f766e] mb-4">{analyticsData.avgEngagement}</p>
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Up 12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
                        <p className="text-3xl font-bold text-[#0f766e] mb-4">{analyticsData.conversionRate}</p>
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Up 8% from last month</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Analytics;
