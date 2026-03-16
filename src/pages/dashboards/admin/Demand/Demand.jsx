import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, TrendingUp } from 'lucide-react';

const Demand = () => {
    const [demands, setDemands] = useState([
        { id: 1, name: 'Running Shoes', category: 'Footwear', demandLevel: 'High', search: '5,230', createdDate: '03/03/2025' },
        { id: 2, name: 'Tennis Racquet', category: 'Sports Equipment', demandLevel: 'Medium', search: '2,150', createdDate: '02/03/2025' },
        { id: 3, name: 'Yoga Mat', category: 'Fitness', demandLevel: 'High', search: '3,890', createdDate: '01/03/2025' },
        { id: 4, name: 'Basketball Shoes', category: 'Footwear', demandLevel: 'Very High', search: '7,650', createdDate: '28/02/2025' },
        { id: 5, name: 'Cricket Bat', category: 'Sports Equipment', demandLevel: 'Medium', search: '1,920', createdDate: '27/02/2025' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('All');

    const filteredDemands = demands.filter((demand) => {
        const matchesSearch = demand.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'All' || demand.demandLevel === selectedLevel;
        return matchesSearch && matchesLevel;
    });

    const getDemandColor = (level) => {
        switch (level) {
            case 'Very High':
                return 'text-red-700 bg-red-100';
            case 'High':
                return 'text-orange-700 bg-orange-100';
            case 'Medium':
                return 'text-amber-700 bg-amber-100';
            case 'Low':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Demand Names</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor and manage product demand trends.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0f766e] text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Demand
                    </button>
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
                                    placeholder="Search demand names..."
                                    className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Demand Level Filter */}
                            <div className="relative">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="appearance-none w-48 px-4 py-2 pr-10 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                                >
                                    <option value="All">All Levels</option>
                                    <option value="Very High">Very High</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f0f4f4] border-y border-gray-100">
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Demand Name</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Demand Level</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Searches</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Created Date</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredDemands.length > 0 ? (
                                    filteredDemands.map((demand) => (
                                        <tr key={demand.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-base font-medium text-gray-800">{demand.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {demand.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${getDemandColor(demand.demandLevel)}`}>
                                                    <TrendingUp className="w-3 h-3" />
                                                    {demand.demandLevel}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {demand.search}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {demand.createdDate}
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
                                            No demands found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-[#0f766e]">
                            Showing {filteredDemands.length} results
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

export default Demand;
