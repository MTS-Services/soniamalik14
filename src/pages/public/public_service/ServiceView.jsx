import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import ServiceCard from './components/ServiceCard';
import ServiceFilters from './components/ServiceFilters';
import Pagination from '../../../components/ui/Pagination';

const sample = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: ['Home Physiotherapy', 'Nutrition Consultation', 'CBT Mental Health Support', 'Yoga & Meditation'][i % 4],
    type: ['Physios', 'Nutrition', 'Mental Health', 'Wellbeing'][i % 4],
    day: 'Mon - Fri',
    time: '09:00 - 17:00',
    location: 'Local provider â€” contact for details',
    summary: 'Login to see contact details & pricing',
    image: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop', // Physiotherapy
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop', // Nutrition
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop', // Mental Health
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop'  // Wellbeing/Yoga
    ][i % 4],
}));

const ServiceView = () => {
    const [filter, setFilter] = useState('All');
    const [page, setPage] = useState(1);

    const filtered = sample.filter((s) => filter === 'All' || s.type.toLowerCase() === filter.toLowerCase());

    return (
        <section className="py-6 lg:py-8">
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
                                <ServiceCard key={item.id} item={item} />
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
                            <p className="text-[#363636] text-base mb-4">
                                We couldn't find any {filter !== 'All' ? filter.toLowerCase() : 'services'} matching your search.
                            </p>
                            <button
                                onClick={() => setFilter('All')}
                                className="text-btn-primary hover:text-[#0d655d] font-medium text-base"
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