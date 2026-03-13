import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Phone, Mail } from 'lucide-react';
import Container from '../../../components/layout/Container';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = {
    id,
    title: "Women's Open Football Training Camp",
    image: '/images/detaisPage/detailsBanner.png',
    image2: '/images/detaisPage/sideImage1.png',
    image3: '/images/detaisPage/sideImage1.png',
    description:
      'This training camp is designed exclusively for women footballers who want to improve their skills, fitness, and overall match performance. The session will focus on technical drills, tactical awareness, team coordination, and physical conditioning in a supportive and competitive environment.',
    date: 'Saturday, 12 October 2025',
    time: '4:00 PM - 7:00 PM',
    ageGroup: '16+ Years',
    skillLevel: 'Beginner to Intermediate',
    lastDateToRegister: '8 October 2025',
    venue: 'City Sports Ground',
    locationText: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    contactPhone: '(406) 555-0120',
    contactEmail: 'nevaeh.simmons@example.com',
    organizedBy: 'Rising Queens Football Academy',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted â€” demo only');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Container>
        <div className="py-4 md:py-6 lg:py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-[#323232] hover:text-[#1D1D1D] md:mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="mb-4 w-full overflow-hidden rounded-lg bg-gray-200 md:mb-6">
            <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 md:h-96 lg:h-205">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Full width gallery under hero */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="h-52 overflow-hidden rounded-md sm:h-52 md:h-full">
                <img src={'/images/detaisPage/01f66c1402399f2a42cf2599119d5d6e1549c7c9.jpg'} alt="thumb1" className="h-full w-full object-cover" />
              </div>
              <div className="h-52 overflow-hidden rounded-md sm:h-52 md:h-full">
                <img src={'/images/detaisPage/01f66c1402399f2a42cf2599119d5d6e1549c7c9.jpg'} alt="thumb2" className="h-full w-full object-cover" />
              </div>
              <div className="h-52 overflow-hidden rounded-md sm:h-52 md:h-full">
                <img src={'/images/detaisPage/01f66c1402399f2a42cf2599119d5d6e1549c7c9.jpg'} alt="thumb3" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
            <div className="space-y-5 md:col-span-2">
              <h1 className="text-2xl font-bold text-[#1D1D1D]">{event.title || 'No information available'}</h1>
              <p className="text-base text-[#323232]">{event.description || 'No information available'}</p>

              <div className="mt-4 flex items-center gap-6 text-[#323232]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-base">{event.date || 'No information available'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">{event.time || 'No information available'}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-lg font-medium text-[#1D1D1D]">Age Group:</p>
                  <p className="mt-1 text-base text-[#323232]">{event.ageGroup || 'No information available'}</p>
                </div>

                <div>
                  <p className="text-lg font-medium text-[#1D1D1D]">Skill Level:</p>
                  <p className="mt-1 text-base text-[#323232]">{event.skillLevel || 'No information available'}</p>
                </div>

                <div>
                  <p className="text-lg font-medium text-[#1D1D1D]">Last Date to Register</p>
                  <p className="mt-1 text-base text-[#323232]">{event.lastDateToRegister || 'No information available'}</p>
                </div>

                <div>
                  <p className="text-lg font-medium text-[#1D1D1D]">Venue</p>
                  <p className="mt-1 text-base text-[#323232]">{event.venue || 'No information available'}</p>
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-6 mt-6">
                <h3 className="mb-4 text-lg font-bold text-[#1D1D1D]">Apply Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Full Name</label>
                    <input
                      type="text"
                      placeholder="Player"
                      required
                      className="w-full rounded-md border-none bg-[#B5D5D2] px-4 py-3 text-base text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Email</label>
                    <input
                      type="email"
                      placeholder="enter your email"
                      required
                      className="w-full rounded-md border-none bg-[#B5D5D2] px-4 py-3 text-base text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="enter your phone number"
                      className="w-full rounded-md border-none bg-[#B5D5D2] px-4 py-3 text-base text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-btn-primary rounded-md px-6 py-2.5 font-medium text-white hover:bg-[#0d655d]"
                  >
                    Join Event
                  </button>
                </form>
              </div>

            </div>
            {/**map section */}
            <aside className="md:col-span-2">
              <div className="rounded-md border border-[#91C0BC] bg-white p-6 lg:sticky lg:top-40">

                <div className='mb-4'>
                  <p className="text-base font-medium text-[#1D1D1D]">Venue</p>
                  <p className="mt-2 flex items-start gap-2 text-base text-[#323232]">
                    <MapPin className="mt-1 h-4 w-4 text-[#323232]" />
                    {event.venue ? <span>{event.venue} â€” </span> : null}
                    <span>{event.locationText}</span>
                  </p>
                </div>
                {/* Map image to visually represent location (placeholder image) */}
                <div className="mb-4 overflow-hidden rounded-md">
                  <img src={'https://i.ibb.co.com/fY1frBX7/Rectangle-4319.png'} alt="map" className="w-full h-66 object-cover" />
                </div>

                <div className="mt-4">
                  <p className="text-base font-medium text-[#1D1D1D]">Contact Information</p>
                  <div className="mt-2 space-y-1 text-base text-[#323232]">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#323232]" />
                      <span>{event.contactPhone || 'No information available'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#323232]" />
                      <span>{event.contactEmail || 'No information available'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {event.organizerImage ? (
                      <img
                        src={event.organizerImage}
                        alt={event.organizedBy}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-base text-[#323232]">
                        {(event.organizedBy || 'Org')
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-medium text-[#1D1D1D]">Organized By</p>
                    <p className="mt-1 text-base text-[#323232]">
                      {event.organizedBy || 'No information available'}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventDetails;
