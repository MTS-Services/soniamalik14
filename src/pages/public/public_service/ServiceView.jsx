import React, { useState, useEffect } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import ServiceCard from './components/ServiceCard';
import ServiceFilters from './components/ServiceFilters';
import Pagination from '../../../components/ui/Pagination';
import { useService } from '../../../context/ServiceContext';

// Service data comes from ServiceContext (approved services)

const ServiceView = () => {
    const [filter, setFilter] = useState('All');
    const [page, setPage] = useState(1);

    const { approvedServices, loading, error, fetchApprovedServices } = useService();

    useEffect(() => {
        // load approved (public) services on mount
        fetchApprovedServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = (approvedServices || []).filter((s) => {
        if (filter === 'All') return true;
        const raw = (s.serviceType || s.type || s.service_type || '').toString();
        return raw.toLowerCase() === filter.toLowerCase();
    });

    return (
        <section className="py-6 lg:py-8">
            <Container>
                <div className="mb-6">
                    <PageHeader title="Find Expert Services" description="Browse vetted local professionals and services." />
                </div>

                <div className="mb-6">
                    <ServiceFilters onFilter={(t) => setFilter(t)} active={filter} />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-gray-600">Loading services…</div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-[#282828] mb-2">Error loading services</h3>
                            <p className="text-[#363636] text-base mb-4">{error}</p>
                            <button onClick={() => window.location.reload()} className="text-btn-primary hover:text-[#0d655d] font-medium text-base">Retry</button>
                        </div>
                    </div>
                ) : filtered.length > 0 ? (
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
                           
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default ServiceView;