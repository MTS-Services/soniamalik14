
import React, { useState, useEffect } from 'react';
import Container from '../../../components/layout/Container';
import SectionHeader from '../../../components/ui/SectionHeader';
import { Search, X, Filter } from 'lucide-react';
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

    const total = Math.ceil(sampleEvents.length / perPage);
    const paged = sampleEvents.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
            <Container>
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div className="flex-1">
                        <SectionHeader 
                            title="Football Events for Women" 
                            description="Discover upcoming matches, trials, tournaments, and community events." 
                            align="left" 
                        />
                    </div>

                    <div className="w-full lg:w-1/3">
                        {/* Desktop Search */}
                        <div className="hidden lg:flex items-center bg-white rounded-lg px-4 py-2.5 border border-[#5EA39E]">
                            <Search className="w-4 h-4 text-[#5EA39E] shrink-0" />
                            <input
                                type="search"
                                placeholder="Search by event name or location"
                                className="ml-3 w-full outline-none text-sm text-gray-700 placeholder-[#747474]"
                            />
                        </div>

                        {/* Mobile Search & Filter Button */}
                        <div className="lg:hidden flex items-center gap-2 w-full">
                            <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-[#5EA39E] flex-1">
                                <Search className="w-4 h-4 text-[#5EA39E] shrink-0" />
                                <input 
                                    type="search" 
                                    placeholder="Search events..." 
                                    className="ml-2 w-full outline-none text-sm text-gray-700" 
                                />
                            </div>
                            <button 
                                onClick={() => setShowFilters(true)} 
                                className="bg-[#5EA39E] text-white rounded-lg p-2.5 flex items-center justify-center shadow-sm"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
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
                            <div className="flex items-center justify-between p-4 border-b shrink-0">
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
                                    <EventFilters />
                                </div>
                            </div>

                            {/* Fixed Bottom Action Button */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white shrink-0">
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
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28   ">
                            <EventFilters />
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
                        <div className="mt-10 flex justify-center">
                            <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EventView;