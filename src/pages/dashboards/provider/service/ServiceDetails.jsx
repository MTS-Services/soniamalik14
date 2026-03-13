import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GET } from '../../../../services/httpMethods';
import { ENDPOINT } from '../../../../services/httpEndpoint';
import BookingsTable from '../../shared/eventAnalytics/components/BookingsTable';

const ServiceDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadServiceDetail = async () => {
            // Always fetch from API to get full details including bookings
            // The list endpoint only returns _count.bookings, not the actual bookings array
            setLoading(true);
            setError(null);

            try {
                const res = await GET(ENDPOINT.SERVICES.DETAIL(id));

                // Console log the full response
                // eslint-disable-next-line no-console
                console.log('[ServiceDetails] Full API Response:', res);

                let payload = res?.data;

                // eslint-disable-next-line no-console
                console.log('[ServiceDetails] Payload after res?.data:', payload);

                // Store bookings before any extraction
                let bookingsData = null;

                // Check for bookings at each level
                if (payload?.bookings) {
                    bookingsData = payload.bookings;
                    // eslint-disable-next-line no-console
                    console.log('[ServiceDetails] Found bookings at root level:', bookingsData);
                }

                // Handle different response structures
                if (payload && payload.data) {
                    // Check if bookings exist at this level before extracting
                    if (!bookingsData && payload.data.bookings) {
                        bookingsData = payload.data.bookings;
                    }
                    payload = payload.data;
                }

                if (payload && payload.service) {
                    // Check if bookings exist at this level before extracting
                    if (!bookingsData && payload.service.bookings) {
                        bookingsData = payload.service.bookings;
                    }
                    payload = payload.service;
                }

                // Ensure bookings are attached to the final payload
                if (bookingsData && !payload.bookings) {
                    payload.bookings = bookingsData;
                    // eslint-disable-next-line no-console
                    console.log('[ServiceDetails] Attached bookings to payload');
                }

                // eslint-disable-next-line no-console
                console.log('[ServiceDetails] Final payload:', payload);
                // eslint-disable-next-line no-console
                console.log('[ServiceDetails] Final Bookings:', payload?.bookings);

                if (mounted) {
                    setItem(payload || null);
                }
            } catch (err) {
                if (mounted) {
                    setError(err?.response?.data?.message || err.message || 'Failed to load service');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadServiceDetail();

        return () => {
            mounted = false;
        };
    }, [id]);

    const backTarget = state?.from === 'service' ? '/provider/service' : '/provider/service';

    if (loading) return <div className="dashboardPy">Loading service...</div>;
    if (error) return <div className="dashboardPy text-red-600">Error: {error}</div>;
    if (!item) return <div className="dashboardPy">Service not found.</div>;

    return (
        <div className="dashboardPy dashboardSpaceY text-gray-800">
            {/* Back Button */}
            <div className="mb-4">
                <Link to={backTarget} className="inline-flex items-center text-base font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
            </div>

            {/* Hero Image */}
            <div className="w-full h-64 md:h-[620px] relative object-cover rounded-xl overflow-hidden mb-6">
                {item.image && !imageError ? (
                    <img
                        src={item.image}
                        alt={item.name || item.title}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <span>No image</span>
                    </div>
                )}
            </div>

            {/* Service Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {item.name || item.title}
            </h1>

            {/* Metadata Fields */}
            <div className="space-y-3 text-base text-gray-800 mb-8">
                <div>
                    <span className=" block text-gray-900"> <span className='font-semibold'>Category: </span>{item.category || item.type || item.serviceType || 'N/A'}</span>
                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Status: </span>{item.status || 'Active'}</span>
                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Visibility: </span>{item.isApproved ? 'Live' : 'Pending Approval'}</span>
                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Available Days: </span>{item.availableDays || item.days || 'Not specified'}</span>
                </div>
            </div>

            {/* About This Service */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Service</h2>
                <div className="text-base md:w-2xl text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.description || 'No description available.'}
                </div>
            </div>

            {/* Who This Service Is For */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Who This Service Is For</h2>
                {item.whoServiceFor ? (
                    <div className="text-base text-gray-700">{item.whoServiceFor}</div>
                ) : item.whoIsFor && Array.isArray(item.whoIsFor) && item.whoIsFor.length > 0 ? (
                    <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
                        {item.whoIsFor.map((who, idx) => (
                            <li key={idx}>{who}</li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-base text-gray-600">Not specified.</div>
                )}
            </div>

            {/* Bookings Table */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Bookings</h2>
                {/* eslint-disable-next-line no-console */}
                {console.log('[ServiceDetails][RENDER] Full item object:', item)}
                {/* eslint-disable-next-line no-console */}
                {console.log('[ServiceDetails][RENDER] item.bookings:', item.bookings)}
                {/* eslint-disable-next-line no-console */}
                {console.log('[ServiceDetails][RENDER] item.bookings type:', typeof item.bookings)}
                {/* eslint-disable-next-line no-console */}
                {console.log('[ServiceDetails][RENDER] is Array?', Array.isArray(item.bookings))}
                {/* eslint-disable-next-line no-console */}
                {console.log('[ServiceDetails][RENDER] length?', item.bookings?.length)}

                {item.bookings && Array.isArray(item.bookings) && item.bookings.length > 0 ? (
                    <>
                        {/* eslint-disable-next-line no-console */}
                        {console.log('[ServiceDetails][RENDER] Mapped bookings:', item.bookings.map(b => ({
                            name: b.fullName || b.name || 'Guest',
                            phone: b.phoneNumber || b.phone || '-',
                            email: b.email || '-',
                            raw: b
                        })))}
                        <BookingsTable
                            bookings={item.bookings.map(b => ({
                                name: b.fullName || b.name || 'Guest',
                                phone: b.phoneNumber || b.phone || '-',
                                email: b.email || '-',
                            }))}
                            resultsPerPage={6}
                        />
                    </>
                ) : (
                    <>
                        {/* eslint-disable-next-line no-console */}
                        {console.log('[ServiceDetails][RENDER] No bookings - showing empty state')}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <p className="text-gray-500 text-base">No bookings yet.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;
