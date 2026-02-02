
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Phone, Mail, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();

    // Default data structure matching the image content
    const item = state?.item || {
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

    return (
        <div className=" dashboardPy dashboardSpaceY  text-gray-800">
            {/* Back Button */}
            <div className="mb-4">
                <Link to="/coach/event" className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
            </div>

            {/* Main Content Wrapper */}
            <div className="">

                {/* Hero Image */}
                <div className="w-full h-64 md:h-[820px] relative rounded-xl overflow-hidden mb-6">
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

                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-8">
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
                            {/* Top image (map / illustration) */}
                            <div className="w-full mb-2  h-40 md:h-48 bg-gray-100">
                                <img
                                    src="https://i.ibb.co.com/fY1frBX7/Rectangle-4319.png"
                                    alt="Venue map"
                                    className="w-full rounded-lg h-full object-cover"
                                />
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











