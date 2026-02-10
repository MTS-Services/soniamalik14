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
    logo: '/images/placeholder-logo.png'
  };

  return (
    <div className="min-h-screen bg-gray-50 dashboardPy dashboardSpaceY">
      <div className="mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-base font-medium">Back</span>
        </button>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
          {/* Left Column - Business Details */}
          <div className="space-y-6">
            {/* Logo and Business Name */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={providerDetails.logo}
                  alt={providerDetails.businessName}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover bg-gray-100 max-w-full h-auto"
                />
              </div>
            </div>
            
            <div>
              <p className="text-base text-gray-600 mb-1">Business Name: <span className="font-medium text-gray-900">{providerDetails.businessName}</span></p>
              <p className="text-base text-gray-600">Joined Date: <span className="font-medium text-gray-900">{providerDetails.businessJoinedDate}</span></p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Description:</h3>
              <p className="text-base lg:max-w-2xl text-gray-700 leading-relaxed">
                {providerDetails.description}
              </p>
            </div>

            {/* Location & Availability */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Location & Availability</h3>
              <div className="space-y-2.5">
                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-900">Clinic Address:</span> {providerDetails.clinicAddress}
                </p>
                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-900">Service Area:</span> {providerDetails.serviceArea}
                </p>
                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-900">Working Days:</span> {providerDetails.workingDays}
                </p>
                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-900">Working Hours:</span> {providerDetails.workingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Owner Details Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit space-y-4">
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">Owner Name:</span>{' '} {providerDetails.ownerName}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">Email:</span>{' '} {providerDetails.email}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">Phone:</span>{' '} {providerDetails.phone}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">User Role:</span>{' '} {providerDetails.userRole}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">Account Status:</span> {' '} {providerDetails.accountStatus}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1"><span className="font-medium text-gray-900">Joined Date:</span> {' '} {providerDetails.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}