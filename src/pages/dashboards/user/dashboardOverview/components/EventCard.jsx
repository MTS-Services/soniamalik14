import React from 'react';
import { FiMapPin, FiClock } from 'react-icons/fi';

const EventCard = ({ title, location, time, imageSrc }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="h-48 overflow-hidden bg-gray-200">
      <img 
        src={imageSrc || "/api/placeholder/400/250"} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <div className="mt-2 flex items-center text-gray-500 text-sm">
        <FiMapPin className="mr-2" /> {location}
      </div>
      <div className="mt-1 flex items-center text-gray-500 text-sm">
        <FiClock className="mr-2" /> {time}
      </div>
      <button className="w-full mt-4 bg-[#147A73] text-white py-2 rounded-lg font-medium hover:bg-[#0d5e58] transition-colors">
        View Details
      </button>
    </div>
  </div>
);

export default EventCard;
