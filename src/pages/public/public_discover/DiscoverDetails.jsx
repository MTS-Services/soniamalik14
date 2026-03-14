import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Medal, Calendar, Users } from 'lucide-react';
import Container from '../../../components/layout/Container';

const DiscoverDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || {
    id,
    title: 'Weekly Women’s Cricket Nets Session',
    coach: 'John Doe',
    type: 'Recreational',
    sport: 'Cricket',
    suitableFor: 'New to the sport',
    womensOnly: 'Yes',
    location: 'Bashundhara turbo tough',
    postcode: '222300',
    town: 'London',
    day: 'Saturday',
    time: '10:00 - 12:00',
    image: '/images/detaisPage/detailsBanner.png', 
    avatar: '/images/detaisPage/coachAvatar.png', 
    mapImage: '/images/detaisPage/mapPlaceholder.png', 
    about: 'This weekly women’s cricket nets session is designed for players who want to improve their skills in a relaxed and supportive environment. Whether you’re completely new to cricket or returning after a break, this session provides a safe space to learn, practice, and enjoy the game at your own pace.',
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
            <div className="w-full h-[250px] md:h-[800px] rounded-2xl overflow-hidden shadow-sm">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
              {item.avatar ? (
                <img src={item.avatar} alt={item.coach} className="w-full h-full object-cover" />
              ) : (
                <img src={item.image} alt="fallback" className="w-full h-full object-cover" /> // fallback
              )}
            </div>
          </div>

          {/* Title & Coach Info */}
          <div className="px-2 md:px-4 mb-8">
            <h1 className="text-2xl md:text-[32px] font-bold text-[#1A1D1F] leading-tight">
              {item.title}
            </h1>
            <p className="text-[#33383F] mt-2 text-base">
              Coach: <span className="font-bold">{item.coach || item.headCoach}</span>
            </p>
          </div>

          {/* Session Details Card */}
          <div className="bg-white rounded-lg p-6 md:p-8 mb-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#000000] mb-3">Session Details</h2>
            <div className="text-[#272727]  text-base  ">
              {item.about}
            </div>

            <div className='text-base mt-4'>
              <p>No trials. No pressure. Just cricket.</p>
            </div>
          </div>

          {/* 3-Column Grid for Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Column 1: Session Overview */}
            <div>
              <h3 className="text-[17px] font-bold text-[#1A1D1F] mb-4">Session Overview</h3>
              <div className="space-y-3 mb-6">
                
                {/* Info Row: Sport */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Medal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-500 font-medium mb-0.5">Sport</p>
                    <p className="text-[15px] font-semibold text-[#1A1D1F]">{item.sport || 'Cricket'}</p>
                  </div>
                </div>

                {/* Info Row: Session Type */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-500 font-medium mb-0.5">Session Type</p>
                    <p className="text-[15px] font-semibold text-[#1A1D1F]">{item.type}</p>
                  </div>
                </div>

                {/* Info Row: Suitable For */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-500 font-medium mb-0.5">Suitable For</p>
                    <p className="text-[15px] font-semibold text-[#1A1D1F]">{item.suitableFor}</p>
                  </div>
                </div>

                {/* Info Row: Women's only */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-500 font-medium mb-0.5">Women's only</p>
                    <p className="text-[15px] font-semibold text-[#1A1D1F]">{item.womensOnly}</p>
                  </div>
                </div>

              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#147B6B] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Book Your Place
                </button>
                <button className="bg-[#147B6B] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Register Interest
                </button>
              </div>
            </div>

            {/* Column 2: Venue Information */}
            <div>
              <h3 className="text-[17px] font-bold text-[#1A1D1F] mb-4">Venue Information</h3>
              <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 h-[380px] flex flex-col">
                <div className="space-y-3 mb-6 flex-1">
                  <p className="text-[14px] flex">
                    <span className="text-gray-500 w-28 shrink-0">Venue Name:</span> 
                    <span className="font-medium text-[#1A1D1F] truncate">{item.location}</span>
                  </p>
                  <p className="text-[14px] flex">
                    <span className="text-gray-500 w-28 shrink-0">Postcode:</span> 
                    <span className="font-medium text-[#1A1D1F]">{item.postcode}</span>
                  </p>
                  <p className="text-[14px] flex">
                    <span className="text-gray-500 w-28 shrink-0">Town/City:</span> 
                    <span className="font-medium text-[#1A1D1F]">{item.town}</span>
                  </p>
                  <p className="text-[14px] flex">
                    <span className="text-gray-500 w-28 shrink-0">Session Days:</span> 
                    <span className="font-medium text-[#1A1D1F]">{item.day}</span>
                  </p>
                  <p className="text-[14px] flex">
                    <span className="text-gray-500 w-28 shrink-0">Session Time:</span> 
                    <span className="font-medium text-[#1A1D1F]">{item.time}</span>
                  </p>
                </div>
                
                {/* Map Placeholder Image */}
                <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  {item.mapImage ? (
                    <img src={item.mapImage} alt="Map View" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Map Image</div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 3: Contact Organiser */}
            <div>
              <h3 className="text-[17px] font-bold text-[#1A1D1F] mb-4">Contact Organiser</h3>
              <div className="bg-[#E7F1F1] p-6 rounded-[20px] h-[380px] flex flex-col">
                <p className="text-[15px] mb-4 text-[#1A1D1F] font-medium">Ask the organiser a question</p>
                <form onSubmit={handleSendMessage} className="flex flex-col flex-1">
                  <textarea 
                    className="w-full flex-1 bg-[#C8DFDB] rounded-xl p-4 text-[14px] text-[#1A1D1F] placeholder-gray-500/70 border-none focus:ring-1 focus:ring-[#147B6B] resize-none mb-4"
                    placeholder="Write your message"
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="bg-[#147B6B] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit"
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

export default DiscoverDetails;