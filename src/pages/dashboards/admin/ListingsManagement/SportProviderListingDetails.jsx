import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Award, 
    CalendarDays, 
    Users, 
    Code, 
    AlertCircle, 
    Eye, 
    MessageSquare, 
    TrendingUp, 
    ExternalLink,
    ArrowLeft // Added import
} from 'lucide-react';

const SportProviderListingDetails = () => {
    const navigate = useNavigate();

    const { id = 1 } = useParams(); 

    const tableData = [
        {
            id: 1, // Approved/Live Status (Image 1)
            listing: "Weekly Women's Cricket Nets Session",
            coach: "John Doe",
            status: 'Live',
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
        },
        {
            id: 2, // Pending Status (Image 2)
            listing: "Weekly Women's Cricket Nets Session",
            coach: "John Doe",
            status: 'Pending',
            engagement: null
        },
        {
            id: 6, // Banned Status (Image 3)
            listing: "Weekly Women's Cricket Nets Session",
            coach: "John Doe",
            status: 'Banned',
            engagement: null
        }
    ];

    const data = useMemo(() => tableData.find(item => item.id === parseInt(id)) || tableData[0], [id]);

    if (!data) {
        return (
            <div className="flex-1 overflow-auto bg-gray-50 p-8 flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
                    <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#0f766e] text-white rounded-lg">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto bg-gray-50 min-h-screen relative ">
            
            {/* 1. Pending Status Top Banner */}
            {data.status === 'Pending' && (
                <div className="bg-[#789bb4] text-white px-6 py-2.5 flex justify-between items-center shadow-sm">
                    <span className="font-semibold text-sm">not approved by admin</span>
                    <Code className="w-5 h-5 opacity-70" />
                </div>
            )}

            <div className=" p-6 md:p-8 space-y-8">
                
                {/* Hero Section */}
                <div className="relative">
                    {/* Cover Image */}
                    <img 
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80" 
                        alt="Team Cover" 
                        className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-sm"
                    />

                    {/* Back Button Added Here */}
                    <button 
                        onClick={() => navigate(-1)} 
                        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white rounded-lg text-[#0f766e] font-medium transition-colors shadow-md z-10"
                        title="Go Back"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className='text-sm'>Back</span>
                    </button>

                    {/* Profile Picture overlapping */}
                    <div className="absolute -bottom-10 left-8">
                        <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Coach" 
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                </div>

                {/* Header Info */}
                <div className="pt-10 px-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">{data.listing}</h1>
                    <p className="text-base text-gray-600 font-medium mb-3">Coach: <span className="text-gray-900 text-lg">{data.coach}</span></p>
                    
                    {/* Mini Stats (From Image 1) */}
                    {data.engagement && (
                        <div className="flex items-center gap-4 text-base font-medium text-gray-500">
                            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {data.engagement.views}</span>
                            <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> {data.engagement.trend}</span>
                            <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {data.engagement.messages}</span>
                            <span className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> {data.engagement.shares}</span>
                        </div>
                    )}
                </div>

                {/* 2. Banned Status Alert Banner */}
                {data.status === 'Banned' && (
                    <div className="bg-red-50/80 border border-red-100 rounded-xl p-4 mx-2 flex gap-3">
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

                {/* Session Details Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mx-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Session Details</h2>
                    <p className="text-base text-[#000000] leading-relaxed mb-4 xl:max-w-6xl">
                        This weekly women's cricket nets session is designed for players who want to improve their skills in a relaxed and supportive environment. Whether you're completely new to cricket or returning after a break, this session provides a safe space to learn, practice, and enjoy the game at your own pace.
                    </p>
                    <p className="text-base text-[#000000]">No trials. No pressure. Just cricket.</p>
                </div>

                {/* Bottom Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
                    
                    {/* Left Column */}
                    <div className="space-y-6">
                        
                        {/* Session Overview */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Overview</h2>
                            <div className="space-y-3">
                                {/* Overview Card 1 */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="p-2 bg-#E7F1F1 rounded-full text-[#00786F]"><Award className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">Sport</p>
                                        <p className="text-base text-gray-500">Cricket</p>
                                    </div>
                                </div>
                                {/* Overview Card 2 */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="p-2 bg-#E7F1F1 rounded-full text-[#00786F]"><CalendarDays className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">Session Type</p>
                                        <p className="text-base text-gray-500">Recreational</p>
                                    </div>
                                </div>
                                {/* Overview Card 3 */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="p-2 bg-#E7F1F1 rounded-full text-[#00786F]"><Users className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">Suitable For</p>
                                        <p className="text-base text-gray-500">New to the sport</p>
                                    </div>
                                </div>
                                {/* Overview Card 4 */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="p-2 bg-#E7F1F1 rounded-full text-[#00786F]"><Users className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">Women's only</p>
                                        <p className="text-base text-gray-500">Yes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button className="px-5 py-2.5 bg-[#0f766e] text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors">
                                    Book Your Place
                                </button>
                                <button className="px-5 py-2.5 bg-[#0f766e] text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors">
                                    Register Interest
                                </button>
                            </div>
                        </div>

                        {/* Contact Organiser */}
                        <div>
                            <h2 className="text-base font-bold text-gray-900 mb-4">Contact Organiser</h2>
                            <div className="bg-[#f0f4f4] p-5 rounded-xl border border-gray-100">
                                <p className="text-base text-gray-700 mb-3 font-medium">Ask the organiser a question</p>
                                <textarea 
                                    className="w-full h-32 bg-[#cde4e2]/50 border-none rounded-lg p-3 text-base text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none mb-3"
                                    placeholder="Write your message"
                                ></textarea>
                                <button className="px-5 py-2 bg-[#0f766e] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors">
                                    Send message
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-4">Venue Information</h2>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-base">
                                <span className="text-gray-500">Venue Name:</span>
                                <span className="text-gray-900 font-medium">Bashundhara turbo tough</span>
                                
                                <span className="text-gray-500">Postcode:</span>
                                <span className="text-gray-900 font-medium">222300</span>
                                
                                <span className="text-gray-500">Town/City:</span>
                                <span className="text-gray-900 font-medium">London</span>
                                
                                <span className="text-gray-500">Session Days:</span>
                                <span className="text-gray-900 font-medium">Saturday</span>
                                
                                <span className="text-gray-500">Session Time:</span>
                                <span className="text-gray-900 font-medium">10:00 - 12:00</span>
                            </div>

                            {/* Dummy Map Image */}
                            <div className="mt-6">
                                <img 
                                    src="https://placehold.co/600x300/e2e8f0/64748b?text=Map+Placeholder" 
                                    alt="Venue Map" 
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SportProviderListingDetails;