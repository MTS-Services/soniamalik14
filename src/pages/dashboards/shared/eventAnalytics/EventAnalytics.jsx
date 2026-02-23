


import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchEventAnalytics } from '../../../../features/events/eventsAPI';
import { selectEventAnalytics, selectAnalyticsLoading, selectAnalyticsError } from '../../../../features/events/eventsSlice';

const EventAnalytics = ({ baseRoute = '/coach' }) => {
    const dispatch = useDispatch();
    const allEvents = useSelector(selectEventAnalytics);
    const loading = useSelector(selectAnalyticsLoading);
    const error = useSelector(selectAnalyticsError);

    // Temporary demo data when analytics from API is empty
    const demoEvents = [
        { id: 'demo-1', title: 'Community Football', type: 'Tournament', organizer: 'Local Club', sport: 'Football', date: '2026-02-10', status: 'Approved', joined: 24, isComplete: true, isUpcoming: false, isPending: false, isCancelled: false },
        { id: 'demo-2', title: 'Morning Yoga', type: 'Class', organizer: 'Wellness Center', sport: 'Yoga', date: '2026-03-05', status: 'Pending', joined: 12, isComplete: false, isUpcoming: true, isPending: true, isCancelled: false },
        { id: 'demo-3', title: 'City Marathon', type: 'Race', organizer: 'City Sports', sport: 'Running', date: '2026-04-20', status: 'Approved', joined: 130, isComplete: false, isUpcoming: true, isPending: false, isCancelled: false },
        { id: 'demo-4', title: 'Swimming Gala', type: 'Meet', organizer: 'Aquatics Club', sport: 'Swimming', date: '2026-01-18', status: 'Cancelled', joined: 0, isComplete: false, isUpcoming: false, isPending: false, isCancelled: true },
        { id: 'demo-5', title: 'Junior Tennis', type: 'Training', organizer: 'Tennis Academy', sport: 'Tennis', date: '2026-02-02', status: 'Approved', joined: 18, isComplete: true, isUpcoming: false, isPending: false, isCancelled: false },
        { id: 'demo-6', title: 'Basketball Pickup', type: 'Pickup', organizer: 'Community Center', sport: 'Basketball', date: '2026-03-12', status: 'Pending', joined: 9, isComplete: false, isUpcoming: true, isPending: true, isCancelled: false },
    ];

    const eventsSource = Array.isArray(allEvents) && allEvents.length > 0 ? allEvents : demoEvents;
    const usingDemo = !(Array.isArray(allEvents) && allEvents.length > 0);

    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 6;

    const scrollContainerRef = useRef(null);
    const activeTabRef = useRef(null);

    const tabs = [
        { id: 'all', label: 'All Event List' },
        { id: 'complete', label: 'Complete Event' },
        { id: 'upcoming', label: 'Upcoming Event' },
        { id: 'pending', label: 'Pending Event' },
        { id: 'cancel', label: 'Cancel Event' },
    ];

    useEffect(() => {
        dispatch(fetchEventAnalytics());
    }, [dispatch]);

    //  Effect to center the active tab whenever it changes
    useEffect(() => {
        if (activeTabRef.current) {
            activeTabRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [activeTab]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 150 : scrollLeft + 150;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const columns = ['Event Title', 'Type', 'Organizer', 'Sport', 'Date', 'Status', 'Joined', 'Action'];

    const filteredEvents = eventsSource.filter(event => {
        if (activeTab === 'all') return true;
        if (activeTab === 'complete') return event.isComplete;
        if (activeTab === 'upcoming') return event.isUpcoming;
        if (activeTab === 'pending') return event.isPending;
        if (activeTab === 'cancel') return event.isCancelled;
        return true;
    });

    const totalResults = filteredEvents.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCurrentPage(1);
    };

    const renderRow = (event) => {
        const getStatusStyle = (status) => {
            const s = status.toLowerCase();
            if (s === 'approved') return ' text-[#0F766E] ';
            if (s === 'pending') return 'text-[#FF7700] ';
            if (s === 'cancelled') return ' text-red-600 ';
            return ' text-gray-600 ';
        };

        const formattedDate = event.date && event.date.includes('-')
            ? new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
            : event.date;

        return (
            <>
                <td className="px-4 py-4"><div className="text-cardTitle font-medium">{event.title}</div></td>
                <td className="px-4 py-4 text-cardTitle">{event.type}</td>
                <td className="px-4 py-4 text-cardTitle">{event.organizer}</td>
                <td className="px-4 py-4 text-cardTitle">{event.sport}</td>
                <td className="px-4 py-4 text-cardTitle">{formattedDate}</td>
                <td className="px-4 py-4">
                    <span className={`rounded-md px-3 py-1 text-base font-medium ${getStatusStyle(event.status)}`}>
                        {event.status}
                    </span>
                </td>
                <td className="px-4 py-4"><span className="text-btn-primary font-medium">{event.joined}</span></td>
                <td className="px-4 py-4">
                    <Link to={`${baseRoute}/event-analytics/event/${event.id}`} state={{ item: event, from: 'analytics' }} className="text-gray-600 hover:text-btn-primary transition-colors inline-flex items-center">
                        <Eye className="w-5 h-5" />
                    </Link>
                </td>
            </>
        );
    };

    return (
        <div className="dashboardPy dashboardSpaceY">
            <div className="relative border-b border-gray-200 group">
                <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-1 shadow-sm rounded-full md:hidden">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 px-10 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            ref={activeTab === tab.id ? activeTabRef : null} // Assign ref to the active button
                            onClick={() => handleTabChange(tab.id)}
                            className={`py-4 text-base font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id
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

                <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-1 shadow-sm rounded-full md:hidden">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="">

                {loading && <div className="text-center py-8 text-gray-600">Loading analytics...</div>}
                {error && (
                    <div className="text-center py-8 text-red-600">
                        Error: {typeof error === 'string' ? error : (error && (error.message || JSON.stringify(error)))}
                    </div>
                )}
                {!loading && !error && (
                    <>
                        <Table columns={columns} data={paginatedEvents} renderRow={renderRow} />
                        <TablePagination currentPage={currentPage} totalPages={totalPages} totalResults={totalResults} resultsPerPage={resultsPerPage} onPageChange={handlePageChange} />
                    </>
                )}
            </div>
        </div>
    );
};

export default EventAnalytics;