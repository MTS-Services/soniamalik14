import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import SectionHeader from '../../../components/ui/SectionHeader';
import { Search } from 'lucide-react';
import EventFilters from './components/EventFilters';
import EventCard from './components/EventCard';
import Pagination from '../../../components/ui/Pagination';

const sampleEvents = new Array(12).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Women’s Football Friendly Match Day`,
    date: '4 Dec 2025',
    location: '1901 Thornridge Cir. Shiloh',
    tag: 'Tournament',
    image: '/images/login/image_1.jpg',
}));

const EventView = () => {
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const perPage = 9;

    const total = Math.ceil(sampleEvents.length / perPage);

    const paged = sampleEvents.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Container>
                <div className="flex items-start justify-between gap-6">
                </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 lg:mb-6">
                        <SectionHeader title="Football Events for Women" description="Discover upcoming matches, trials, tournaments, and community events." align="left" />
                        <div className="w-1/3 hidden lg:block" />
                    </div>

                    {/* Mobile search + filter row */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center bg-white rounded-lg px-3 sm:px-4 py-2.5 border border-[#5EA39E] flex-1">
                            <Search className="w-4 h-4 text-[#5EA39E] shrink-0" />
                            <input type="search" placeholder="Search by event name or location" className="ml-2 w-full outline-none text-sm text-gray-700 placeholder-[#747474]" />
                        </div>
                        <button onClick={() => setShowFilters(true)} className="bg-white border border-gray-200 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none">
                                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M10 19h4"/>
                            </svg>
                        </button>
                    </div>

                    {/* Filter modal for mobile */}
                    {showFilters && (
                        <div className="fixed inset-0 z-50 flex items-center lg:items-center justify-center">
                            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
                            <div className="relative lg:w-full w-11/12 max-w-lg bg-white rounded-lg  p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold">Filters</h4>
                                    <button onClick={() => setShowFilters(false)} className="text-gray-600">✕</button>
                                </div>
                                <div>
                                    <EventFilters />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="hidden lg:block lg:col-span-1">
                        <EventFilters />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
                            {paged.map((e) => (
                                <EventCard key={e.id} event={e} />
                            ))}
                        </div>

                        <div className="mt-6">
                            <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EventView;