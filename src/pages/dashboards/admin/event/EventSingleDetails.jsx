import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    MapPin, 
    Phone, 
    Mail,
    Eye,
    TrendingUp,
    MessageSquare,
    ExternalLink,
    Code,
    AlertCircle
} from 'lucide-react';

const EventSingleDetails = () => {
    const navigate = useNavigate();
    // Defaulting to 1 for the Live view. Change to 2 for Pending, or 6 for Banned.
    const { id = 1 } = useParams(); 

    // Hardcoded dummy data for the 3 states
    const eventDataList = [
        {
            id: 1, // Approved/Live Status (Image 1)
            title: "Women's Open Football Training Camp",
            status: "Live",
            sport: "Cricket",
            eventType: "Workshops & learning",
            description: "This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.\n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.",
            date: "Saturday, 12 October 2025",
            time: "4:00 PM – 7:00 PM",
            suitableFor: "New to sport",
            ageGroup: "16+ Years",
            sportType: "Cricket",
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 },
            venue: {
                name: "City Sports Ground",
                address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
                phone: "(406) 555-0120",
                email: "nevaeh.simmons@example.com"
            },
            organizer: {
                name: "Rising Queens Football Academy"
            }
        },
        {
            id: 2, // Pending Status (Image 2 - Assumes Top Blue Banner)
            title: "Women's Open Football Training Camp",
            status: "Pending",
            sport: "Cricket",
            eventType: "Workshops & learning",
            description: "This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.\n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.",
            date: "Saturday, 12 October 2025",
            time: "4:00 PM – 7:00 PM",
            suitableFor: "New to sport",
            ageGroup: "16+ Years",
            sportType: "Cricket",
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 },
            venue: {
                name: "City Sports Ground",
                address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
                phone: "(406) 555-0120",
                email: "nevaeh.simmons@example.com"
            },
            organizer: {
                name: "Rising Queens Football Academy"
            }
        },
        {
            id: 6, // Banned Status (Image 3 - Red Alert Box)
            title: "Women's Open Football Training Camp",
            status: "Banned",
            sport: "Cricket",
            eventType: "Workshops & learning",
            description: "This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.\n\nWhether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.",
            date: "Saturday, 12 October 2025",
            time: "4:00 PM – 7:00 PM",
            suitableFor: "New to sport",
            ageGroup: "16+ Years",
            sportType: "Cricket",
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 },
            venue: {
                name: "City Sports Ground",
                address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
                phone: "(406) 555-0120",
                email: "nevaeh.simmons@example.com"
            },
            organizer: {
                name: "Rising Queens Football Academy"
            }
        }
    ];

    const eventData = useMemo(() => eventDataList.find(item => item.id === parseInt(id)) || eventDataList[0], [id]);

    return (
        <div className="flex-1 overflow-auto bg-[#F8F9FA]  relative font-sans pb-12">
            
            {/* 1. Pending Status Top Banner */}
            {eventData.status === 'Pending' && (
                <div className="bg-[#789bb4] text-white px-6 py-2.5 flex justify-between items-center shadow-sm">
                    <span className="font-semibold text-sm">not approved by admin</span>
                    <Code className="w-5 h-5 opacity-70" />
                </div>
            )}

            <div className=" p-4 md:p-8 space-y-6">
                
                {/* Hero Image Section */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <img
                        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80"
                        alt="Event Banner"
                        className="w-full h-64 md:h-96 object-cover"
                    />
                    {/* Back Button floating on image */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg text-black   transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

                {/* 2. Banned Status Alert Banner */}
                {eventData.status === 'Banned' && (
                    <div className="bg-red-50/80 border border-red-100 rounded-xl p-5 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xl font-semibold text-red-600 mb-1">This event was not approved</h3>
                            <p className="text-base leading-relaxed text-red-500">
                                Your event could not be published because it does not meet our community or safety guidelines.<br/>
                                Please review the feedback below, make the required changes, and submit again.
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                    
                    {/* LEFT COLUMN: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Title & Stats */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                                {eventData.title}
                            </h1>
                            <div className="flex items-center gap-4 text-base font-medium text-gray-500 mb-6">
                                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {eventData.engagement.views}</span>
                                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {eventData.engagement.trend}</span>
                                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {eventData.engagement.messages}</span>
                                <span className="flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> {eventData.engagement.shares}</span>
                            </div>
                        </div>

                        {/* Sport & Event Type */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">Sport</h3>
                                <p className="text-base text-gray-600">{eventData.sport}</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">Event Type</h3>
                                <p className="text-base text-gray-600">{eventData.eventType}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className='max-w-4xl'>
                            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                                {eventData.description}
                            </p>
                        </div>

                        {/* Date & Time */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-base text-gray-700">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span>{eventData.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-base text-gray-700">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span>{eventData.time}</span>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 pt-2">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">Who is suitable for</h3>
                                <p className="text-base text-gray-600">{eventData.suitableFor}</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">Age Group:</h3>
                                <p className="text-base text-gray-600">{eventData.ageGroup}</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">Sport Type:</h3>
                                <p className="text-base text-gray-600">{eventData.sportType}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="px-6 py-2.5 bg-[#0f766e] text-white text-base font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm">
                                Book Now
                            </button>
                            <button className="px-6 py-2.5 bg-[#0f766e] text-white text-base font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm">
                                Register Interest
                            </button>
                        </div>

                        {/* Contact Organizer Form */}
                        <div className="bg-[#E7F1F1] p-4 rounded-lg border border-gray-100 max-w-lg mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Organizer</h2>
                            <p className="text-lg text-gray-700 mb-3 font-medium">Ask the organiser a question</p>
                            <textarea 
                                className="w-full h-32 bg-[#B5D5D2]/50 border-none rounded-lg p-3 text-base text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none mb-4"
                                placeholder="Write your message"
                            ></textarea>
                            <button className="px-6 py-2.5 bg-[#0F766E] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors shadow-sm">
                                Contact organiser
                            </button>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Venue Card */}
                    <div className="lg:col-span-1 lg:mt-4">
                        <div className="bg-white rounded-xl border border-[#91C0BC] p-6 shadow-sm sticky top-6">
                            
                            {/* Venue Details */}
                            <div className="mb-4 text-base">
                                <span className="font-semibold text-gray-900 mr-2">Venue:</span>
                                <span className="text-gray-600">{eventData.venue.name}</span>
                            </div>

                            <div className="flex items-start gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <span className="text-base text-gray-600 leading-snug">{eventData.venue.address}</span>
                            </div>

                            {/* Dummy Map Image */}
                            <div className="rounded-lg overflow-hidden border border-gray-100 mb-6">
                                <img 
                                    src="https://i.ibb.co.com/3mNs5TCZ/1579279c93526af38385f21a2041e29aeb2f2ae5.png" 
                                    alt="Venue Map" 
                                    className="w-full h-40 object-cover"
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-base text-gray-600">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span>{eventData.venue.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-base text-gray-600 break-all">
                                        <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                                        <span>{eventData.venue.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Organized By */}
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-3">Organized By:</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-sm font-bold tracking-wider">
                                            RQ
                                        </span>
                                    </div>
                                    <span className="text-base font-medium text-gray-900">{eventData.organizer.name}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventSingleDetails;