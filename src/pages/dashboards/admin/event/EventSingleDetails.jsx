import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

const EventSingleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || null;

  // Sample images - using images from public folder
  const images = [
    '/images/detaisPage/detailsBanner.png',
    '/images/detaisPage/sideImage1.png',
    '/images/marketplace/image_1.jpg',
    '/images/marketplace/image_3.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  // Default event data - merge with passed event
  const defaultEventData = {
    title: "Women's Open Football Training Camp",
    type: 'Training',
    organizer: 'Rising Queens Football Academy',
    role: 'Club Owner',
    sport: 'Football',
    date: 'Saturday, 12 October 2025',
    time: '4:00 PM – 7:00 PM',
    status: 'Pending',
    description: `This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.

Whether you are preparing for upcoming matches or looking to sharpen your fundamentals, this camp provides professional guidance and structured training. Players will train under experienced coaches and get valuable feedback to help them grow confidently on the field.`,
    ageGroup: '16+ Years',
    skillLevel: 'Beginner to Intermediate',
    lastDateToRegister: '8 October 2025',
    venue: {
      name: 'City Sports Ground',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    },
    contact: {
      phone: '(406) 555-0120',
      email: 'nevaeh.simmons@example.com',
    },
    organizerLogo: '/images/login/image_1.jpg',
  };

  // Merge passed event with defaults (passed event overrides defaults)
  const eventData = {
    ...defaultEventData,
    ...event,
    venue: event?.venue || defaultEventData.venue,
    contact: event?.contact || defaultEventData.contact,
  };

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
                className={`rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === index + 1 ? 'border-[#0F766E]' : 'border-transparent'
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
              {eventData.description}
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-base md:text-base text-gray-700">
              <Calendar size={18} className="text-gray-400" />
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center gap-3 text-base md:text-base text-gray-700">
              <Clock size={18} className="text-gray-400" />
              <span>{eventData.time}</span>
            </div>
          </div>

          {/* Age Group, Skill Level, Last Date */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Age Group:</h3>
              <p className="text-base text-gray-600">{eventData.ageGroup}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Skill Level:</h3>
              <p className="text-base text-gray-600">{eventData.skillLevel}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Last Date to Register</h3>
              <p className="text-base text-gray-600">{eventData.lastDateToRegister}</p>
            </div>
          </div>

          {/* Venue Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            {/* Venue Header */}
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base font-semibold text-gray-900">Venue:</span>
              <span className="text-base text-gray-600">{eventData.venue.name}</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 mb-4">
              <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-base text-gray-600">{eventData.venue.address}</span>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-lg overflow-hidden mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280949928!2d-74.11976363947844!3d40.69766374869795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1638378656693!5m2!1sen!2sbd"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
                className="rounded-lg"
              />
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-base text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{eventData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-base text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span>{eventData.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Organized By */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Organized By:</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={eventData.organizerLogo}
                    alt="Organizer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-white text-xs font-bold">RQ</span>';
                    }}
                  />
                </div>
                <span className="text-base font-medium text-gray-900">{eventData.organizer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSingleDetails;
