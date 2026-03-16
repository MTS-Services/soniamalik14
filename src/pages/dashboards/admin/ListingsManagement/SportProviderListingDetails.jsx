import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Heart, MessageSquare, Eye, TrendingUp, ExternalLink } from 'lucide-react';

const SportProviderListingDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const tableData = [
        {
            id: 1,
            listing: 'Beginner Tennis Sessions',
            date: '03/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Tennis',
            postcode: 'SW1A 1AA',
            status: 'Featured',
            engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
        },
        {
            id: 5,
            listing: 'Beginner Badminton Sessions',
            date: '03/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Badminton',
            postcode: 'EH1 1YZ',
            status: 'Live',
            engagement: { views: 800, trend: 20, messages: 15, shares: 10 }
        },
        {
            id: 7,
            listing: 'Advanced Tennis Coaching',
            date: '04/03/2025',
            provider: "Sarah's Tennis Academy",
            providerType: 'Sport Providers',
            category: 'Tennis',
            postcode: 'SW1A 1AB',
            status: 'Live',
            engagement: { views: 2100, trend: 60, messages: 50, shares: 110 }
        },
        {
            id: 8,
            listing: 'Squash Court Rental',
            date: '04/03/2025',
            provider: 'City Sports Hub',
            providerType: 'Sport Providers',
            category: 'Squash',
            postcode: 'E1 6AN',
            status: 'Pending',
            engagement: null
        }
    ];

    const data = useMemo(() => tableData.find(item => item.id === parseInt(id)), [id]);

    if (!data) {
        return (
            <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
                    <button
                        onClick={() => navigate('/admin/listings')}
                        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                        Back to Listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="max-w-4xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin/listings')}
                    className="flex items-center gap-2 mb-6 text-teal-600 hover:text-teal-700 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Listings
                </button>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">

                    {/* Header Info */}
                    <div className="border-b pb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.listing}</h1>
                        <p className="text-lg text-gray-600 mb-4">{data.provider}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {data.date}
                        </div>
                    </div>

                    {/* Session Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Details</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">This is a {data.category} session designed for players who want to improve their skills in a relaxed and supportive environment. Whether you're completely new to the sport or looking to brush up on your technique, this session provides a space to learn, practice, and enjoy the game at your own pace.</p>
                    </div>

                    {/* Session Overview */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Overview</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Heart className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Open Class</p>
                                    <p className="text-gray-600">Yes</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Users className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Suitable For</p>
                                    <p className="text-gray-600">All Levels</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Venue Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Location</p>
                                    <p className="text-gray-600">{data.provider}</p>
                                    <p className="text-sm text-gray-600">Postcode: {data.postcode}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Session Days</p>
                                    <p className="text-gray-600">Saturday</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900">Session Time</p>
                                    <p className="text-gray-600">10:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    {data.engagement && (
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Engagement Statistics</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-center">
                                    <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-blue-600">{data.engagement.views}</p>
                                    <p className="text-sm text-gray-600">Views</p>
                                </div>
                                <div className="text-center">
                                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-green-600">+{data.engagement.trend}%</p>
                                    <p className="text-sm text-gray-600">Growth</p>
                                </div>
                                <div className="text-center">
                                    <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-purple-600">{data.engagement.messages}</p>
                                    <p className="text-sm text-gray-600">Messages</p>
                                </div>
                                <div className="text-center">
                                    <ExternalLink className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-orange-600">{data.engagement.shares}</p>
                                    <p className="text-sm text-gray-600">Shares</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t">
                        <button className="flex-1 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                            Book Your Place
                        </button>
                        <button className="flex-1 px-6 py-3 bg-teal-100 text-teal-700 font-semibold rounded-lg hover:bg-teal-200 transition-colors">
                            Register Interest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportProviderListingDetails;
