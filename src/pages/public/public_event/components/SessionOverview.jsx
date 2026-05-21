import React, { useState } from 'react';
import { Medal, Calendar, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { POST } from '../../../../services/httpMethods';
import { getUser } from '../../../../utils/storage';

const SessionOverview = ({ event }) => {
  const authUser = useSelector((state) => state.auth?.user);
  const currentUser = authUser || getUser();

  const [interestStatus, setInterestStatus] = useState('idle'); // idle | loading | success | error
  const [interestMsg, setInterestMsg] = useState('');
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle | loading | success | error
  const [bookingMsg, setBookingMsg] = useState('');

  if (!event) return null;

  const handleRegisterInterest = async () => {
    if (!event.id) return;
    setInterestStatus('loading');
    setInterestMsg('');
    try {
      await POST(`/api/events/${event.id}/interest`, {});
      setInterestStatus('success');
      setInterestMsg('Interest registered!');
    } catch (e) {
      setInterestStatus('error');
      setInterestMsg(e?.response?.data?.message || 'Failed to register interest');
    }
  };

  const handleBookPlace = async () => {
    if (!event.id) return;

    const fullName =
      currentUser?.name ||
      [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(' ') ||
      '';
    const email = currentUser?.email || '';
    const phoneNumber = currentUser?.phoneNumber || currentUser?.phone || currentUser?.mobile || '';

    if (!fullName || !email || !phoneNumber) {
      setBookingStatus('error');
      setBookingMsg('Please login with complete profile info (name, email, phone) to book.');
      return;
    }

    setBookingStatus('loading');
    setBookingMsg('');

    try {
      const response = await POST(`/api/events/${event.id}/register`, {
        fullName,
        email,
        phoneNumber,
        notes: `Booking request for ${event.title || 'event'}`,
      });

      const successMessage = response?.data?.message || response?.message || 'Booked successfully!';
      setBookingStatus('success');
      setBookingMsg(successMessage);
    } catch (e) {
      setBookingStatus('error');
      setBookingMsg(e?.response?.data?.message || 'Failed to book your place');
    }
  };

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
        <button
          className={`rounded-lg bg-[#0F766E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0D655D] ${bookingStatus === 'success' ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleBookPlace}
          disabled={bookingStatus === 'loading' || bookingStatus === 'success'}
        >
          {bookingStatus === 'loading' ? 'Booking...' : bookingStatus === 'success' ? 'Booked' : 'Book Your Place'}
        </button>
        <button
          className={`rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0D655D] ${interestStatus === 'success' ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleRegisterInterest}
          disabled={interestStatus === 'loading' || interestStatus === 'success'}
        >
          {interestStatus === 'loading' ? 'Registering...' : interestStatus === 'success' ? 'Registered' : 'Register Interest'}
        </button>
        {bookingMsg && (
          <span className={`ml-2 text-xs ${bookingStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>{bookingMsg}</span>
        )}
        {interestMsg && (
          <span className={`ml-2 text-xs ${interestStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>{interestMsg}</span>
        )}
      </div>
    </div>
  );
};

export default SessionOverview;
