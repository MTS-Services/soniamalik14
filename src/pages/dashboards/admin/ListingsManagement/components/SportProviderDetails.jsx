import React from 'react';
import { MapPin, Calendar, Clock, Users, Heart, MessageSquare } from 'lucide-react';

const SportProviderDetails = ({ data }) => {
    return (
        <div className="space-y-6">

            {/* Header Info */}
            <div className="border-b pb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.listing}</h3>
                <p className="text-gray-600 mb-4">{data.provider}</p>
                <div className="text-sm text-gray-500">{data.date}</div>
            </div>

            {/* Session Details */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h4>
                <p className="text-gray-600 mb-4">This is a {data.category} session designed for players who want to improve their skills in a relaxed and supportive environment. Whether you're completely new to the sport or looking to brush up on your technique, this session provides a space to learn, practice, and enjoy the game at your own pace.</p>
            </div>

            {/* Session Overview */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Session Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Open Class</p>
                            <p className="text-sm text-gray-600">Yes</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Suitable For</p>
                            <p className="text-sm text-gray-600">All Levels</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Venue Information */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Venue Information</h4>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Location</p>
                            <p className="text-gray-600">{data.provider}</p>
                            <p className="text-sm text-gray-600">Postcode: {data.postcode}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Session Days</p>
                            <p className="text-gray-600">Saturday</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Session Time</p>
                            <p className="text-gray-600">10:00 - 12:00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Engagement Stats */}
            {data.engagement && (
                <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Engagement</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{data.engagement.views}</p>
                            <p className="text-xs text-gray-600">Views</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">+{data.engagement.trend}%</p>
                            <p className="text-xs text-gray-600">Growth</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{data.engagement.messages}</p>
                            <p className="text-xs text-gray-600">Messages</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-600">{data.engagement.shares}</p>
                            <p className="text-xs text-gray-600">Shares</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                    Book Your Place
                </button>
                <button className="flex-1 px-6 py-2 bg-teal-100 text-teal-700 font-medium rounded-lg hover:bg-teal-200 transition-colors">
                    Register Interest
                </button>
            </div>
        </div>
    );
};

export default SportProviderDetails;
