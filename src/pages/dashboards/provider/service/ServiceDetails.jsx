import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { fetchServices } from '../../../../features/service/serviceApi';
import { selectAllServices } from '../../../../features/service/serviceSlice';
import BookingsTable from '../../shared/eventAnalytics/components/BookingsTable';

const ServiceDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();

    const dispatch = useDispatch();
    const servicesList = useSelector(selectAllServices) || [];
    const [item, setItem] = useState(state?.item || null);
    const loading = useSelector((s) => s.service.services.loading);
    const error = useSelector((s) => s.service.services.error);

    useEffect(() => {
        if (servicesList.length === 0) {
            dispatch(fetchServices()).catch(() => { });
        }
    }, [dispatch, servicesList.length]);

    useEffect(() => {
        if (state?.item) {
            setItem(state.item);
        } else if (servicesList.length > 0) {
            const found = servicesList.find(s => String(s.id) === String(id));
            setItem(found || null);
        }
    }, [state, id, servicesList]);

    const backTarget = state?.from === 'service' ? '/provider/service' : '/provider/service';

    // Fallback data
    const fallbackService = {
        id,
        name: 'Women\'s Sports Physio',
        type: 'Physio',
        phone: '(201) 555-0101',
        image: 'https://i.ibb.co.com/gFM5hXZb/Rectangle-2324.png',
        tag: 'Physios',
        title: 'Women\'s Sports Physio',
        location: 'Dhaka',
        days: 'Monday, Wednesday, Friday',
        time: '4:00 PM – 8:00 PM',
        category: 'Physio',
        status: 'Active',
        visibility: 'Live for women athletes',
        availableDays: 'Monday, Wednesday, Friday',
        timeSlots: '4:00 PM - 8:00 PM',
        description: `This physiotherapy service is designed specifically for women athletes who play sports like cricket, football, futsal and other physical games.

It helps prevent injuries, improve performance, and support recovery so players can stay fit and confident.`,
        whoIsFor: [
            'Women athletes',
            'Age 16+',
            'All skill levels',
            'Players from cricket, football, futsal, badminton and more'
        ],
        sessions: [
            { id: 's1', user: 'Darlene Robertson', service: 'Physio', date: 'Jan 10', status: 'Completed' },
            { id: 's2', user: 'Jane Cooper', service: 'Physio', date: 'Jan 10', status: 'Upcoming' },
            { id: 's3', user: 'Savannah Nguyen', service: 'Physio', date: 'Jan 10', status: 'Completed' }
        ]
    };

    const service = item || fallbackService;

    if (loading) return <div className="dashboardPy">Loading service...</div>;
    if (error) return <div className="dashboardPy text-red-600">Error: {error}</div>;
    if (!service) return <div className="dashboardPy">Service not found.</div>;

    return (
        <div className="dashboardPy dashboardSpaceY text-gray-800">
            {/* Back Button */}
            <div className="mb-4">
                <Link to={backTarget} className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
            </div>

            {/* Hero Image */}
            <div className="w-full h-64 md:h-[620px] relative object-cover rounded-xl overflow-hidden mb-6">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Service Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {service.name || service.title}
            </h1>

            {/* Metadata Fields */}
            <div className="space-y-3 text-base text-gray-800 mb-8">
                <div>
                    <span className=" block text-gray-900"> <span className='font-semibold'>Category: </span>{service.category || service.type}</span>

                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Status:</span>{service.status || 'Active'}</span>

                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Visibility:</span>{service.visibility || 'Live for women athletes'}</span>

                </div>
                <div>
                    <span className=" block text-gray-900"><span className='font-semibold'>Available Days:</span>{service.availableDays || service.days}</span>
                </div>
                
            </div>

            {/* About This Service */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Service</h2>
                <div className="text-base md:w-2xl text-gray-600 leading-relaxed whitespace-pre-line">
                    {service.description || 'This service provides professional support for women athletes.'}
                </div>
            </div>

            {/* Who This Service Is For */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Who This Service Is For</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {(service.whoIsFor || []).map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Active Sessions / Bookings Table */}
            <div className="mb-8">

                
                <BookingsTable
                    bookings={(service.sessions || []).map(s => ({
                        name: s.user || s.name || 'Guest',
                        phone: s.phone || s.contact || '-',
                        email: s.email || s.contactEmail || '-',
                    }))}
                    resultsPerPage={6}
                />
            </div>
        </div>
    );
};

export default ServiceDetails;
