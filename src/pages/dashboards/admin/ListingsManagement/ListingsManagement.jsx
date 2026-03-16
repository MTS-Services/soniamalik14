import React, { useState, useMemo } from 'react';
import {
    Download,
    Search,
    ChevronDown,
    Calendar,
    Eye,
    TrendingUp,
    MessageSquare,
    ExternalLink,
    Star,
    Flag,
    CheckCircle2
} from 'lucide-react';

const ListingsManagement = () => {
    // Filter States
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSport, setSelectedSport] = useState('All Sports');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    // Expanded Dummy Data with 'providerType' for the Tabs
    const tableData = [
        {
            id: 1,
            listing: 'Beginner Tennis Sessions',
            date: '03/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Tennis',
            postcode: 'SW1A 1AA',
            status: 'Featured',
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
        },
        {
            id: 2,
            listing: 'Sports Physiotherapy',
            date: '03/03/2025',
            provider: 'Infinity Sports Rehabilitation Center',
            providerType: 'Service Provider',
            category: 'Cricket',
            postcode: 'M1 1AE',
            status: 'Pending',
            engagement: null
        },
        {
            id: 3,
            listing: 'Sports Physiotherapy',
            date: '03/03/2025',
            provider: 'Elite Motion Rehab Academy',
            providerType: 'Service Provider',
            category: 'Squash',
            postcode: 'B1 1AA',
            status: 'Pending',
            engagement: null
        },
        {
            id: 4,
            listing: 'Beginner Cricket Sessions',
            date: '03/03/2025',
            provider: 'Apex Performance Therapy Center',
            providerType: 'Service Provider',
            category: 'Football',
            postcode: 'L1 8JQ',
            status: 'Live',
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
        },
        {
            id: 5,
            listing: 'Beginner Badminton Sessions',
            date: '03/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Badminton',
            postcode: 'EH1 1YZ',
            status: 'Live',
            engagement: { views: 800, trend: 20, messages: 15, shares: 10 }
        },
        {
            id: 6,
            listing: 'Beginner Cricket Sessions',
            date: '03/03/2025',
            provider: 'Zenith Athletic Therapy School',
            providerType: 'Service Provider',
            category: 'Cricket',
            postcode: 'CF10 1EP',
            status: 'Banned',
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
        },
        {
            id: 7,
            listing: 'Advanced Tennis Coaching',
            date: '04/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Tennis',
            postcode: 'SW1A 1AB',
            status: 'Live',
            engagement: { views: 2100, trend: 60, messages: 50, shares: 110 }
        },
        {
            id: 8,
            listing: 'Squash Court Rental',
            date: '04/03/2025',
            provider: 'City Sports Hub',
            providerType: 'Sport Providers',
            category: 'Squash',
            postcode: 'E1 6AN',
            status: 'Pending',
            engagement: null
        }
    ];

    // Get unique categories and statuses for the dropdowns
    const uniqueSports = ['All Sports', ...Array.from(new Set(tableData.map(item => item.category)))];
    const uniqueStatuses = ['All Status', 'Featured', 'Pending', 'Live', 'Banned'];

    // Filter Logic
    const filteredData = useMemo(() => {
        return tableData.filter((item) => {
            // 1. Tab Filter
            const matchesTab = activeTab === 'All' || item.providerType === activeTab;
            
            // 2. Search Filter (checks listing name, provider name, and category)
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = 
                item.listing.toLowerCase().includes(searchLower) ||
                item.provider.toLowerCase().includes(searchLower) ||
                item.category.toLowerCase().includes(searchLower);
            
            // 3. Dropdown Filters
            const matchesSport = selectedSport === 'All Sports' || item.category === selectedSport;
            const matchesStatus = selectedStatus === 'All Status' || item.status === selectedStatus;

            return matchesTab && matchesSearch && matchesSport && matchesStatus;
        });
    }, [activeTab, searchQuery, selectedSport, selectedStatus]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Featured':
                return <span className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">Featured</span>;
            case 'Pending':
                return <span className="px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">Pending</span>;
            case 'Live':
                return <span className="px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">Live</span>;
            case 'Banned':
                return <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">Banned</span>;
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className='text-center sm:text-left'>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Listings Management</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Review, approve, and feature provider and brand listings.</p>
                    </div>
                   <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-btn-primary text-white text-sm sm:text-base font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                             <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                             <span className="hidden sm:inline">Export CSV</span>
                             <span className="sm:hidden">Export</span>
                           </button>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    <div className="p-6">
                        {/* Search and Top Toggles */}
                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">

                            {/* Search Bar */}
                            <div className="flex items-center flex-1 w-full max-w-xl bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search listings, providers or categories"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                                {['All', 'Sport Providers', 'Service Provider'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                            activeTab === tab
                                                ? 'bg-[#0f766e] text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dropdown Filters */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            
                            {/* Sport Filter Dropdown */}
                            <div className="relative">
                                <select 
                                    value={selectedSport}
                                    onChange={(e) => setSelectedSport(e.target.value)}
                                    className="appearance-none flex items-center justify-between w-40 px-4 py-2 pr-10 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                                >
                                    {uniqueSports.map(sport => (
                                        <option key={sport} value={sport}>{sport === 'All Sports' ? 'Select sports' : sport}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Status Filter Dropdown */}
                            <div className="relative">
                                <select 
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="appearance-none flex items-center justify-between w-36 px-4 py-2 pr-10 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                                >
                                    {uniqueStatuses.map(status => (
                                        <option key={status} value={status}>{status === 'All Status' ? 'Status' : status}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Dummy Date Buttons (Non-functional for now to keep design) */}
                            <button className="flex items-center justify-between w-40 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                                Form date
                                <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                            </button>

                            <button className="flex items-center justify-between w-40 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                                To date
                                <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f0f4f4] border-y border-gray-100">
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Listing</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Provider</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Postcode</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Engagement</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-800">{row.listing}</div>
                                                <div className="text-xs text-gray-500 mt-1">{row.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {row.provider}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {row.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {row.postcode}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(row.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                {row.engagement ? (
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex items-center gap-1" title="Views"><Eye className="w-3.5 h-3.5" /> {row.engagement.views}</span>
                                                        <span className="flex items-center gap-1" title="Trend"><TrendingUp className="w-3.5 h-3.5" /> {row.engagement.trend}</span>
                                                        <span className="flex items-center gap-1" title="Messages"><MessageSquare className="w-3.5 h-3.5" /> {row.engagement.messages}</span>
                                                        <span className="flex items-center gap-1" title="Shares"><ExternalLink className="w-3.5 h-3.5" /> {row.engagement.shares}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-3">
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="View Details">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="transition-colors" title={row.status === 'Featured' ? "Unfeature" : "Feature"}>
                                                        <Star className={`w-4 h-4 ${row.status === 'Featured' ? 'fill-amber-400 text-amber-400' : 'text-amber-500 hover:fill-amber-100'}`} />
                                                    </button>
                                                    <button className="transition-colors" title="Flag/Ban">
                                                        <Flag className={`w-4 h-4 ${row.status === 'Banned' ? 'fill-red-500 text-red-500' : 'text-red-500 hover:fill-red-100'}`} />
                                                    </button>
                                                    {row.status === 'Pending' && (
                                                        <button className="text-emerald-500 hover:text-emerald-600 transition-colors" title="Approve">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No listings found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-sm text-[#0f766e]">
                            Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {filteredData.length} results
                        </span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ListingsManagement;