import React from 'react';
import { MapPin, Clock, Trash2 } from 'lucide-react';

const EventCard = ({ title, location, time, imageSrc, onViewDetails, onDelete }) => (
  <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow p-4">
    <div className="h-48 md:h-56 overflow-hidden bg-gray-200 rounded-lg mb-4">
      <img 
        src={imageSrc || "/api/placeholder/400/250"} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 flex-shrink-0" />
          <span className="text-base md:text-lg">{location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <span className="text-base md:text-lg">{time}</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={onViewDetails}
          className="flex-1 bg-btn-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-base md:text-lg"
        >
          View Details
        </button>
        
        <button
          onClick={onDelete}
          className="px-4 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center gap-2"
          title="Delete event"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default EventCard;
