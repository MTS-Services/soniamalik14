import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchEventAnalytics } from '../../../../features/events/eventsAPI';
import { selectEventAnalytics, selectAnalyticsLoading, selectAnalyticsError } from '../../../../features/events/eventsSlice';

const EventAnalytics = ({ baseRoute = '/coach' }) => {
    const dispatch = useDispatch();
    const allEvents = useSelector(selectEventAnalytics);
    const loading = useSelector(selectAnalyticsLoading);
    const error = useSelector(selectAnalyticsError);

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

    // Fetch event analytics on component mount
    useEffect(() => {
        dispatch(fetchEventAnalytics());
    }, [dispatch]);

    const columns = ['Event Title', 'Type', 'Organizer', 'Sport', 'Date', 'Status', 'Joined', 'Action'];

    // Filter based on activeTab
    const filteredEvents = allEvents.filter(event => {
        if (activeTab === 'all') return true;
        if (activeTab === 'complete') return event.isComplete;
        if (activeTab === 'upcoming') return event.isUpcoming;
        if (activeTab === 'pending') return event.isPending;
        if (activeTab === 'cancel') return event.isCancelled;
        return true;
    });
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

    const renderRow = (event) => {
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

        // Format date if it's in ISO format
        const formattedDate = event.date && event.date.includes('-')
            ? new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
            : event.date;

        return (
            <>
                <td className="px-4 py-4">
                    <div className="text-cardTitle font-medium">{event.title}</div>
                </td>
                <td className="px-4 py-4 text-cardTitle">{event.type}</td>
                <td className="px-4 py-4 text-cardTitle">{event.organizer}</td>
                <td className="px-4 py-4 text-cardTitle">{event.sport}</td>
                <td className="px-4 py-4 text-cardTitle">{formattedDate}</td>
                <td className="px-4 py-4">
                    <span className={`rounded-md px-3 py-1 text-sm font-medium ${getStatusStyle(event.status)}`}>
                        {event.status}
                    </span>
                </td>
                <td className="px-4 py-4">
                    <span className="text-btn-primary font-medium">{event.joined}</span>
                </td>
                <td className="px-4 py-4">
                    <Link
                        to={`${baseRoute}/event/${event.id}`}
                        state={{ item: event, from: 'analytics' }}
                        className="text-gray-600 hover:text-btn-primary transition-colors inline-flex items-center"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
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
            <div className="">
                <div className="py-4">
                    <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-600">Loading analytics...</div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8">
                        <div className="text-red-600">Error: {error}</div>
                    </div>
                )}

                {!loading && !error && (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default EventAnalytics;
