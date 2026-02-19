
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useEvent } from '../../../../context/EventContext';

// Transform backend event data to component format
const transformEventData = (event) => {
    if (!event) return null;

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Format time range
    const formatTime = (startTime, endTime) => {
        if (!startTime || !endTime) return '';
        return `${startTime} – ${endTime}`;
    };

    // Format age group
    const formatAgeGroup = (minAge) => {
        if (!minAge) return 'All ages welcome';
        return `${minAge}+ Years`;
    };

    return {
        ...event,
        date: formatDate(event.startDate),
        time: formatTime(event.startTime, event.endTime),
        ageGroup: formatAgeGroup(event.minAge),
        lastDateToRegister: event.startDate ? formatDate(new Date(new Date(event.startDate).getTime() - 4 * 24 * 60 * 60 * 1000)) : '',
        venue: {
            name: event.venueName || '',
            address: event.fullAddress || event.city || '',
        },
        contact: {
            phone: event.organizerPhone || '',
            email: event.organizerEmail || '',
        },
        organizer: {
            name: event.organizerName || '',
            avatar: event.organizerAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizerName || 'Organizer')}&background=0D8ABC&color=fff`,
        },
    };
};

const EventDetails = ({ backRoute = '/coach/event' }) => {
    const { id } = useParams();
    const { state } = useLocation();

    // Use Event Context instead of Redux
    const { events, fetchEventById } = useEvent();
    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load event data from state, context, or API
    useEffect(() => {
        // Priority 1: Use state if available
        if (state?.item) {
            const transformed = transformEventData(state.item);
            setItemData(transformed);
            return;
        }

        // Priority 2: Find in context events array
        const found = events.find((e) => String(e.id) === String(id));
        if (found) {
            const transformed = transformEventData(found);
            setItemData(transformed);
            return;
        }

        // Priority 3: Fetch from API
        const load = async () => {
            setLoading(true);
            try {
                const result = await fetchEventById(id);
                if (result.success && result.event) {
                    const transformed = transformEventData(result.event);
                    setItemData(transformed);
                }
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [state, events, id, fetchEventById]);

    // Update when events array changes
    useEffect(() => {
        if (!itemData && events.length > 0) {
            const found = events.find((e) => String(e.id) === String(id));
            if (found) {
                const transformed = transformEventData(found);
                setItemData(transformed);
            }
        }
    }, [events, id, itemData]);

    if (loading) {
        return (
            <div className="dashboardPy dashboardSpaceY text-gray-800">
                <div className="text-center py-20 text-gray-600">Loading event...</div>
            </div>
        );
    }

    if (!itemData) {
        return (
            <div className="dashboardPy dashboardSpaceY text-gray-800">
                <div className="text-center py-20">
                    <div className="text-gray-600 mb-4">Event not found</div>
                    <Link to={backRoute} className="text-teal-600 hover:text-teal-700">
                        Go back
                    </Link>
                </div>
            </div>
        );
    }

    const item = itemData;
    const backTarget = state?.from === 'analytics' ? `${backRoute}-analytics` : backRoute;

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
                <div className="w-full h-64 md:h-[520px] relative rounded-xl overflow-hidden mb-6">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* Left Column: Details */}
                <div className="lg:col-span-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                    </h1>

                    <div className="text-base md:w-2xl text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                        {item.description}
                    </div>

                    {/* Date & Time Section */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{item.time}</span>
                        </div>
                    </div>

                    {/* Event Attributes (Age, Sport, Skill, Deadline) */}
                    <div className="space-y-4 text-sm text-gray-800 mb-8">
                        <div>
                            <span className="font-bold block text-gray-900">Age Group:</span>
                            <span>{item.ageGroup}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Sport Type:</span>
                            <span>{item.sportType}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Skill Level:</span>
                            <span>{item.skillLevel}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Last Date to Register</span>
                            <span>{item.lastDateToRegister}</span>
                        </div>
                    </div>
                </div>



                {/* Right Column: Venue & Contact Card (Matching Image Bottom Section) */}
                <aside className="max-w-md lg:col-span-1 mt-10 lg:mt-0">
                    <div className="border border-[#91C0BC] rounded-xl bg-white shadow-sm overflow-hidden">

                        <div className="p-4">
                            {/* Venue Section */}
                            <div className="mb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm text-gray-900">Venue:</span>
                                    <span className="text-sm text-gray-600">{item.venue?.name}</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-gray-500">
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>{item.venue?.address}</span>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="w-full mb-2 h-40 md:h-48 bg-gray-100 rounded-lg overflow-hidden">
                                {item.googleMapLink ? (
                                    <iframe
                                        src={item.googleMapLink.includes('embed') ? item.googleMapLink : `https://maps.google.com/maps?q=${encodeURIComponent(item.venue?.address || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Venue Location"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Map not available
                                    </div>
                                )}
                            </div>

                            {/* Contact Information */}
                            <div className="mb-4">
                                <h4 className="font-bold text-sm text-gray-900 mb-3">Contact Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{item.contact?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="break-all">{item.contact?.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Organized By */}
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-3">Organized By:</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                        {/* Using placeholder or item image for logo */}
                                        <img
                                            src={item.organizer?.avatar || '/api/placeholder/40/40'}
                                            alt="Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">
                                        {item.organizer?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default EventDetails;
