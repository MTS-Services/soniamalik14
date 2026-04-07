import React, { useMemo, useState } from 'react';
    import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Target, Trophy, Users, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllEvents } from '../../../../features/events/eventsSlice';
import TablePagination from '../../../../components/ui/TablePagination';
import eventAnalyticsDetailsData from '../../../../data/eventAnalyticsDetailsData.json';

const StatCard = ({ icon, title, value }) => {
    const Icon = icon;

    return (
        <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F1F1] text-[#0F766E]">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-[16px] font-medium leading-6 text-[#101828]">{title}</p>
                    <p className="text-[16px] leading-6 text-[#4a5565]">{value}</p>
                </div>
            </div>
        </div>
    );
};

const DataTable = ({ title, columns, rows, withAction = false, rowsPerPage = 6 }) => {
    const [page, setPage] = useState(1);

    const totalResults = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalResults);
    const currentRows = rows.slice(startIndex, endIndex);
    const actionLabel = columns[rows[0]?.length] || 'Action';

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages) return;
        setPage(nextPage);
    };

    return (
        <div className="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <div className="border-b border-[#e5e7eb] px-5 py-3">
                <h3 className="text-[20px] font-semibold leading-8 text-black">{title}</h3>
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-180">
                    <thead>
                        <tr className="bg-[#f7f8f9]">
                            {columns.map((col) => (
                                <th key={col} className="px-5 py-3 text-left text-base font-medium uppercase tracking-wide text-[#667085]">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, idx) => (
                            <tr key={`${title}-${startIndex + idx}`} className="border-t border-[#f0f2f4]">
                                {row.map((cell, cellIdx) => (
                                    <td key={`${title}-${startIndex + idx}-${cellIdx}`} className="px-5 py-3 text-base  text-[#344054]">
                                        {cell}
                                    </td>
                                ))}
                                {withAction && (
                                    <td className="px-5 py-3 text-right text-[#101828]">
                                        <ChevronRight className="inline h-4 w-4" />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3 p-3 md:hidden">
                {currentRows.map((row, idx) => (
                    <div key={`${title}-card-${startIndex + idx}`} className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
                        <div className="space-y-2">
                            {row.map((cell, cellIdx) => (
                                <div key={`${title}-card-${startIndex + idx}-${cellIdx}`} className="flex items-start justify-between gap-3 border-b border-[#edf0f2] pb-2 last:border-b-0 last:pb-0">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
                                        {columns[cellIdx]}
                                    </p>
                                    <p className="max-w-[65%] wrap-break-word text-right text-sm text-[#344054]">
                                        {cell}
                                    </p>
                                </div>
                            ))}
                            {withAction && (
                                <div className="flex items-center justify-between border-t border-[#edf0f2] pt-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">{actionLabel}</p>
                                    <button type="button" className="inline-flex items-center rounded-md border border-[#d0d5dd] bg-white p-1.5 text-[#101828]">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <TablePagination
                currentPage={safePage}
                totalPages={totalPages}
                totalResults={totalResults}
                resultsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                wrapperClass="px-5 py-3"
                resultsTextClass="text-[12px] text-[#0F766E]"
                buttonClass="text-[12px]"
            />
        </div>
    );
};

const EventAnallyticsDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;
    const activeTab = state?.tab || 'all';

    const eventsList = useSelector(selectAllEvents);
    const selectedEvent = useMemo(() => {
        if (state?.item) return state.item;
        const normalizedEvents = Array.isArray(eventsList) ? eventsList : [];
        return normalizedEvents.find((e) => String(e.id) === String(id)) || null;
    }, [state, eventsList, id]);

    const fallback = {
        title: "Women's Open Football Training Camp",
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=600&fit=crop',
        eventType: 'Workshops & learning',
        description:
            'This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.\n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.',
        sportType: 'Cricket',
        skillLevel: 'New to the sport',
        eventSubType: 'Recreational',
        venue: {
            name: 'Bashundhara turbo tough',
            address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        },
        time: '10:00 - 12:00',
        organizer: { avatar: 'https://ui-avatars.com/api/?name=Coach&background=0D8ABC&color=fff' },
    };

    const item = selectedEvent || fallback;
    const prefix = (location.pathname || '').split('/')[1] || 'coach';
    const backTarget = `/${prefix}/event-analytics?tab=${activeTab}`;

    const detailsTitleByTab = {
        all: 'Event Details',
        upcoming: 'Upcoming Event',
        complete: 'Complete Event',
        pending: 'Pending Event',
        cancel: 'Cancel Event',
    };

    const bookingsRows = (eventAnalyticsDetailsData.bookings || []).map((row) => [
        row.name,
        row.phoneNumber,
        row.email,
    ]);

    const registerInterestRows = (eventAnalyticsDetailsData.registerInterest || []).map((row) => [
        row.name,
        row.phoneNumber,
        row.email,
    ]);

    const enquiriesRows = (eventAnalyticsDetailsData.enquiries || []).map((row) => [
        row.playerName,
        row.phoneNumber,
        row.email,
        row.message,
        row.date,
    ]);

    return (
        <div className="dashboardPy dashboardSpaceY text-gray-800">
            <div className="mb-2 flex items-center justify-between">
                <Link to={backTarget} className="inline-flex items-center text-[18px] font-normal text-[#0F766E]">
                    <ArrowLeft className="mr-1 h-5 w-5" /> Back
                </Link>
            </div>

            <div className="mb-3 text-xl font-semibold text-gray-900 md:text-3xl">
                {detailsTitleByTab[activeTab] || 'Event Details'}
            </div>

            <div className="overflow-hidden rounded-xl">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-70 w-full rounded-xl object-cover md:h-130"
                />
            </div>

            <div className="relative -mt-6 ml-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white md:h-24 md:w-24">
                <img
                    src={item.organizer?.avatar || 'https://ui-avatars.com/api/?name=Coach&background=0D8ABC&color=fff'}
                    alt="Organizer"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="mt-2">
                <h1 className="text-[32px] font-semibold leading-11 text-[#0C0C0C]">{item.title}</h1>
                <div className="flex items-center gap-1 text-[16px] leading-6">
                    <span className="font-medium text-[#373737]">Event Type:</span>
                    <span>{item.eventType || 'Workshops & learning'}</span>
                </div>
            </div>

            <div className="rounded-lg bg-white p-5">
                <h2 className="text-[20px] font-semibold leading-8 text-black">Event Type</h2>
                <p className="mt-2 whitespace-pre-line text-[14px] leading-5 text-[#2D2D2D]">{item.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <section>
                    <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Session Overview</h3>
                    <div className="space-y-3">
                        <StatCard icon={Trophy} title="Sport" value={item.sportType || 'Cricket'} />
                        <StatCard icon={Calendar} title="Event Type" value={item.eventSubType || 'Recreational'} />
                        <StatCard icon={Target} title="Suitable For" value={item.skillLevel || 'New to the sport'} />
                        <StatCard icon={Users} title="Women's only" value="Yes" />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <button className="rounded bg-[#0F766E] px-3 py-2 text-[12px] font-medium text-white">Book Your Place</button>
                        <button className="rounded bg-[#0F766E] px-3 py-2 text-[12px] font-medium text-white">Register Interest</button>
                    </div>
                </section>

                <section className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
                    <h3 className="mb-2 text-[20px] font-semibold leading-8 text-black">Venue Information</h3>
                    <p className="text-[14px] font-medium text-[#101828]">Venue Name: {item.venue?.name || 'Bashundhara turbo tough'}</p>
                    <div className="mt-2 flex items-start gap-1 text-[14px] text-[#4a5565]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{item.venue?.address || '2118 Thornridge Cir. Syracuse, Connecticut 35624'}</span>
                    </div>
                    <p className="mt-2 text-[14px] text-[#101828]"><span className="font-medium">Session Days:</span> Saturday</p>
                    <p className="text-[14px] text-[#101828]"><span className="font-medium">Session Time:</span> {item.time || '10:00 - 12:00'}</p>
                    <div className="mt-3 h-35 overflow-hidden rounded-lg bg-[#d9d9d9]">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(item.venue?.address || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="Venue Location"
                        />
                    </div>
                </section>

                <section className="rounded-[14px] bg-[#E7F1F1] p-4">
                    <h3 className="text-[20px] font-semibold leading-8 text-black">Contact Organiser</h3>
                    <p className="mb-2 text-[14px] text-[#4a5565]">Ask the organiser a question</p>
                    <textarea
                        placeholder="Write your message"
                        rows={8}
                        className="w-full resize-none rounded-md border border-[#9ec9c7] bg-[#a9cdca] p-3 text-[14px] outline-none placeholder:text-[#5f7e7c]"
                    />
                    <button className="mt-3 inline-flex items-center gap-2 rounded bg-[#0F766E] px-4 py-2 text-[12px] font-medium text-white">
                        Send message
                    </button>
                </section>
            </div>

            <DataTable title="Bookings" columns={['Name', 'Phone Number', 'Email']} rows={bookingsRows} />
            <DataTable title="Register Interest" columns={['Name', 'Phone Number', 'Email']} rows={registerInterestRows} />
            <DataTable title="Enquiries" columns={['Player Name', 'Phone Number', 'Email', 'Message', 'Date', 'ACTIONS']} rows={enquiriesRows} withAction />
        </div>
    );
};

export default EventAnallyticsDetails;
