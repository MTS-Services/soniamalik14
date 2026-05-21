import React from 'react';
import { Medal, Calendar, Users } from 'lucide-react';

const SessionOverview = ({ event }) => {
  if (!event) return null;

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-[#1A1D1F]">Session Overview</h3>
      <div className="mb-6 space-y-3">
        {/* Info Row: Sport */}
        <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F1] text-[#147B6B]">
            <Medal className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-0.5 text-base font-medium text-[#101828]">Sport</p>
            <p className="text-base text-[#4A5565]">{event.sport}</p>
          </div>
        </div>

        {/* Info Row: Event Type */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F1] text-[#147B6B]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-0.5 text-base font-medium text-[#101828]">Event Type</p>
            <p className="text-base text-[#4A5565]">{event.type}</p>
          </div>
        </div>

        {/* Info Row: Suitable For */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F1] text-[#147B6B]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-0.5 text-base font-medium text-[#101828]">Suitable For</p>
            <p className="text-base text-[#4A5565]">{event.suitableFor}</p>
          </div>
        </div>

        {/* Info Row: Women's only */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F1] text-[#147B6B]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-0.5 text-base font-medium text-[#101828]">Women's only</p>
            <p className="text-base text-[#4A5565]">{event.womensOnly}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hidden flex-wrap gap-3 md:flex">
        <button className="rounded-lg bg-[#0F766E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0D655D]">
          Book Your Place
        </button>
        <button className="rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0D655D]">
          Register Interest
        </button>
      </div>
    </div>
  );
};

export default SessionOverview;
