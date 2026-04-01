import React from 'react';
import { MapPin, Calendar, Clock, Edit3, Trash2 } from 'lucide-react';

const ListingCard = ({ listing, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col h-full">
            {/* Card Image Area */}
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#007A70] uppercase shadow-sm">
                    {listing.category}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-3 flex-grow">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{listing.title}</h3>

                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="line-clamp-2">{listing.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="flex-shrink-0 text-gray-400" />
                        <span>{listing.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="flex-shrink-0 text-gray-400" />
                        <span>{listing.time}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 mt-auto">
                <button
                    onClick={() => onEdit(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#007A70] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#00665e] transition-colors"
                >
                    <Edit3 size={16} />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#E6F4F3] text-[#007A70] py-2.5 rounded-lg text-sm font-medium hover:bg-[#d1e9e7] transition-colors border border-[#B8DEDC]"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ListingCard;
