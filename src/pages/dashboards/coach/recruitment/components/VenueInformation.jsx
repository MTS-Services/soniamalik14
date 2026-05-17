import React from 'react';

const VenueInformation = ({ item }) => {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-[#1A1D1F]">Venue Information</h3>
      <div className="flex h-auto flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:h-100">
        <div className="mb-6 flex-1 space-y-3">
          <p className="flex text-base">
            <span className="w-28 shrink-0 font-medium text-[#1A1D1F]">Venue Name:</span>
            <span className="text-[#1A1D1F]">
              {item.venueName || item.trialLocation || item.location || 'N/A'}
            </span>
          </p>
          <p className="flex text-base">
            <span className="w-28 shrink-0 font-medium text-[#1A1D1F]">Postcode:</span>
            <span className="text-[#1A1D1F]">{item.postcode || 'N/A'}</span>
          </p>
          <p className="flex text-base">
            <span className="w-28 shrink-0 font-medium text-[#1A1D1F]">Town/City:</span>
            <span className="text-[#1A1D1F]">{item.town || 'N/A'}</span>
          </p>
          <p className="flex text-base">
            <span className="w-28 shrink-0 font-medium text-[#1A1D1F]">Session Days:</span>
            <span className="text-[#1A1D1F]">
              {item.typicalSessionDays || item.matchDays || item.day || 'N/A'}
            </span>
          </p>
          <p className="flex text-base">
            <span className="w-28 shrink-0 font-medium text-[#1A1D1F]">Session Time:</span>
            <span className="text-[#1A1D1F]">
              {item.sessionTime || item.times || item.time || 'N/A'}
            </span>
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="h-36 w-full shrink-0 overflow-hidden rounded-lg bg-gray-200">
          {item.mapImage ? (
            <img src={item.mapImage} alt="Map View" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              Map View
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueInformation;
