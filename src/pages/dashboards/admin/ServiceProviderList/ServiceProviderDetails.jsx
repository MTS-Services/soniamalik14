import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ServiceProviderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with actual data fetch based on id
  const providerDetails = {
    ownerName: 'George Nine',
    email: 'tonya.hill@example.com',
    phone: '+44 7700 900254',
    userRole: 'Club Owner',
    accountStatus: 'Active',
    joinedDate: 'March 12, 2023',
    businessName: 'HealX Physio Clinic',
    businessJoinedDate: '12 Feb 2025',
    description: 'HealX Physio Clinic provides professional sports physiotherapy for athletes, focusing on injury recovery, mobility improvements, and performance optimization.',
    clinicAddress: '14 Queen Street, London, UK',
    serviceArea: 'London, Birmingham, Manchester',
    workingDays: 'Mon - Sat',
    workingHours: '9:00 AM - 8:00 PM',
    logo: '/images/placeholder-logo.png' // Replace with actual logo path
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className=" mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Main Content Card */}
        <div className=" p-4 md:p-6 lg:p-8">
          {/* Header Section with Logo and Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white"></div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Owner Name:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">User Role:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.userRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Status:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.accountStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Joined Date:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="border-t pt-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Business Name:</p>
                <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.businessName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Joined Date:</p>
                <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.businessJoinedDate}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Description:</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {providerDetails.description}
              </p>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="border-t pt-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Location & Availability</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Clinic Address:</p>
                <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.clinicAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Service Area:</p>
                <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.serviceArea}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Working Days:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.workingDays}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Working Hours:</p>
                  <p className="text-sm md:text-base font-medium text-gray-900">{providerDetails.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
