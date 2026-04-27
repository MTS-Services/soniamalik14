import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../../components/ui/PageHeader';
import EventCard from '../../../../components/ui/EventCard';
import Pagination from '../../../../components/ui/Pagination';
import EventModal from '../../../../components/ui/EventModal';
import DeleteConfirmationModal from '../../../../components/ui/DeleteConfirmationModal';
import { useEvent } from '../../../../context/EventContext';
import { Plus } from 'lucide-react';

const Event = ({ filterComponent: FilterComponent, detailsRoute = '/coach/event' }) => {
    const { events, loading, error, fetchEvents, deleteEvent } = useEvent();
    const [searchParams] = useSearchParams();

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(() => {
        // Check URL params for filter values
        const statusParam = searchParams.get('status');
        const queryParam = searchParams.get('query');
        return {
            status: statusParam || 'All',
            query: queryParam || ''
        };
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [modalMode, setModalMode] = useState('create');
    const perPage = 9;

    const handleEdit = (item) => {
        setEditingEvent(item);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDelete = async (item) => {
        setEventToDelete(item);
    };

    const confirmDelete = async () => {
        if (eventToDelete) {
            await deleteEvent(eventToDelete.id);
            setEventToDelete(null);
        }
    };

    const handleCreateNew = () => {
        setEditingEvent(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setModalMode('create');
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
        <div className="dashboardPy dashboardSpaceY ">
            <div className='mb-6'>
             

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-[#0B544E] mb-2">Create a New Event</h1>
            <p className="text-gray-600">Host matches, training sessions, trials, and community events for your club.</p>
            
          </div>
          <div>
            <button
                onClick={handleCreateNew}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0F766E] px-4 py-3 text-base font-medium whitespace-nowrap text-white transition-colors hover:bg-[#0d655d]"
            >
              <Plus className="h-4 w-4 shrink-0" />
              Create Event
            </button>
          </div>
        </div>
            </div>

            {FilterComponent && (
                <div>
                    <FilterComponent
                        onFilter={(f) => setFilter(f)}
                        active={filter.status}
                        initialQuery={filter.query}
                    />
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

                {!loading && !error && paged.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-gray-500 text-lg mb-2">No events found</div>
                        <p className="text-gray-400 text-base">Create your first event to get started!</p>
                    </div>
                )}

                {!loading && !error && paged.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-6 2xl:grid-cols-4">
                            {paged.map((e, idx) => (
                                <EventCard
                                    key={e.id || `event-${idx}`}
                                    item={e}
                                    onEdit={() => handleEdit(e)}
                                    onDelete={() => handleDelete(e)}
                                    detailsRoute={detailsRoute}
                                    filter={filter}
                                />
                            ))}
                        </div>
                        <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
                    </>
                )}
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingEvent}
                mode={modalMode}
            />

            <DeleteConfirmationModal
                isOpen={!!eventToDelete}
                onClose={() => setEventToDelete(null)}
                onConfirm={confirmDelete}
                itemName={eventToDelete?.title || 'this event'}
            />
        </div>
    );
};

export default Event;
