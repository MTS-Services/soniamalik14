import React from 'react';
import { MapPin, Calendar, Clock, Award, DollarSign, MessageSquare } from 'lucide-react';

const ServiceProviderDetails = ({ data }) => {
    return (
        <div className="space-y-6">

            {/* Header Info */}
            <div className="border-b pb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.listing}</h3>
                <p className="text-gray-600 mb-4">{data.provider}</p>
                <div className="text-sm text-gray-500">{data.date}</div>
            </div>

            {/* Service Details */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h4>
                <p className="text-gray-600 mb-4">Professional {data.category} service provided by certified and experienced practitioners. Our service is designed to help athletes recover, prevent injuries, and improve their overall performance. We offer personalized treatment plans tailored to individual needs.</p>
            </div>

            {/* Service Overview */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Service Type</p>
                            <p className="text-sm text-gray-600">Professional</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Pricing</p>
                            <p className="text-sm text-gray-600">On Request</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Information */}
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h4>
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
                            <p className="font-medium text-gray-900">Availability</p>
                            <p className="text-gray-600">Monday - Friday</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-gray-900">Operating Hours</p>
                            <p className="text-gray-600">09:00 - 18:00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Engagement Stats */}
            {data.engagement && (
                <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Engagement</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-2xl font-bold text-green-600">{data.engagement.views}</p>
                            <p className="text-xs text-gray-600">Views</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">+{data.engagement.trend}%</p>
                            <p className="text-xs text-gray-600">Growth</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{data.engagement.messages}</p>
                            <p className="text-xs text-gray-600">Inquiries</p>
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
                    Book Service
                </button>
                <button className="flex-1 px-6 py-2 bg-teal-100 text-teal-700 font-medium rounded-lg hover:bg-teal-200 transition-colors">
                    Request Quote
                </button>
            </div>
        </div>
    );
};

export default ServiceProviderDetails;
