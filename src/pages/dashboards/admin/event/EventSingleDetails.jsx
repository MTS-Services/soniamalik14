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
  AlertCircle,
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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    const fetchEventDetails = async () => {
      if (!id) {
        if (isCurrentRequest) {
          setError('Event id is missing from the route.');
          setIsLoading(false);
          setHasLoaded(true);
        }
        return;
      }

      try {
        if (isCurrentRequest) {
          setIsLoading(true);
          setHasLoaded(false);
          setError('');
          setEventData(null);
        }

        const response = await GET(ENDPOINT.EVENTS.DETAIL(id), {}, controller.signal);
        const payload = response?.data?.data || response?.data || response;

        if (!payload || typeof payload !== 'object') {
          throw new Error('Event details were not returned by the server.');
        }

        if (isCurrentRequest) {
          setEventData(payload);
        }
      } catch (err) {
        if (err?.name === 'AbortError' || err?.name === 'CanceledError') return;

        const message =
          err?.response?.data?.message || err?.message || 'Failed to load event details.';
        if (isCurrentRequest) {
          setError(message);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
          setHasLoaded(true);
        }
      }
    };

    fetchEventDetails();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [id]);

  const normalizedStatus = useMemo(
    () => String(eventData?.status || '').toUpperCase(),
    [eventData?.status]
  );
  const isPending = normalizedStatus === 'PENDING' || normalizedStatus === 'PENDING_APPROVAL';
  const isBanned = normalizedStatus === 'BANNED' || normalizedStatus === 'REJECTED';
  const allowsQuestions =
    Array.isArray(eventData?.responseMethods) &&
    eventData.responseMethods.includes('Allow users to ask a question');
  const allowsBooking =
    Array.isArray(eventData?.responseMethods) &&
    eventData.responseMethods.includes('Add booking link');
  const allowsRegisterInterest =
    Array.isArray(eventData?.responseMethods) &&
    eventData.responseMethods.includes('Allow users to register interest');

  const dateValue = formatDateRange(eventData?.startDate, eventData?.endDate);
  const timeValue = formatTimeRange(eventData?.startTime, eventData?.endTime);
  const suitableForValue =
    Array.isArray(eventData?.suitableFor) && eventData.suitableFor.length > 0
      ? eventData.suitableFor.join(', ')
      : 'N/A';
  const ageGroupValue = eventData?.minAge ? `${eventData.minAge}+ Years` : 'N/A';
  const mapEmbedUrl = useMemo(() => buildMapEmbedUrl(eventData), [eventData]);

  if (isLoading || !hasLoaded) {
    return (
      <div className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-auto bg-[#F8F9FA] p-6 font-sans md:p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="border-t-btn-primary h-10 w-10 animate-spin rounded-full border-4 border-[#91C0BC]" />
          <p className="text-sm font-medium text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex-1 overflow-auto bg-[#F8F9FA] p-6 pb-12 font-sans md:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <h3 className="mb-1 text-xl font-semibold text-red-600">Unable to load event</h3>
          <p className="text-base text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="relative flex-1 overflow-auto bg-[#F8F9FA] p-6 pb-12 font-sans md:p-8">
        <p className="text-base text-gray-600">No event details found.</p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-auto bg-[#F8F9FA] pb-12 font-sans">
      {/* 1. Pending Status Top Banner */}
      {isPending && (
        <div className="flex items-center justify-between bg-[#789bb4] px-6 py-2.5 text-white shadow-sm">
          <span className="text-sm font-semibold">Not approved by admin</span>
          <Code className="h-5 w-5 opacity-70" />
        </div>
      )}

      <div className="space-y-6 p-4 md:p-8">
        {/* Hero Image Section */}
        <div className="relative overflow-hidden rounded-xl shadow-sm">
          <img
            src={eventData.image}
            alt="Event Banner"
            className="h-64 w-full object-cover md:h-96 lg:h-100 xl:h-140 2xl:h-186"
          />
          {/* Back Button floating on image */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 text-black shadow-sm backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* 2. Banned Status Alert Banner */}
        {isBanned && (
          <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50/80 p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div>
              <h3 className="mb-1 text-xl font-semibold text-red-600">
                This event was not approved
              </h3>
              <p className="text-base leading-relaxed text-red-500">
                {eventData.bannedReason ||
                  eventData.rejectionReason ||
                  'Your event could not be published because it did not meet our guidelines.'}
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 pt-2 xl:grid-cols-3">
          {/* LEFT COLUMN: Details */}
          <div className="space-y-6 xl:col-span-2">
            {/* Title & Stats */}
            <div>
              <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
                {eventData.title || 'Untitled Event'}
              </h1>
              <div className="mb-6 flex items-center gap-4 text-base font-medium text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {eventData?.engagement?.views ?? 0}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" /> {eventData?.engagement?.trend ?? 0}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" /> {eventData?.engagement?.messages ?? 0}
                </span>
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="h-4 w-4" /> {eventData.currentParticipants ?? 0}
                </span>
              </div>
            </div>

            {/* Sport & Event Type */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Sport</h3>
                <p className="text-base text-gray-600">{eventData.sportType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Event Type</h3>
                <p className="text-base text-gray-600">{formatReadableText(eventData.eventType)}</p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl">
              <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">
                {eventData.description || 'No description added.'}
              </p>
            </div>

            {/* Date & Time */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-base text-gray-700">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{dateValue}</span>
              </div>
              <div className="flex items-center gap-3 text-base text-gray-700">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>{timeValue}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Who is suitable for</h3>
                <p className="text-base text-gray-600">{suitableForValue}</p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Age Group:</h3>
                <p className="text-base text-gray-600">{ageGroupValue}</p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Sport Type:</h3>
                <p className="text-base text-gray-600">{eventData.sportType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">Skill Level:</h3>
                <p className="text-base text-gray-600">
                  {formatReadableText(eventData.skillLevel)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                className="bg-btn-primary rounded-lg px-6 py-2.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:opacity-50"
                disabled={!allowsBooking}
              >
                Book Now
              </button>
              <button
                className="bg-btn-primary rounded-lg px-6 py-2.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:opacity-50"
                disabled={!allowsRegisterInterest}
              >
                Register Interest
              </button>
            </div>

            {/* Contact Organizer Form */}
            <div
              className={`mt-6 max-w-lg rounded-lg border border-gray-100 bg-[#E7F1F1] p-4 ${!allowsQuestions ? 'opacity-60' : ''}`}
            >
              <h2 className="mb-4 text-xl font-bold text-gray-900">Contact Organizer</h2>
              <p className="mb-3 text-lg font-medium text-gray-700">Ask the organiser a question</p>
              <textarea
                className="focus:ring-btn-primary/20 mb-4 h-32 w-full resize-none rounded-lg border-none bg-[#B5D5D2]/50 p-3 text-base text-gray-700 placeholder-gray-500 outline-none focus:ring-2"
                placeholder="Write your message"
                disabled={!allowsQuestions}
              ></textarea>
              <button
                className="rounded-lg bg-[#0F766E] px-6 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-teal-800 disabled:opacity-50"
                disabled={!allowsQuestions}
              >
                Contact organiser
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Venue Card */}
          <div className="lg:col-span-1 lg:mt-4">
            <div className="sticky top-6 rounded-xl border border-[#91C0BC] bg-white p-6 shadow-sm">
              {/* Venue Details */}
              <div className="mb-4 text-base">
                <span className="mr-2 font-semibold text-gray-900">Venue:</span>
                <span className="text-gray-600">{eventData.venueName || 'N/A'}</span>
              </div>

              <div className="mb-4 flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                <span className="text-base leading-snug text-gray-600">
                  {eventData.fullAddress || eventData.city || 'N/A'}
                </span>
              </div>

              {mapEmbedUrl && (
                <div className="mb-3 overflow-hidden rounded-lg border border-gray-100">
                  <iframe
                    title="Venue Map"
                    src={mapEmbedUrl}
                    className="h-44 w-full"
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
                  className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in Google Maps
                </a>
              )}

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{eventData.organizerPhone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base break-all text-gray-600">
                    <Mail className="h-5 w-5 shrink-0 text-gray-400" />
                    <span>{eventData.organizerEmail || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Organized By */}
              <div>
                <h3 className="mb-3 text-base font-bold text-gray-900">Organized By:</h3>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] shadow-sm">
                    <span className="text-sm font-bold tracking-wider text-white">
                      {(eventData.organizerName || eventData?.organizer?.name || 'NA')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    {eventData.organizerName || eventData?.organizer?.name || 'N/A'}
                  </span>
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
