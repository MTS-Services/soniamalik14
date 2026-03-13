import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useEvent } from '../../../../context/EventContext';

const EventSingleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchEventById } = useEvent();
  const passedEvent = location.state?.event || null;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!passedEvent?.id) {
        console.error('No event ID provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await fetchEventById(passedEvent.id);
      if (result.success && result.event) {
        setEventData(result.event);
      } else {
        // Fallback to passed event if API fails
        setEventData(passedEvent);
      }
      setLoading(false);
    };

    fetchData();
  }, [passedEvent, fetchEventById]);

  // Sample images - using images from public folder or from API
  const getEventImages = () => {
    if (eventData?.image) {
      return [eventData.image, eventData.image, eventData.image, eventData.image];
    }
    return [
      '/images/detaisPage/detailsBanner.png',
      '/images/detaisPage/sideImage1.png',
      '/images/marketplace/image_1.jpg',
      '/images/marketplace/image_3.jpg',
    ];
  };

  const images = eventData ? getEventImages() : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (startDate, endDate) => {
    if (!startDate) return '-';
    try {
      const start = new Date(startDate);
      const startTime = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      if (endDate) {
        const end = new Date(endDate);
        const endTime = end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${startTime} — ${endTime}`;
      }

      return startTime;
    } catch {
      return '-';
    }
  };

  const formatEnum = (value) => {
    if (!value) return '-';
    return String(value).replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase().split(' ').map(s => s ? s[0].toUpperCase() + s.slice(1) : '').join(' ');
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Event not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#0F766E] text-white rounded-md hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      <div className=" mx-auto p-4 md:p-6 lg:p-8">

        {/* Image Gallery Section */}
        <div className="mb-6">
          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden mb-3">
            <img
              src={images[selectedImage]}
              alt="Event"
              className="w-full h-64 md:h-80 lg:h-160 object-cover"
              onError={(e) => {
                e.target.src = '/images/detaisPage/detailsBanner.png';
              }}
            />
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-white transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
              <span className="text-base font-medium">Back</span>
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-3">
            {images.slice(1, 4).map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                className={`rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index + 1 ? 'border-[#0F766E]' : 'border-transparent'
                  }`}
              >
                <img
                  src={img}
                  alt={`Event ${index + 2}`}
                  className="w-full h-24 md:h-74 object-cover hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = '/images/marketplace/image_4.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Event Details Section */}
        <div className="space-y-6">
          {/* Title & Description */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {eventData.title}
            </h1>
            <div className="text-base md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
              {eventData.description || 'No description available'}
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-base md:text-base text-gray-700">
              <Calendar size={18} className="text-gray-400" />
              <span>{formatDate(eventData.startDate)}</span>
            </div>
            <div className="flex items-center gap-3 text-base md:text-base text-gray-700">
              <Clock size={18} className="text-gray-400" />
              <span>{formatTime(eventData.startDate, eventData.endDate)}</span>
            </div>
          </div>

          {/* Age Group, Skill Level, Registration Fee */}
          <div className="space-y-4">
            {eventData.minAge && (
              <div>
                <h3 className="text-base font-semibold text-gray-900">Age Group:</h3>
                <p className="text-base text-gray-600">{eventData.minAge}+ Years</p>
              </div>
            )}
            {eventData.skillLevel && (
              <div>
                <h3 className="text-base font-semibold text-gray-900">Skill Level:</h3>
                <p className="text-base text-gray-600">{formatEnum(eventData.skillLevel)}</p>
              </div>
            )}
            {eventData.registrationFee !== undefined && (
              <div>
                <h3 className="text-base font-semibold text-gray-900">Registration Fee:</h3>
                <p className="text-base text-gray-600">{eventData.registrationFee === 0 ? 'Free' : `$${eventData.registrationFee}`}</p>
              </div>
            )}
            {eventData.maxParticipants && (
              <div>
                <h3 className="text-base font-semibold text-gray-900">Max Participants:</h3>
                <p className="text-base text-gray-600">{eventData.maxParticipants} {eventData.currentParticipants ? `(${eventData.currentParticipants} registered)` : ''}</p>
              </div>
            )}
          </div>

          {/* Venue Card */}
          <div className="bg-white rounded-xl border max-w-xl border-gray-200 p-4 md:p-6 shadow-sm">
            {/* Venue Header */}
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base font-semibold text-gray-900">Venue:</span>
              <span className="text-base text-gray-600">{eventData.venueName || 'TBD'}</span>
            </div>

            {/* Address */}
            {eventData.fullAddress && (
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="text-base text-gray-600">{eventData.fullAddress}</span>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="rounded-lg overflow-hidden mb-6">
              {(eventData.googleMapLink || eventData.fullAddress) ? (
                <iframe
                  src={
                    eventData.googleMapLink?.includes('embed')
                      ? eventData.googleMapLink
                      : `https://maps.google.com/maps?q=${encodeURIComponent(eventData.fullAddress || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`
                  }
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Map"
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-90 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Map not available
                </div>
              )}
            </div>

            {/* Contact Information */}
            {(eventData.organizerPhone || eventData.organizerEmail) && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {eventData.organizerPhone && (
                    <div className="flex items-center gap-2 text-base text-gray-600">
                      <Phone size={16} className="text-gray-400" />
                      <span>{eventData.organizerPhone}</span>
                    </div>
                  )}
                  {eventData.organizerEmail && (
                    <div className="flex items-center gap-2 text-base text-gray-600">
                      <Mail size={16} className="text-gray-400" />
                      <span>{eventData.organizerEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Organized By */}
            {eventData.organizerName && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Organized By:</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    {eventData.organizerLogo ? (
                      <img
                        src={eventData.organizerLogo}
                        alt="Organizer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="text-white text-xs font-bold">${eventData.organizerName?.substring(0, 2).toUpperCase()}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-white text-xs font-bold">{eventData.organizerName?.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-base font-medium text-gray-900">{eventData.organizerName}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSingleDetails;
