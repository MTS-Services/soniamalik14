import React, { useState, useMemo } from 'react';
import HeaderSection from './components/HeaderSection';
import SearchAndFilters from './components/SearchAndFilters';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import EmptyStateRow from './components/EmptyStateRow';
import Pagination from './components/Pagination';

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

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">

                {/* Header Section */}
                <HeaderSection />

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    {/* Search and Filters */}
                    <SearchAndFilters
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedSport={selectedSport}
                        setSelectedSport={setSelectedSport}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        uniqueSports={uniqueSports}
                        uniqueStatuses={uniqueStatuses}
                    />

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <TableHeader />
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <TableRow key={row.id} row={row} />
                                    ))
                                ) : (
                                    <EmptyStateRow />
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination filteredDataLength={filteredData.length} />

                </div>
            </div>
        </div>
    );
};

export default ListingsManagement;