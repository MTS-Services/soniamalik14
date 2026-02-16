
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Calendar, Clock, Phone, Mail, ArrowLeft } from 'lucide-react';
import HeroImage from './components/HeroImage';
import EventInfo from './components/EventInfo';
import VenueCard from './components/VenueCard';
import CancelAlert from './components/CancelAlert';
import { fetchEvents } from '../../../../features/events/eventsAPI';
import { selectAllEvents } from '../../../../features/events/eventsSlice';
import BookingsTable from './components/BookingsTable';

const EventAnallyticsDetails = ({ backRoute = '/coach/event' }) => {
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;

    // We'll try to use the passed state item first; if it lacks details, try to load from Redux store by id.
    const dispatch = useDispatch();
    const eventsList = useSelector(selectAllEvents) || [];
    const [itemData, setItemData] = useState(state?.item || null);
    const [loading, setLoading] = useState(false);

    // Sample bookings data for the table (replace with real API data when available)
    const sampleBookings = [
        { name: 'Marvin McKinney', phone: '(319) 555-0115', email: 'willie.jennings@example.com' },
        { name: 'Eleanor Pena', phone: '(702) 555-0122', email: 'jessica.hanson@example.com' },
        { name: 'Jacob Jones', phone: '(302) 555-0107', email: 'alma.lawson@example.com' },
        { name: 'Annette Black', phone: '(684) 555-0102', email: 'nathan.roberts@example.com' },
        { name: 'Dianne Russell', phone: '(316) 555-0116', email: 'dolores.chambers@example.com' },
        { name: 'Albert Flores', phone: '(405) 555-0128', email: 'jackson.graham@example.com' },
    ];

    const [bookings] = useState(sampleBookings);
    const resultsPerPage = 6;

    const fallback = {
        id,
        title: "Women's Open Football Training Camp",
        image: 'https://i.ibb.co/bjNWBQ7y/Frame-2147226117.png',
        description:
            'This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment. \n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.',
        date: 'Saturday, 12 October 2025',
        time: '4:00 PM – 7:00 PM',
        ageGroup: '16+ Years',
        sportType: 'Cricket',
        skillLevel: 'Beginner to Intermediate',
        lastDateToRegister: '8 October 2025',
        venue: {
            name: 'City Sports Ground',
            address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        },
        contact: {
            phone: '(406) 555-0120',
            email: 'nevaeh.simmons@example.com',
        },
        organizer: {
            name: 'Rising Queens Football Academy',
            avatar: 'https://ui-avatars.com/api/?name=Rising+Queens&background=0D8ABC&color=fff', // Placeholder logo
        },
    };

    // If the passed state item doesn't include full details (e.g., no description), try to find in store or fetch
    useEffect(() => {
        const hasFull = (obj) => obj && (obj.description || obj.time || obj.venue);

        if (state?.item && hasFull(state.item)) {
            setItemData(state.item);
            return;
        }

        // try to find in store
        const found = eventsList.find((e) => String(e.id) === String(id));
        if (found) {
            setItemData(found);
            return;
        }

        // otherwise dispatch fetch and wait
        const load = async () => {
            setLoading(true);
            try {
                await dispatch(fetchEvents());
            } finally {
                setLoading(false);
            }
        };

        if (eventsList.length === 0) {
            load();
        }
    }, [state, eventsList, id, dispatch]);

    // if events list updates (after fetch) and itemData still empty, try to pick up the item
    useEffect(() => {
        if (!itemData) {
            const found = eventsList.find((e) => String(e.id) === String(id));
            if (found) setItemData(found);
        }
    }, [eventsList, id, itemData]);

    const item = itemData || fallback;

    if (loading) {
        return (
            <div className="dashboardPy dashboardSpaceY text-gray-800">
                <div className="text-center py-20 text-gray-600">Loading event...</div>
            </div>
        );
    }


    const prefix = (location.pathname || '').split('/')[1] || 'coach';
    const derivedBackBase = `/${prefix}/event`;
    const derivedAnalyticsPath = `/${prefix}/event-analytics`;
    const backTarget = state?.from === 'analytics' ? derivedAnalyticsPath : derivedBackBase;

    return (
        <div className=" dashboardPy dashboardSpaceY  text-gray-800">
            {/* Back Button */}
            <div className="mb-4">
                <Link to={backTarget} className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
            </div>

            {/* Main Content Wrapper */}
            <div className="">

                {/* Hero Image */}
                <HeroImage src={item.image} alt={item.title} />

                {/* Cancelled / Not Approved alert */}
                <CancelAlert item={item} />

                {/* Left Column: Details */}
                <EventInfo item={item} />

                {/* Right Column: Venue & Contact */}
                <VenueCard item={item} />
            </div>

            {/* Bookings Table (separated component) */}
            <BookingsTable bookings={bookings} resultsPerPage={resultsPerPage} />

        </div>
    );
};

export default EventAnallyticsDetails;
