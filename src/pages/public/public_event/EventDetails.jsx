import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Medal, Calendar, Users, MapPin } from 'lucide-react';
import Container from '../../../components/layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizerEventById } from '../../../features/events/eventsAPI';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const dispatch = useDispatch();
  const apiItem = useSelector((state) => state.events.organizerEventDetails.item);
  const loading = useSelector((state) => state.events.organizerEventDetails.loading);
  const error = useSelector((state) => state.events.organizerEventDetails.error);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchOrganizerEventById(id));
  }, [id, dispatch]);

  const data = apiItem;
  const event = data
    ? {
        id: data.id,
        title: data.title,
        titleColor: '#0B544E',
        coach: data.organizerName || data.organizer?.name || '',
        type: data.eventType || data.eventType,
        sport: data.sportType || '',
        suitableFor: Array.isArray(data.suitableFor) ? data.suitableFor.join(', ') : (data.suitableFor || ''),
        womensOnly: data.womensOnly ?? 'No',
        location: data.venueName || '',
        locationFull: data.fullAddress || '',
        postcode: data.postcode || '',
        town: data.city || '',
        day: data.startDate ? new Date(data.startDate).toLocaleDateString(undefined, { weekday: 'long' }) : '',
        time: data.startTime && data.endTime ? `${data.startTime} - ${data.endTime}` : (data.startTime || ''),
        image: data.image || '/images/detaisPage/detailsBanner.png',
        avatar: data.organizer?.avatar || '/images/detaisPage/coachAvatar.png',
        mapImage: data.googleMapLink || '',
        about: data.description || data.about || '',
      }
    : null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert('Message sent — demo only');
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-16">
        <Container>
          <div className="py-8 text-center">Loading event...</div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-16">
        <Container>
          <div className="py-8 text-center text-red-600">{error}</div>
        </Container>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-16">
        <Container>
          <div className="py-8 text-center">Event not found</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      <Container>
        <div className="py-4 md:py-8">
          
          {/* Hero Banner Section */}
          <div className="relative mb-16">
            {/* Banner Image */}
            <div className="w-full h-62.5 md:h-150 rounded-2xl overflow-hidden shadow-sm">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
            </div>

            {/* Overlaid Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 flex items-center gap-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Overlaid Favorite/Heart Button */}
            <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-2.5 rounded-full transition-all">
              <Heart className="w-4 h-4" />
            </button>

            {/* Overlaid Avatar Picture */}
            <div className="absolute -bottom-10 left-6 md:left-10 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#F8FAFC] overflow-hidden bg-gray-200">
              {event.avatar ? (
                <img src={event.avatar} alt={event.coach} className="w-full h-full object-cover" />
              ) : (
                <img src={event.image} alt="fallback" className="w-full h-full object-cover" /> // fallback
              )}
            </div>
          </div>

          {/* Title & Info */}
          <div className="px-2 md:px-4 mb-8">
            <h1 className="text-2xl md:text-[32px] font-bold text-[#0B544E] leading-tight">
              {event.title}
            </h1>
            <p className="text-[#0C0C0C] mt-2 text-base">
              Event Type: <span className="text-[#0C0C0C]">{event.type}</span>
            </p>
          </div>

          {/* Session Details Card */}
          <div className="bg-white rounded-lg p-6  mb-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#000000] mb-3">Event Type</h2>
            <div className="text-[#272727] text-base md:max-w-7xl whitespace-pre-wrap leading-relaxed">  
              {event.about}
            </div>
          </div>

          {/* 3-Column Grid for Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Column 1: Session Overview */}
            <div>
              <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Session Overview</h3>
              <div className="space-y-3 mb-6">
                
                {/* Info Row: Sport */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Medal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base text-[#101828] font-medium mb-0.5">Sport</p>
                    <p className="text-base text-[#4A5565]">{event.sport}</p>
                  </div>
                </div>

                {/* Info Row: Event Type */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base text-[#101828] font-medium mb-0.5">Event Type</p>
                    <p className="text-base text-[#4A5565]">{event.type}</p>
                  </div>
                </div>

                {/* Info Row: Suitable For */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base text-[#101828] font-medium mb-0.5">Suitable For</p>
                    <p className="text-base text-[#4A5565]">{event.suitableFor}</p>
                  </div>
                </div>

                {/* Info Row: Women's only */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base text-[#101828] font-medium mb-0.5">Women's only</p>
                    <p className="text-base text-[#4A5565]">{event.womensOnly}</p>
                  </div>
                </div>

              </div>
              
              {/* Action Buttons */}
              <div className="hidden md:flex flex-wrap gap-3">
                <button className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Book Your Place
                </button>
                <button className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Register Interest
                </button>
              </div>
            </div>

            {/* Column 2: Venue Information */}
            <div>
              <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Venue Information</h3>
              <div className="overflow-hidden bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-auto md:h-105 flex flex-col">
                <div className="space-y-4 mb-6 md:flex-1">
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Venue Name:</span> 
                    <span className="text-[#1A1D1F] text-base min-w-0 wrap-break-word">{event.location}</span>
                  </div>

                  <div className="flex gap-2 items-start min-w-0">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span className="text-[#1A1D1F] text-base leading-tight wrap-break-word">
                      {event.locationFull}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Session Days:</span> 
                    <span className="text-[#1A1D1F] text-base min-w-0 wrap-break-word">{event.day}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Session Time:</span> 
                    <span className="text-[#1A1D1F] text-base min-w-0 wrap-break-word">{event.time}</span>
                  </div>
                  
                </div>
                
                {/* Map */}
                <div className="relative w-full h-44 min-h-44 sm:h-55 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <iframe
                    src="https://www.google.com/maps?q=23.8127682252437,90.42088993992539&z=16&output=embed"
                    title="Event location map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 block h-full w-full max-w-full border-0"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 md:hidden">
                <button className="w-full sm:flex-1 bg-[#0F766E] hover:bg-[#0D655D] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Book Your Place
                </button>
                <button className="w-full sm:flex-1 bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Register Interest
                </button>
              </div>
            </div>

            {/* Column 3: Contact Organiser */}
            <div>
              <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Contact Organiser</h3>
              <div className="bg-[#E7F1F1] p-4 rounded-lg h-105 flex flex-col">
                <p className="text-base mb-4 text-[#1A1D1F] ">Ask the organiser a question</p>
                <form onSubmit={handleSendMessage} className="flex flex-col flex-1">
                  <textarea 
                    className="w-full flex-1 bg-[#B5D5D2] rounded-xl p-4 text-base text-[#1A1D1F] placeholder-[#4A5565] border-none focus:ring-1 focus:ring-[#147B6B] resize-none mb-4"
                    placeholder="Write your message"
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventDetails;