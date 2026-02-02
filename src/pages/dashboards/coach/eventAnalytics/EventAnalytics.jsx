import React, { useState } from 'react';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import { Eye } from 'lucide-react';

const EventAnalytics = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 6;

    const tabs = [
        { id: 'all', label: 'All Event List' },
        { id: 'complete', label: 'Complete Event' },
        { id: 'upcoming', label: 'Upcoming Event' },
        { id: 'pending', label: 'Pending Event' },
        { id: 'cancel', label: 'Cancel Event' },
    ];

    // Sample data
    const allEvents = [
        {
            title: "Women's Football Trial",
            type: 'Trial',
            organizer: 'Surrey Lions FC',
            sport: 'Football',
            date: '12 Mar 26',
            status: 'Approved',
            joined: 100,
        },
        {
            title: 'Girls Cricket Camp',
            type: 'Training',
            organizer: 'London Warriors',
            sport: 'Cricket',
            date: '12 Mar 26',
            status: 'Pending',
            joined: 200,
        },
        {
            title: 'Women Physio Workshop',
            type: 'Workshop',
            organizer: 'FitHeal Clinic',
            sport: 'Football',
            date: '12 Mar 26',
            status: 'Approved',
            joined: 300,
        },
        {
            title: 'Netball Skills Day',
            type: 'Training',
            organizer: 'Queens Netball',
            sport: 'Netball',
            date: '12 Mar 26',
            status: 'Cancelled',
            joined: 400,
        },
        {
            title: 'Mental Health Session',
            type: 'Workshop',
            organizer: 'MindStrong',
            sport: 'Multi',
            date: '12 Mar 26',
            status: 'Approved',
            joined: 500,
        },
        {
            title: 'Netball Skills Day',
            type: 'Training',
            organizer: 'Queens Netball',
            sport: 'Football',
            date: '12 Mar 26',
            status: 'Pending',
            joined: 600,
        },
    ];

    const columns = ['Event Title', 'Type', 'Organizer', 'Sport', 'Date', 'Status', 'Joined', 'Action'];

    const filteredEvents = allEvents; // Filter based on activeTab if needed
    const totalResults = filteredEvents.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCurrentPage(1); // Reset to first page when tab changes
    };

    const renderRow = (event, index) => {
        const getStatusStyle = (status) => {
            const statusLower = status.toLowerCase();
            if (statusLower === 'approved') {
                return ' text-[#0F766E] ';
            } else if (statusLower === 'pending') {
                return 'text-[#FF7700] ';
            } else if (statusLower === 'cancelled') {
                return ' text-red-600 ';
            }
            return ' text-gray-600 ';
        };

        return (
            <>
                <td className="px-4 py-4">
                    <div className="text-cardTitle font-medium">{event.title}</div>
                </td>
                <td className="px-4 py-4 text-cardTitle">{event.type}</td>
                <td className="px-4 py-4 text-cardTitle">{event.organizer}</td>
                <td className="px-4 py-4 text-cardTitle">{event.sport}</td>
                <td className="px-4 py-4 text-cardTitle">{event.date}</td>
                <td className="px-4 py-4">
                    <span className={`rounded-md px-3 py-1 text-sm font-medium ${getStatusStyle(event.status)}`}>
                        {event.status}
                    </span>
                </td>
                <td className="px-4 py-4">
                    <span className="text-btn-primary font-medium">{event.joined}</span>
                </td>
                <td className="px-4 py-4">
                    <button className="text-gray-600 hover:text-btn-primary transition-colors">
                        <Eye className="w-5 h-5" />
                    </button>
                </td>
            </>
        );
    };

    return (
        <div className="dashboardPy dashboardSpaceY">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8 px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`py-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                ? 'text-btn-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-btn-primary"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Details Section */}
            <div className="
      ">
                <div className=" py-4 ">
                    <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                </div>

                {/* Table */}
                <Table columns={columns} data={paginatedEvents} renderRow={renderRow} />

                {/* Pagination */}
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default EventAnalytics;