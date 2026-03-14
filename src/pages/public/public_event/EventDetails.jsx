import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Medal, Calendar, Users, MapPin } from 'lucide-react';
import Container from '../../../components/layout/Container';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const event = {
    id,
    title: "Women's Open Football Training Camp",
    coach: 'Rising Queens Football Academy', 
    type: 'Workshops & learning',
    sport: 'Football',
    suitableFor: 'New to the sport',
    womensOnly: 'Yes',
    location: 'Bashundhara turbo tough',
    locationFull: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    postcode: '35624',
    town: 'Syracuse',
    day: 'Saturday',
    time: '10:00 - 12:00',
    image: '/images/detaisPage/detailsBanner.png', 
    avatar: '/images/detaisPage/coachAvatar.png', 
    mapImage: 'https://i.ibb.co.com/ZRNpWQng/1579279c93526af38385f21a2041e29aeb2f2ae5.png', 
    about: 'This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.\n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.',
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert('Message sent — demo only');
  };

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
            <h1 className="text-2xl md:text-[32px] font-bold text-[#1A1D1F] leading-tight">
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
              <div className="flex flex-wrap gap-3">
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
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-105 flex flex-col">
                <div className="space-y-4 mb-6 flex-1">
                  
                  <div className="flex gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Venue Name:</span> 
                    <span className="text-[#1A1D1F] text-base">{event.location}</span>
                  </div>

                  <div className="flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span className="text-[#1A1D1F] text-base leading-tight">
                      {event.locationFull}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Session Days:</span> 
                    <span className="text-[#1A1D1F] text-base">{event.day}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-[#1A1D1F] w-28 shrink-0 text-base">Session Time:</span> 
                    <span className="text-[#1A1D1F] text-base">{event.time}</span>
                  </div>
                  
                </div>
                
                {/* Map Placeholder Image */}
                <div className="w-full h-55 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  {event.mapImage ? (
                    <img src={event.mapImage} alt="Map View" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Map Image</div>
                  )}
                </div>
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