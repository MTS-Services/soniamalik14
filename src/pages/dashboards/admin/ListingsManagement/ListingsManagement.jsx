import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ListingsFilterSection from './components/ListingsFilterSection';
import ListingsTable from './components/ListingsTable';
import ListingsPaginationSection from './components/ListingsPaginationSection';

const ListingsManagement = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Dummy Data
    const listingsData = Array(6).fill({
        listing: 'Beginner Tennis Sessions',
        date: '03/03/2025',
        provider: 'Sarah\'s Tennis Academy',
        category: 'Tennis',
        postcode: 'SW1A 1AA',
        status: 'Featured',
        engagement: { views: 1250, saves: 48, messages: 28, shares: 28 },
    }).map((item, i) => ({
        ...item,
        id: i,
        listing: ['Beginner Tennis Sessions', 'Sports Physiotherapy', 'Sports Physiotherapy', 'Beginner Cricket Sessions', 'Beginner Cricket Sessions', 'Beginner Cricket Sessions'][i],
        provider: ['Sarah\'s Tennis Academy', 'Infinity Sports Rehabilitation Center', 'Elite Motion Rehab Academy', 'Apex Performance Therapy Center', 'PrimeFlex Sports Recovery Institute', 'Zenith Athletic Therapy School'][i],
        category: ['Tennis', 'Cricket', 'Squash', 'Football', 'Badminton', 'Cricket'][i],
        postcode: ['SW1A 1AA', 'M1 1AE', 'B1 1AA', 'L1 BJQ', 'EH1 1YZ', 'CF10 1EP'][i],
        status: activeTab === 'all' ? ['Featured', 'Pending', 'Pending', 'Live', 'Live', 'Banned'][i] : 'Pending',
    }));

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Listings Management</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Review, approve, and feature provider and brand listings.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-4 bg-btn-primary text-white text-sm sm:text-base font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                        <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="hidden sm:inline">Export CSV</span>
                        <span className="sm:hidden">Export</span>
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-gray-200 mb-6 pb-0">
                        {['all', 'featured', 'pending', 'live', 'banned'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === tab
                                        ? 'text-[#117b73] border-b-2 border-[#117b73]'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Filters & Search */}
                    <ListingsFilterSection />

                    {/* Table */}
                    <ListingsTable data={listingsData} activeTab={activeTab} />

                    {/* Pagination */}
                    <ListingsPaginationSection />

                </div>
            </div>
        </div>
    );
};

export default ListingsManagement;
