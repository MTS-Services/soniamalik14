import React from 'react';
import { MapPin, Calendar, Clock, Edit3, Trash2 } from 'lucide-react';

const ListingCard = ({ listing, onEdit, onDelete }) => {
    return (
        <div className="bg-[#E7F1F180] rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
            {/* Card Image Area */}
            <div className="relative h-52 bg-[#D9D9D9] rounded-xl mb-5 overflow-hidden">
                {listing.image && (
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-3 left-3 bg-[#E7F1F1] px-4 py-1 rounded-full text-sm  text-[#0D766E] shadow-sm ">
                    {listing.category}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-4 flex-grow px-1">
                <h3 className="text-xl font-bold text-[#1F2937] leading-tight">
                    {listing.title}
                </h3>

                <div className="space-y-3 text-[14px] text-[#4B5563]">
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#4B5563]" />
                        <span className="leading-relaxed">{listing.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="flex-shrink-0 text-[#4B5563]" />
                        <span>{listing.days}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={18} className="flex-shrink-0 text-[#4B5563]" />
                        <span>{listing.time}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 mt-auto">
                <button
                    onClick={() => onEdit(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#137D74] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#0e5e57] transition-all shadow-sm"
                >
                    <Edit3 size={18} strokeWidth={2.5} />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#B5D5D2] border border-[#0F766E] text-[#137D74] py-3 rounded-lg text-sm font-bold hover:bg-[#a5cfcd] transition-all  shadow-sm"
                >
                    <Trash2 size={18} strokeWidth={2.5} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ListingCard;