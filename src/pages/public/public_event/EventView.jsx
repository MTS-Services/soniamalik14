import React, { useState, useEffect } from 'react';
import Container from '../../../components/layout/Container';
import { Search, X, Filter } from 'lucide-react';
import EventFilters from './components/EventFilters';
import EventCard from './components/EventCard';
import Pagination from '../../../components/ui/Pagination';

const sampleEvents = new Array(12).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Womens Football Friendly Match Day`,
    date: '4 Dec 2025',
    location: '1901 Thornridge Cir. Shiloh',
    tag: 'Tournament',
    image: '/images/login/image_1.jpg',
}));

const EventView = () => {
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        city: '',
        eventTypes: [],
        date: [],
        sport: '',
    });
    const perPage = 9;

    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilters]);

    // apply simple client-side filtering
    const filtered = sampleEvents.filter((e) => {
        // city / search
        if (filters.city) {
            const q = filters.city.toLowerCase();
            if (!((e.title || '').toLowerCase().includes(q) || (e.location || '').toLowerCase().includes(q))) return false;
        }

        // event type
        const types = filters.eventTypes || [];
        if (types.length > 0 && !types.includes('All events')) {
            const tag = (e.tag || '').toLowerCase();
            const matched = types.some((t) => {
                const key = t.toLowerCase();
                return tag.includes(key.split(' ')[0]) || key.includes(tag);
            });
            if (!matched) return false;
        }

        // sport
        if (filters.sport) {
            if ((e.sport || '') !== filters.sport) return false;
        }

        return true;
    });

    const total = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className=" py-6 lg:py-10 bg-[#F8FAFC] ">
            <Container>
                {/* Custom Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">

                    <h1 className="text-3xl lg:text-[40px] font-semibold text-subtitle">
                        Women-focused events and workshops
                    </h1>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-[550px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="search"
                                placeholder="Search by event name or location"
                                value={filters.city}
                                onChange={(e) => { setFilters({ ...filters, city: e.target.value }); setPage(1); }}
                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5EA39E] focus:border-[#5EA39E] text-[14px] text-gray-800 placeholder-gray-400 shadow-sm transition-shadow"
                            />
                        </div>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden bg-[#5EA39E] text-white rounded-md p-2.5 flex items-center justify-center shrink-0 shadow-sm"
                        >
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Filter Side-Drawer */}
                {showFilters && (
                    <div
                        className="fixed inset-0 z-[100] lg:hidden flex justify-end"
                        onWheel={(e) => e.stopPropagation()} // Stop scroll leakage
                    >
                        {/* Overlay Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowFilters(false)}
                        />

                        {/* Drawer Content */}
                        <div
                            className="relative h-full w-[85%] max-w-sm bg-white shadow-xl flex flex-col"
                            onClick={(e) => e.stopPropagation()} // Stop click through to backdrop
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
                                <h4 className="font-bold text-lg text-gray-900">Filters</h4>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Scrollable Filters Body */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                                <div className="pb-24"> {/* Extra padding bottom for the fixed button gap */}
                                    <EventFilters filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
                                </div>
                            </div>

                            {/* Fixed Bottom Action Button */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white shrink-0">
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="w-full bg-[#5EA39E] text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                                >
                                    Show Results
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:col-span-1 ">
                        <div className="sticky top-44">
                            <EventFilters filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
                        </div>
                    </aside>

                    {/* Main Events List */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {paged.map((e) => (
                                <EventCard key={e.id} event={e} />
                            ))}
                        </div>

                        {/* Pagination Area */}
                        {filtered.length === 0 ? (
                            <div className="mt-10 text-center text-gray-600 bg-white border border-dashed border-gray-200 p-6 rounded-md">
                                No events match your filters yet — try widening your search or exploring all events.
                            </div>
                        ) : (
                            <div className="mt-10 flex justify-center">
                                <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EventView;