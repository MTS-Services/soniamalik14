import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../../components/ui/PageHeader';
import EventCard from '../../../../components/ui/EventCard';
import Pagination from '../../../../components/ui/Pagination';
import EventModal from '../../../../components/ui/EventModal';
import { fetchEvents } from '../../../../features/events/eventsAPI';
import { selectAllEvents, selectEventsLoading, selectEventsError } from '../../../../features/events/eventsSlice';

const Event = ({ filterComponent: FilterComponent, detailsRoute = '/coach/event' }) => {
    const dispatch = useDispatch();
    const events = useSelector(selectAllEvents);
    const loading = useSelector(selectEventsLoading);
    const error = useSelector(selectEventsError);

    // Fetch events on component mount
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({ status: 'All', query: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const perPage = 9;

    const handleEdit = (item) => {
        console.log('Edit', item);

    };

    const handleDelete = (item) => {
        console.log('Delete', item);

    };

    const applyFilters = (list) => {
        const q = (filter.query || '').trim().toLowerCase();
        return list.filter((ev) => {
            const matchesStatus = filter.status === 'All' || ev.status === filter.status;
            const matchesQuery = !q || (ev.title && ev.title.toLowerCase().includes(q)) || (ev.location && ev.location.toLowerCase().includes(q));
            return matchesStatus && matchesQuery;
        });
    };

    const filtered = applyFilters(events);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        // reset to first page when filter changes
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(1);
    }, [filter]);

    return (
        <div className="dashboardPy dashboardSpaceY">
            <div className='mb-6'>
                <PageHeader title="Create a New Event" description="Host matches, training sessions, trials, and community events for your club." ctaText="Create Event" onCtaClick={() => setIsModalOpen(true)} />
            </div>

            {FilterComponent && (
                <div>
                    <FilterComponent onFilter={(f) => setFilter(f)} />
                </div>
            )}

            <div className="pt-4">
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-600">Loading events...</div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8">
                        <div className="text-red-600">Error: {error}</div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-6 2xl:grid-cols-4">
                            {paged.map((e) => (
                                <EventCard
                                    key={e.id}
                                    item={e}
                                    onEdit={() => handleEdit(e)}
                                    onDelete={() => handleDelete(e)}
                                    detailsRoute={detailsRoute}
                                />
                            ))}
                        </div>
                        <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
                    </>
                )}
            </div>

            <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Event;
