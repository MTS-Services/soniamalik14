import React from 'react';

const VenueInformation = ({ item }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Venue Information</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-auto md:h-[400px] flex flex-col">
                <div className="space-y-3 mb-6 flex-1">
                    <p className="text-base flex">
                        <span className="text-[#1A1D1F] w-28 shrink-0 font-medium">Venue Name:</span>
                        <span className="text-[#1A1D1F]">{item.venueName || item.trialLocation || item.location || 'N/A'}</span>
                    </p>
                    <p className="text-base flex">
                        <span className="text-[#1A1D1F] w-28 shrink-0 font-medium">Postcode:</span>
                        <span className="text-[#1A1D1F]">{item.postcode || 'N/A'}</span>
                    </p>
                    <p className="text-base flex">
                        <span className="text-[#1A1D1F] w-28 shrink-0 font-medium">Town/City:</span>
                        <span className="text-[#1A1D1F]">{item.town || 'N/A'}</span>
                    </p>
                    <p className="text-base flex">
                        <span className="text-[#1A1D1F] w-28 shrink-0 font-medium">Session Days:</span>
                        <span className="text-[#1A1D1F]">{item.typicalSessionDays || item.matchDays || item.day || 'N/A'}</span>
                    </p>
                    <p className="text-base flex">
                        <span className="text-[#1A1D1F] w-28 shrink-0 font-medium">Session Time:</span>
                        <span className="text-[#1A1D1F]">{item.sessionTime || item.times || item.time || 'N/A'}</span>
                    </p>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    {item.mapImage ? (
                        <img src={item.mapImage} alt="Map View" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Map View</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VenueInformation;
