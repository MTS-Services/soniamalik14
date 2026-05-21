// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ArrowLeft, CalendarDays, MapPin, MessageCircle, Target, Trophy, Users } from 'lucide-react';
// import { useEvent } from '../../../../context/EventContext';
// import { fetchOrganizerEventById } from '../../../../features/events/eventsAPI';
// import {
//     selectOrganizerEventDetails,
//     selectOrganizerEventDetailsError,
//     selectOrganizerEventDetailsLoading,
// } from '../../../../features/events/eventsSlice';

// const EventDetails = ({ backRoute = '/coach/events', useOrganizerApi = false }) => {
//     const { id } = useParams();
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { events } = useEvent();
//     const organizerEventDetails = useSelector(selectOrganizerEventDetails);
//     const organizerEventDetailsLoading = useSelector(selectOrganizerEventDetailsLoading);
//     const organizerEventDetailsError = useSelector(selectOrganizerEventDetailsError);
//     const [message, setMessage] = useState('');
//     const [bookingSuccess, setBookingSuccess] = useState(false);
//     const [messageSuccess, setMessageSuccess] = useState(false);

//     useEffect(() => {
//         if (!useOrganizerApi || !id) return;
//         dispatch(fetchOrganizerEventById(id));
//     }, [dispatch, id, useOrganizerApi]);

//     const itemData = useOrganizerApi
//         ? organizerEventDetails || state?.item || null
//         : state?.item || events?.find((e) => String(e.id) === String(id)) || null;

//     const handleBack = () => {
//         const filter = state?.filter;
//         if (filter) {
//             const params = new URLSearchParams({
//                 status: filter.status || 'All',
//                 query: filter.query || ''
//             });
//             navigate(`${backRoute}?${params.toString()}`);
//             return;
//         }
//         navigate(backRoute);
//     };

//     const handleBookPlace = () => {
//         setBookingSuccess(true);
//         window.setTimeout(() => setBookingSuccess(false), 2500);
//     };

//     const handleSendMessage = () => {
//         if (!message.trim()) return;
//         setMessageSuccess(true);
//         setMessage('');
//         window.setTimeout(() => setMessageSuccess(false), 2200);
//     };

//     if (useOrganizerApi && organizerEventDetailsLoading && !itemData) {
//         return <div className="py-20 text-center text-gray-600">Loading event...</div>;
//     }

//     if (useOrganizerApi && organizerEventDetailsError && !itemData) {
//         return <div className="py-20 text-center text-red-600">Error: {organizerEventDetailsError}</div>;
//     }

//     if (!itemData) {
//         return <div className="py-20 text-center text-gray-600">Loading event...</div>;
//     }

//     const event = itemData;

//     const overviewItems = [
//         { label: 'Sport', value: event.sportType || 'Cricket', icon: Trophy },
//         { label: 'Event Type', value: event.eventType || 'Recreational', icon: CalendarDays },
//         { label: 'Suitable For', value: event.skillLevel || 'New to the sport', icon: Target },
//         { label: "Women's only", value: 'Yes', icon: Users }
//     ];

//     return (
//         <div className="min-h-screen bg-[#f4f6f8] px-4 pb-10 pt-5 md:px-6 lg:px-10">
//             <div className="mx-auto w-full ">
//                 <button
//                     onClick={handleBack}
//                     className="mb-4 inline-flex items-center gap-2 text-[18px] font-normal text-[#0F766E]"
//                 >
//                     <ArrowLeft className="h-5 w-5" />
//                     <span>Back</span>
//                 </button>

//                 <div className="h-65 w-full overflow-hidden rounded-xl bg-gray-200 md:h-105">
//                     <img
//                         src={event.image }
//                         alt={event.title}
//                         className="h-full w-full object-cover"
//                     />
//                 </div>

//                 <div className="relative -mt-6 ml-3 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm md:-mt-8 md:ml-4 md:h-21 md:w-21">
//                     <img
//                         src={event.organizer?.avatar }
//                         alt={event.organizer?.name || 'Organizer'}
//                         className="h-full w-full object-cover"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <h1 className="text-[28px] font-semibold leading-tight text-[#0C0C0C] md:text-[32px]">
//                         {event.title || "Women's Open Football Training Camp"}
//                     </h1>
//                     <div className="mt-1 flex items-center gap-1 text-[16px] leading-6">
//                         <span className="font-medium text-[#373737]">Event Type:</span>
//                         <span className="text-[#0C0C0C]">{event.eventType || 'Workshops & learning'}</span>
//                     </div>
//                 </div>

//                 <div className="mt-6 rounded-lg bg-white p-5">
//                     <h2 className="text-[20px] font-semibold leading-8 text-black">Event Type</h2>
//                     <p className="mt-2 whitespace-pre-line text-[14px] leading-5 text-[#2d2d2d]">
//                         {event.description || 'This training camp focuses on technical drills, tactical awareness, and conditioning in a supportive environment.'}
//                     </p>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
//                     <section>
//                         <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Session Overview</h3>
//                         <div className="space-y-3">
//                             {overviewItems.map((item) => {
//                                 const Icon = item.icon;
//                                 return (
//                                     <div key={item.label} className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F1F1] text-[#0F766E]">
//                                                 <Icon className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-[16px] font-medium leading-6 text-[#101828]">{item.label}</p>
//                                                 <p className="text-[16px] leading-6 text-[#4a5565]">{item.value}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         <div className="mt-4 grid grid-cols-2 gap-3">
//                             <button
//                                 onClick={handleBookPlace}
//                                 className="rounded-md bg-[#0F766E] px-3 py-2 text-[14px] font-medium text-white transition hover:bg-[#0c5e58]"
//                             >
//                                 Book Your Place
//                             </button>
//                             <button className="rounded-md bg-[#0F766E] px-3 py-2 text-[14px] font-medium text-white transition hover:bg-[#0c5e58]">
//                                 Register Interest
//                             </button>
//                         </div>
//                     </section>

//                     <section className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
//                         <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Venue Information</h3>
//                         <p className="text-[14px] font-medium text-[#101828]">Venue Name:</p>
//                         <p className="mb-2 text-[14px] text-[#4a5565]">{event.venueName || event.venue?.name || 'Bashundhara turbo tough'}</p>

//                         <div className="mb-2 flex items-start gap-1 text-[14px] text-[#4a5565]">
//                             <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4a5565]" />
//                             <span>{event.fullAddress || event.venue?.address || '2118 Thornridge Cir. Syracuse, Connecticut 35624'}</span>
//                         </div>

//                         <div className="mt-2 text-[14px] text-[#101828]">
//                             <p>
//                                 <span className="font-medium">Session Days:</span> Saturday
//                             </p>
//                             <p>
//                                 <span className="font-medium">Session Time:</span> {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : event.time || '10:00 - 12:00'}
//                             </p>
//                         </div>

//                         <div className="mt-3 h-35 w-full overflow-hidden rounded-lg bg-[#d9d9d9]">
//                             {event.fullAddress || event.venue?.address ? (
//                                 <iframe
//                                     src={`https://maps.google.com/maps?q=${encodeURIComponent(event.fullAddress || event.venue?.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
//                                     width="100%"
//                                     height="100%"
//                                     style={{ border: 0 }}
//                                     loading="lazy"
//                                     title="Venue Location"
//                                 />
//                             ) : null}
//                         </div>
//                     </section>

//                     <section className="rounded-[14px] bg-secondary p-4">
//                         <h3 className="mb-1 text-[20px] font-semibold leading-8 text-black">Contact Organiser</h3>
//                         <p className="mb-2 text-[14px] text-[#4a5565]">Ask the organiser a question</p>

//                         <textarea
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="Write your message"
//                             rows={8}
//                             className="w-full resize-none rounded-md border border-[#9ec9c7] bg-[#a9cdca] p-3 text-[14px] text-[#1f2937] outline-none placeholder:text-[#5f7e7c] focus:border-[#0F766E]"
//                         />

//                         <button
//                             onClick={handleSendMessage}
//                             className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#0F766E] px-4 py-2 text-[14px] font-medium text-white transition hover:bg-[#0c5e58]"
//                         >
//                             <MessageCircle className="h-4 w-4" />
//                             Send message
//                         </button>
//                     </section>
//                 </div>

//                 {(bookingSuccess || messageSuccess) && (
//                     <div className="mt-4 rounded-md border border-loginInput bg-white px-4 py-2 text-[14px] text-[#0F766E]">
//                         {bookingSuccess ? 'Successfully booked your place.' : 'Message sent to organiser.'}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventDetails;








import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, CalendarDays, MapPin, Target, Trophy, Users } from 'lucide-react';
import { fetchOrganizerEventById } from '../../../../features/events/eventsAPI';
import {
  selectOrganizerEventDetails,
  selectOrganizerEventDetailsError,
  selectOrganizerEventDetailsLoading,
} from '../../../../features/events/eventsSlice';

const getMapEmbedUrl = (event) => {
  const directMapLink = String(event?.googleMapLink || '').trim();
  const buildEmbed = (query) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  if (directMapLink) {
    try {
      const parsedUrl = new URL(directMapLink);
      const query = parsedUrl.searchParams.get('q');
      if (query) return buildEmbed(query);
    } catch {
      // If URL parsing fails, treat the value as a plain location query.
    }

    return buildEmbed(directMapLink);
  }

  const fallbackQuery = event?.fullAddress || event?.venue?.address || event?.venueName || '';
  if (!fallbackQuery) return '';
  return buildEmbed(fallbackQuery);
};

const EventDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventDetails = useSelector(selectOrganizerEventDetails);
  const eventLoading = useSelector(selectOrganizerEventDetailsLoading);
  const eventError = useSelector(selectOrganizerEventDetailsError);

  const [message, setMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchOrganizerEventById(id));
  }, [dispatch, id]);

  const event = eventDetails?.data || eventDetails || null;

  const handleBack = () => {
    navigate('/provider/event', {
      state: {
        filter: state?.filter || { status: 'All', query: '' },
        currentPage: state?.currentPage || 1,
      },
    });
  };

  const handleBookPlace = () => {
    setBookingSuccess(true);
    window.setTimeout(() => setBookingSuccess(false), 2400);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSuccess(true);
    setMessage('');
    window.setTimeout(() => setMessageSuccess(false), 2200);
  };

  if (eventLoading && !event) {
    return <div className="py-20 text-center text-gray-600">Loading event...</div>;
  }

  if (eventError && !event) {
    return <div className="py-20 text-center text-red-600">Error: {eventError}</div>;
  }

  if (!event) {
    return <div className="py-20 text-center text-gray-600">Event not found</div>;
  }

  const mapEmbedUrl = getMapEmbedUrl(event);

  const overviewItems = [
    { label: 'Sport', value: event.sportType || 'Football', icon: Trophy },
    { label: 'Event Type', value: event.eventType || 'Training Camp', icon: CalendarDays },
    { label: 'Suitable For', value: event.skillLevel || 'New to the sport', icon: Target },
    {
      label: "Women's only",
      value: typeof event.womensOnly === 'boolean' ? (event.womensOnly ? 'Yes' : 'No') : event.womensOnly || 'No',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] px-4 pb-10 pt-5 md:px-6 lg:px-10">
      <div className="mx-auto w-full">
        <button
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-2 text-[18px] font-normal text-[#0F766E]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="h-65 w-full overflow-hidden rounded-xl bg-gray-200 md:h-105">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        </div>

        <div className="relative -mt-6 ml-3 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm md:-mt-8 md:ml-4 md:h-21 md:w-21">
          <img
            src={
              event.organizer?.avatar ||
              'https://ui-avatars.com/api/?name=Provider&background=0F766E&color=fff'
            }
            alt={event.organizer?.name || 'Organizer'}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4">
          <h1 className="text-[28px] font-semibold leading-tight text-[#0C0C0C] md:text-[32px]">
            {event.title}
          </h1>
          <div className="mt-1 flex items-center gap-1 text-[16px] leading-6">
            <span className="font-medium text-[#373737]">Event Type:</span>
            <span className="text-[#0C0C0C]">{event.eventType}</span>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white p-5">
          <h2 className="text-[20px] font-semibold leading-8 text-black">Event Type</h2>
          <p className="mt-2 whitespace-pre-line text-[14px] leading-5 text-[#2d2d2d]">
            {event.description}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <section>
            <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Session Overview</h3>
            <div className="space-y-3">
              {overviewItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-[14px] border border-[#e5e7eb] bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F1F1] text-[#0F766E]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[16px] font-medium leading-6 text-[#101828]">{item.label}</p>
                        <p className="text-[16px] leading-6 text-[#4a5565]">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={handleBookPlace}
                className="rounded-md bg-[#0F766E] px-3 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#0c5e58]"
              >
                Book Your Place
              </button>
              <button className="rounded-md bg-[#0F766E] px-3 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#0c5e58]">
                Register Interest
              </button>
            </div>
          </section>

          <section className="">
            <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Venue Information</h3>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-base font-medium text-[#101828]">
                Venue Name : <span className="text-base">{event.venueName || event.venue?.name || 'N/A'} </span>{' '}
              </p>
              <p className="mb-2 text-[14px] text-[#4a5565]"></p>

              <div className="mb-2 flex items-start gap-1 text-[14px] text-[#4a5565]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4a5565]" />
                <span>{event.fullAddress || event.venue?.address || 'N/A'}</span>
              </div>

              <div className="mb-2 mt-4 space-y-2 text-base text-[#101828]">
                <p>
                  <span className="font-medium">Session Days:</span> Saturday
                </p>
                <p>
                  <span className="font-medium">Session Time:</span>{' '}
                  {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : event.time || 'N/A'}
                </p>
              </div>
              <div className="mt-3 h-55 w-full overflow-hidden rounded-lg bg-[#d9d9d9]">
                {mapEmbedUrl ? (
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Venue Location"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Map not available
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="">
            <h3 className="mb-3 text-[20px] font-semibold leading-8 text-black">Contact Organiser</h3>
            <div className="rounded-[14px] bg-secondary p-4">
              <p className="mb-2 text-lg text-[#4a5565]">Ask the organiser a question</p>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message"
                rows={12}
                className="w-full resize-none rounded-md border border-[#9ec9c7] bg-[#a9cdca] p-3 text-[14px] text-[#1f2937] outline-none placeholder:text-[#5f7e7c] focus:border-[#0F766E]"
              />

              <button
                onClick={handleSendMessage}
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#0F766E] px-4 py-2 text-base font-medium text-white transition hover:bg-[#0c5e58]"
              >
                Send message
              </button>
            </div>
          </section>
        </div>

        {(bookingSuccess || messageSuccess) && (
          <div className="border-loginInput mt-4 rounded-md border bg-white px-4 py-2 text-[14px] text-[#0F766E]">
            {bookingSuccess ? 'Successfully booked your place.' : 'Message sent to organiser.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
