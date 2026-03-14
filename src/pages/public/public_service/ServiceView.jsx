// import React, { useState, useEffect } from 'react';
// import Container from '../../../components/layout/Container';
// import PageHeader from '../../../components/ui/PageHeader';
// import ServiceCard from './components/ServiceCard';
// import ServiceFilters from './components/ServiceFilters';
// import Pagination from '../../../components/ui/Pagination';
// import { useService } from '../../../context/ServiceContext';

// // Service data comes from ServiceContext (approved services)

// const ServiceView = () => {
//     const [filter, setFilter] = useState('All');
//     const [page, setPage] = useState(1);

//     const { approvedServices, loading, error, fetchApprovedServices } = useService();

//     useEffect(() => {
//         // load approved (public) services on mount
//         fetchApprovedServices();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const filtered = (approvedServices || []).filter((s) => {
//         if (filter === 'All') return true;
//         const raw = (s.serviceType || s.type || s.service_type || '').toString();
//         return raw.toLowerCase() === filter.toLowerCase();
//     });

//     return (
//         <section className="py-6 lg:py-8">
//             <Container>
//                 <div className="mb-6">
//                     <PageHeader title="Find Expert Services" description="Browse vetted local professionals and services." />
//                 </div>

//                 <div className="mb-6">
//                     <ServiceFilters onFilter={(t) => setFilter(t)} active={filter} />
//                 </div>

//                 {loading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="text-gray-600">Loading services…</div>
//                     </div>
//                 ) : error ? (
//                     <div className="flex flex-col items-center justify-center py-16 px-4">
//                         <div className="text-center">
//                             <h3 className="text-xl font-semibold text-[#282828] mb-2">Error loading services</h3>
//                             <p className="text-[#363636] text-base mb-4">{error}</p>
//                             <button onClick={() => window.location.reload()} className="text-btn-primary hover:text-[#0d655d] font-medium text-base">Retry</button>
//                         </div>
//                     </div>
//                 ) : filtered.length > 0 ? (
//                     <>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filtered.map((item) => (
//                                 <ServiceCard key={item.id} item={item} />
//                             ))}
//                         </div>

//                         <Pagination page={page} total={5} onChange={(p) => setPage(p)} />
//                     </>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center py-16 px-4">
//                         <div className="text-center">
//                             <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             <h3 className="text-xl font-semibold text-[#282828] mb-2">No Services Found</h3>
//                             <p className="text-[#363636] text-base mb-4">
//                                 We couldn't find any {filter !== 'All' ? filter.toLowerCase() : 'services'} matching your search.
//                             </p>

//                         </div>
//                     </div>
//                 )}
//             </Container>
//         </section>
//     );
// };

// export default ServiceView;




import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import ServiceCard from './components/ServiceCard';
import Pagination from '../../../components/ui/Pagination';
import PageHeader from '../../../components/ui/PageHeader';

// Dummy data replacing the backend fetch
const dummyServices = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: 'Prioritize Your Mind, Transform Your Life',
    description: 'Discover tools, support, and guidance to nurture your mental well-being every day.',
    type: 'Physios',
    sport: 'Football',
    image: 'https://i.ibb.co.com/M5yh8WGJ/0aab4f0cea97648654a2c3fe1dc1dc4751e6d7f7.jpg', // Keeps the gray placeholder look
}));

const ServiceView = () => {
    const [page, setPage] = useState(1);
    const [postcode, setPostcode] = useState('');
    const [distance, setDistance] = useState('');
    const [selectedService, setSelectedService] = useState('All');
    const itemsPerPage = 3;

    // Client-side filtering based on the dummy data
    const filtered = dummyServices.filter((s) => {
        if (selectedService === 'All' || selectedService === '') return true;
        return s.type.toLowerCase() === selectedService.toLowerCase();
    });

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedServices = filtered.slice(startIndex, endIndex);

    return (
        <section className="py-6 lg:py-8 bg-[#F8FAFC] ">
            <Container>
                {/* Header Section */}
                <div className="mb-6">
                    <PageHeader title="Services" description={"Support for your journey - from injury recovery to nutrition guidance. Professionals supporting women at every level."} />
                </div>

                {/* Filter Bar (Matches the design from the image) */}
                <div className="mb-4 bg-[#E7F1F1] p-4 rounded-lg inline-flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                    {/* Postcode/City Input */}
                    <input
                        type="text"
                        placeholder="Enter Postcode/City"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="w-full sm:w-[220px] bg-white border-none text-gray-700 text-base rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-teal-500 shadow-sm placeholder-gray-400"
                    />

                    {/* Distance Dropdown */}
                    <div className="relative w-full sm:w-[140px]">
                        <select
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="appearance-none w-full bg-white border-none text-gray-700 text-base rounded-md px-3 py-3 outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-sm"
                        >
                            <option value="">Distance</option>
                            <option value="5">5 Miles</option>
                            <option value="10">10 Miles</option>
                            <option value="20">20 Miles</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Select Services Dropdown */}
                    <div className="relative w-full sm:w-[180px]">
                        <select
                            value={selectedService}
                            onChange={(e) => { setSelectedService(e.target.value); setPage(1); }}
                            className="appearance-none w-full bg-white border-none text-gray-700 text-base rounded-md px-3 py-3 outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-sm"
                        >
                            <option value="All">Select Services</option>
                            <option value="Physios">Physios</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Mental Health">Mental Health</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                </div>

                {/* Content Grid */}
                {filtered.length > 0 ? (
                    <>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedServices.map((item) => (
                                <ServiceCard key={item.id} item={item} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-4 flex justify-center">
                                <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="text-center">
                            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-[#1A1D1F] mb-2">No Services Found</h3>
                            <p className="text-[#4A5565] text-base mb-4">
                                We couldn't find any {selectedService !== 'All' ? selectedService.toLowerCase() : 'services'} matching your search.
                            </p>
                            <button
                                onClick={() => setSelectedService('All')}
                                className="text-[#147B6B] hover:text-[#0d655d] font-medium text-base transition-colors"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Disclaimer Footer Note */}
                <div className="mt-8 bg-[#EFF5F6] text-[#4A5565] text-base p-4 rounded-lg text-center max-w-xl mx-auto leading-relaxed border border-[#E7F1F1]">
                    Providers listed on ESSA Hub are independent professionals. Members are encouraged to carry out their own checks before engaging services.
                </div>
            </Container>
        </section>
    );
};

export default ServiceView;





