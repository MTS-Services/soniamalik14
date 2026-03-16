import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, DollarSign } from 'lucide-react';

const Revenue = () => {
    const [revenues, setRevenues] = useState([
        { id: 1, source: 'Event Bookings', amount: '$15,420', percentage: '35%', status: 'Active', date: '03/03/2025' },
        { id: 2, source: 'Premium Listings', amount: '$12,350', percentage: '28%', status: 'Active', date: '02/03/2025' },
        { id: 3, source: 'Sponsorships', amount: '$8,900', percentage: '20%', status: 'Pending', date: '01/03/2025' },
        { id: 4, source: 'Membership Fees', amount: '$5,670', percentage: '13%', status: 'Active', date: '28/02/2025' },
        { id: 5, source: 'Advertising', amount: '$2,340', percentage: '5%', status: 'Inactive', date: '27/02/2025' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const filteredRevenues = revenues.filter((revenue) => {
        const matchesSearch = revenue.source.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || revenue.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-green-700 bg-green-100';
            case 'Pending':
                return 'text-orange-700 bg-orange-100';
            case 'Inactive':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const totalRevenue = revenues.reduce((sum, rev) => {
        const amount = parseInt(rev.amount.replace(/[\$,]/g, ''));
        return sum + amount;
    }, 0);

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Revenue Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Track and manage platform revenue from various sources.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0f766e] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Revenue Source
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">${(totalRevenue / 1000).toFixed(1)}K</p>
                            </div>
                            <DollarSign className="w-10 h-10 text-[#0f766e]/20" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Sources</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                            </div>
                            <DollarSign className="w-10 h-10 text-green-500/20" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">$8,900</p>
                            </div>
                            <DollarSign className="w-10 h-10 text-orange-500/20" />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    <div className="p-6">
                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">

                            {/* Search Bar */}
                            <div className="flex items-center w-full max-w-md bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search revenue sources..."
                                    className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="appearance-none w-48 px-4 py-2 pr-10 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f0f4f4] border-y border-gray-100">
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Revenue Source</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Percentage</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredRevenues.length > 0 ? (
                                    filteredRevenues.map((revenue) => (
                                        <tr key={revenue.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
                                                {revenue.source}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-[#0f766e]">
                                                {revenue.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {revenue.percentage}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(revenue.status)}`}>
                                                    {revenue.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {revenue.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="View">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No revenue sources found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-[#0f766e]">
                            Showing {filteredRevenues.length} results
                        </span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors">
                                Previous
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Revenue;
