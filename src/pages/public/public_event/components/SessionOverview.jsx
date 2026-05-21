import React from 'react';
import { Medal, Calendar, Users } from 'lucide-react';

const SessionOverview = ({ event }) => {
  if (!event) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Session Overview</h3>
      <div className="space-y-3 mb-6">
        
        {/* Info Row: Sport */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-lg border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
            <Medal className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base text-[#101828] font-medium mb-0.5">Sport</p>
            <p className="text-base text-[#4A5565]">{event.sport}</p>
          </div>
        </div>

        {/* Info Row: Event Type */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base text-[#101828] font-medium mb-0.5">Event Type</p>
            <p className="text-base text-[#4A5565]">{event.type}</p>
          </div>
        </div>

        {/* Info Row: Suitable For */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base text-[#101828] font-medium mb-0.5">Suitable For</p>
            <p className="text-base text-[#4A5565]">{event.suitableFor}</p>
          </div>
        </div>

        {/* Info Row: Women's only */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center text-[#147B6B]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base text-[#101828] font-medium mb-0.5">Women's only</p>
            <p className="text-base text-[#4A5565]">{event.womensOnly}</p>
          </div>
        </div>

      </div>
      
      {/* Action Buttons */}
      <div className="hidden md:flex flex-wrap gap-3">
        <button className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Book Your Place
        </button>
        <button className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Register Interest
        </button>
      </div>
    </div>
  );
};

export default SessionOverview;
