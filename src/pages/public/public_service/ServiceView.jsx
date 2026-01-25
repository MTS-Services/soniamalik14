import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import DiscoverCard from '../public_discover/components/DiscoverCard';
import ServiceFilters from './components/ServiceFilters';
import Pagination from '../../../components/ui/Pagination';

const sample = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: ['Home Physiotherapy', 'Nutrition Consultation', 'CBT Mental Health Support'][i % 3],
    type: ['Physios', 'Nutrition', 'Mental Health'][i % 3],
    day: 'Mon - Fri',
    time: '09:00 - 17:00',
    location: 'Local provider — contact for details',
    summary: 'Login to see contact details & pricing',
    image: ['/player1.png', '/player2.png', '/player3.jpg'][i % 3],
}));

const ServiceView = () => {
    const [filter, setFilter] = useState('All');
    const [page, setPage] = useState(1);

    const filtered = sample.filter((s) => filter === 'All' || s.type.toLowerCase() === filter.toLowerCase());

    return (
        <section className="py-6 md:py-8 lg:py-12">
            <Container>
                <div className="mb-6">
                    <PageHeader title="Find Expert Services" description="Browse vetted local professionals and services." />
                </div>

                <div className="mb-6">
                    <ServiceFilters onFilter={(t) => setFilter(t)} active={filter} />
                </div>

                {filtered.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((item) => (
                                <DiscoverCard key={item.id} item={item} />
                            ))}
                        </div>

                        <Pagination page={page} total={5} onChange={(p) => setPage(p)} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="text-center">
                            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-[#282828] mb-2">No Services Found</h3>
                            <p className="text-[#363636] text-sm mb-4">
                                We couldn't find any {filter !== 'All' ? filter.toLowerCase() : 'services'} matching your search.
                            </p>
                            <button
                                onClick={() => setFilter('All')}
                                className="text-btn-primary hover:text-[#0d655d] font-medium text-sm"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default ServiceView;