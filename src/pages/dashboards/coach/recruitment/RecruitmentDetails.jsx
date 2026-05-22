import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GET } from '../../../../services/httpMethods';
import { ENDPOINT } from '../../../../services/httpEndpoint';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

import HeroBanner from './components/HeroBanner';
import TitleCoachInfo from './components/TitleCoachInfo';
import SessionDetailsCard from './components/SessionDetailsCard';
import SessionOverview from './components/SessionOverview';
import VenueInformation from './components/VenueInformation';
import ContactOrganiser from './components/ContactOrganiser';
import BookingsTable from './components/BookingsTable';
import RegisteredInterestTable from './components/RegisteredInterestTable';
import EnquiriesTable from './components/EnquiriesTable';

const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null) return [];
    const text = String(value).trim();
    if (!text) return [];
    if (text.startsWith('[') && text.endsWith(']')) {
        try {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) return parsed;
        } catch {
            // Fall back to comma split.
        }
    }
    return text.split(',').map((part) => part.trim()).filter(Boolean);
};

const mapServiceToDetailsItem = (service) => ({
    id: service?.id,
    title: service?.listingHeadline || service?.organizationName || service?.providerName || 'Untitled Service',
    coach: service?.provider?.name || service?.contactName || service?.providerName || 'N/A',
    headCoach: service?.provider?.name || service?.contactName || service?.providerName || 'N/A',
    avatar: service?.provider?.avatar || null,
    image: service?.logo || service?.image || null,
    about: service?.aboutService || service?.description || '',
    description: service?.description || service?.aboutService || '',
    sport: Array.isArray(service?.sports) ? service.sports.join(', ') : service?.sports || 'N/A',
    sportType: Array.isArray(service?.sports) ? service.sports.join(', ') : service?.sports || 'N/A',
    sessionFormat: Array.isArray(service?.sessionTypes)
        ? service.sessionTypes.join(', ')
        : service?.sessionTypes || service?.sessionType || 'N/A',
    type: Array.isArray(service?.sessionTypes)
        ? service.sessionTypes.join(', ')
        : service?.sessionTypes || service?.sessionType || 'N/A',
    skillLevel: service?.role || (Array.isArray(service?.providerType) ? service.providerType.join(', ') : service?.providerType) || 'N/A',
    suitableFor: toArray(service?.suitableFor),
    venueName: service?.clinicName || 'N/A',
    location: service?.location || service?.fullAddress || 'N/A',
    googleMapLink: service?.googleMapLink || '',
    postcode: service?.postcode || 'N/A',
    town: service?.city || 'N/A',
    typicalSessionDays: service?.sessonDay || (Array.isArray(service?.availableDays) ? service.availableDays.join(', ') : service?.availableDays) || 'N/A',
    day: service?.sessonDay || 'N/A',
    sessionTime: service?.timeSlote || 'N/A',
    time: service?.timeSlote || 'N/A',
    bookingLink: service?.bookingLink || '',
});

const RecruitmentDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [item, setItem] = useState(state?.item || null);
    const [bookingsData, setBookingsData] = useState([]);
    const [interestsData, setInterestsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const loadServiceDetails = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await GET(ENDPOINT.SERVICES.DETAIL(id));
                const payload = response?.data || response;
                const service = payload?.data?.service || payload?.service || payload?.data || null;

                if (!active) return;

                if (!service || !service?.id) {
                    setItem(null);
                    setError('Service not found.');
                    return;
                }

                setItem(mapServiceToDetailsItem(service));

                try {
                    const bookingsResponse = await GET(ENDPOINT.SERVICES.BOOKINGS(id));
                    const bookingsPayload = bookingsResponse?.data || bookingsResponse;
                    const bookings = bookingsPayload?.data?.bookings || bookingsPayload?.bookings || [];

                    const mappedBookings = (Array.isArray(bookings) ? bookings : []).map((booking, index) => ({
                        id: booking?.id || `${id}-booking-${index}`,
                        name:
                            booking?.name ||
                            booking?.fullName ||
                            booking?.participantName ||
                            booking?.user?.name ||
                            'N/A',
                        phone:
                            booking?.phone ||
                            booking?.phoneNumber ||
                            booking?.participantPhone ||
                            booking?.user?.phone ||
                            'N/A',
                        email:
                            booking?.email ||
                            booking?.participantEmail ||
                            booking?.user?.email ||
                            'N/A',
                    }));

                    if (!active) return;
                    setBookingsData(mappedBookings);
                } catch {
                    if (!active) return;
                    setBookingsData([]);
                }

                try {
                    const interestsResponse = await GET(ENDPOINT.SERVICES.INTERESTS(id));
                    const interestsPayload = interestsResponse?.data || interestsResponse;
                    const interests = interestsPayload?.data?.interests || interestsPayload?.interests || [];

                    const mappedInterests = (Array.isArray(interests) ? interests : []).map((interest, index) => ({
                        id: interest?.id || `${id}-interest-${index}`,
                        name:
                            interest?.name ||
                            interest?.fullName ||
                            interest?.participantName ||
                            interest?.user?.name ||
                            'N/A',
                        phone:
                            interest?.phone ||
                            interest?.phoneNumber ||
                            interest?.participantPhone ||
                            interest?.user?.phone ||
                            'N/A',
                        email:
                            interest?.email ||
                            interest?.participantEmail ||
                            interest?.user?.email ||
                            'N/A',
                    }));

                    if (!active) return;
                    setInterestsData(mappedInterests);
                } catch {
                    if (!active) return;
                    setInterestsData([]);
                }
            } catch (err) {
                if (!active) return;
                const message = err?.response?.data?.message || err?.message || 'Failed to load service details';
                setError(message);
                setItem(null);
                setBookingsData([]);
                setInterestsData([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        if (!id) {
            setError('Invalid service id.');
            setItem(null);
            setLoading(false);
            return;
        }

        loadServiceDetails();

        return () => {
            active = false;
        };
    }, [id]);

    const backTarget = state?.from === 'recruitment' ? '/coach/recruitment' : '/coach/recruitment';

    const enquiriesData = [
        { name: 'Devon Lane', phone: '(405) 555-0128', email: 'jackson.graham@example.com', msg: 'Aliquam porta nisl dolor, molestie pellentesque elit...', date: '12 Mar 26' },
        { name: 'Marvin McKinney', phone: '(704) 555-0127', email: 'michael.mitc@example.com', msg: 'In a laoreet purus. Integer turpis quam...', date: '12 Mar 26' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner label="" containerClassName="py-0" />
            </div>
        );
    }
    if (error) return <div className="p-8 font-sans text-red-600">Error: {error}</div>;
    if (!item) return <div className="p-8 font-sans">Service not found.</div>;

    return (
        <div className="bg-[#F8FAFB] min-h-screen p-4 md:p-8 text-[#1F2937] font-sans">
            <div className="space-y-8">

                {/* Back Button */}
                <div>
                    <Link to={backTarget} className="inline-flex items-center text-sm font-semibold text-[#0F766E] hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                    </Link>
                </div>

                {/* Hero Banner */}
                <HeroBanner item={item} />

                {/* Title & Coach Info */}
                <TitleCoachInfo item={item} />

                {/* Session Details Card */}
                <SessionDetailsCard item={item} />

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
                    <SessionOverview item={item} disableActions />
                    <VenueInformation item={item} />
                    <ContactOrganiser disabled />
                </div>

                {/* Tables Section */}
                <BookingsTable data={bookingsData} />
                <RegisteredInterestTable data={interestsData} />
                <EnquiriesTable data={enquiriesData} />

            </div>
        </div>
    );
}

export default RecruitmentDetails;