import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  Code,
  AlertCircle
} from 'lucide-react';
import { GET } from '../../../../services/httpMethods';
import { ENDPOINT } from '../../../../services/httpEndpoint';

const formatReadableText = (value) => {
  if (!value) return 'N/A';
  return String(value)
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) return 'Date not set';

  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const formatSingleDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value);
    return formatter.format(parsed);
  };

  if (startDate && endDate && startDate !== endDate) {
    return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
  }

  return formatSingleDate(startDate || endDate);
};

const formatTimeRange = (startTime, endTime) => {
  if (!startTime && !endTime) return 'Time not set';

  const formatSingleTime = (value) => {
    if (!value) return null;

    const [hoursStr = '0', minutesStr = '0'] = String(value).split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) return String(value);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const start = formatSingleTime(startTime);
  const end = formatSingleTime(endTime);

  if (start && end) return `${start} - ${end}`;
  return start || end || 'Time not set';
};

const buildMapEmbedUrl = (event) => {
  if (!event) return '';

  const querySource = [event.fullAddress, event.venueName, event.city]
    .filter(Boolean)
    .join(', ')
    .trim();

  if (!querySource) return '';

  return `https://www.google.com/maps?q=${encodeURIComponent(querySource)}&output=embed`;
};

const EventSingleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchEventDetails = async () => {
      if (!id) {
        setError('Event id is missing from the route.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const response = await GET(ENDPOINT.EVENTS.DETAIL(id), {}, controller.signal);
        const payload = response?.data?.data || response?.data || response;

        if (!payload || typeof payload !== 'object') {
          throw new Error('Event details were not returned by the server.');
        }

        setEventData(payload);
      } catch (err) {
        if (err?.name === 'AbortError' || err?.name === 'CanceledError') return;

        const message = err?.response?.data?.message || err?.message || 'Failed to load event details.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();

    return () => controller.abort();
  }, [id]);

  const normalizedStatus = useMemo(() => String(eventData?.status || '').toUpperCase(), [eventData?.status]);
  const isPending = normalizedStatus === 'PENDING' || normalizedStatus === 'PENDING_APPROVAL';
  const isBanned = normalizedStatus === 'BANNED' || normalizedStatus === 'REJECTED';
  const allowsQuestions = Array.isArray(eventData?.responseMethods) && eventData.responseMethods.includes('Allow users to ask a question');
  const allowsBooking = Array.isArray(eventData?.responseMethods) && eventData.responseMethods.includes('Add booking link');
  const allowsRegisterInterest = Array.isArray(eventData?.responseMethods) && eventData.responseMethods.includes('Allow users to register interest');

  const dateValue = formatDateRange(eventData?.startDate, eventData?.endDate);
  const timeValue = formatTimeRange(eventData?.startTime, eventData?.endTime);
  const suitableForValue = Array.isArray(eventData?.suitableFor) && eventData.suitableFor.length > 0
    ? eventData.suitableFor.join(', ')
    : 'N/A';
  const ageGroupValue = eventData?.minAge ? `${eventData.minAge}+ Years` : 'N/A';
  const mapEmbedUrl = useMemo(() => buildMapEmbedUrl(eventData), [eventData]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-[#F8F9FA] relative font-sans pb-12 p-6 md:p-8">
        <p className="text-base text-gray-600">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto bg-[#F8F9FA] relative font-sans pb-12 p-6 md:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-black shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="bg-red-50 border border-red-100 rounded-xl p-5">
          <h3 className="text-xl font-semibold text-red-600 mb-1">Unable to load event</h3>
          <p className="text-base text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="flex-1 overflow-auto bg-[#F8F9FA] relative font-sans pb-12 p-6 md:p-8">
        <p className="text-base text-gray-600">No event details found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-[#F8F9FA]  relative font-sans pb-12">

      {/* 1. Pending Status Top Banner */}
      {isPending && (
        <div className="bg-[#789bb4] text-white px-6 py-2.5 flex justify-between items-center shadow-sm">
          <span className="font-semibold text-sm">Not approved by admin</span>
          <Code className="w-5 h-5 opacity-70" />
        </div>
      )}

      <div className=" p-4 md:p-8 space-y-6">

        {/* Hero Image Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm">
          <img
            src={eventData.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80'}
            alt="Event Banner"
            className="w-full h-64 md:h-96 object-cover"
          />
          {/* Back Button floating on image */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg text-black   transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* 2. Banned Status Alert Banner */}
        {isBanned && (
          <div className="bg-red-50/80 border border-red-100 rounded-xl p-5 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-1">This event was not approved</h3>
              <p className="text-base leading-relaxed text-red-500">
                {eventData.bannedReason || eventData.rejectionReason || 'Your event could not be published because it did not meet our guidelines.'}
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">

          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & Stats */}
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                {eventData.title || 'Untitled Event'}
              </h1>
              <div className="flex items-center gap-4 text-base font-medium text-gray-500 mb-6">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {eventData?.engagement?.views ?? 0}</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {eventData?.engagement?.trend ?? 0}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {eventData?.engagement?.messages ?? 0}</span>
                <span className="flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> {eventData.currentParticipants ?? 0}</span>
              </div>
            </div>

            {/* Sport & Event Type */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Sport</h3>
                <p className="text-base text-gray-600">{eventData.sportType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Event Type</h3>
                <p className="text-base text-gray-600">{formatReadableText(eventData.eventType)}</p>
              </div>
            </div>

            {/* Description */}
            <div className='max-w-4xl'>
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {eventData.description || 'No description added.'}
              </p>
            </div>

            {/* Date & Time */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-base text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>{dateValue}</span>
              </div>
              <div className="flex items-center gap-3 text-base text-gray-700">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{timeValue}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Who is suitable for</h3>
                <p className="text-base text-gray-600">{suitableForValue}</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Age Group:</h3>
                <p className="text-base text-gray-600">{ageGroupValue}</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Sport Type:</h3>
                <p className="text-base text-gray-600">{eventData.sportType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Skill Level:</h3>
                <p className="text-base text-gray-600">{formatReadableText(eventData.skillLevel)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-2.5 bg-btn-primary text-white text-base font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm disabled:opacity-50" disabled={!allowsBooking}>
                Book Now
              </button>
              <button className="px-6 py-2.5 bg-btn-primary text-white text-base font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm disabled:opacity-50" disabled={!allowsRegisterInterest}>
                Register Interest
              </button>
            </div>

            {/* Contact Organizer Form */}
            <div className={`bg-[#E7F1F1] p-4 rounded-lg border border-gray-100 max-w-lg mt-6 ${!allowsQuestions ? 'opacity-60' : ''}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Organizer</h2>
              <p className="text-lg text-gray-700 mb-3 font-medium">Ask the organiser a question</p>
              <textarea
                className="w-full h-32 bg-[#B5D5D2]/50 border-none rounded-lg p-3 text-base text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-btn-primary/20 outline-none resize-none mb-4"
                placeholder="Write your message"
                disabled={!allowsQuestions}
              ></textarea>
              <button className="px-6 py-2.5 bg-[#0F766E] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors shadow-sm disabled:opacity-50" disabled={!allowsQuestions}>
                Contact organiser
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Venue Card */}
          <div className="lg:col-span-1 lg:mt-4">
            <div className="bg-white rounded-xl border border-[#91C0BC] p-6 shadow-sm sticky top-6">

              {/* Venue Details */}
              <div className="mb-4 text-base">
                <span className="font-semibold text-gray-900 mr-2">Venue:</span>
                <span className="text-gray-600">{eventData.venueName || 'N/A'}</span>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-base text-gray-600 leading-snug">{eventData.fullAddress || eventData.city || 'N/A'}</span>
              </div>

              {mapEmbedUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-100 mb-3">
                  <iframe
                    title="Venue Map"
                    src={mapEmbedUrl}
                    className="w-full h-44"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

              {eventData.googleMapLink && (
                <a
                  href={eventData.googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </a>
              )}

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{eventData.organizerPhone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-gray-600 break-all">
                    <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>{eventData.organizerEmail || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Organized By */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Organized By:</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold tracking-wider">
                      {(eventData.organizerName || eventData?.organizer?.name || 'NA').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-base font-medium text-gray-900">{eventData.organizerName || eventData?.organizer?.name || 'N/A'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventSingleDetails;