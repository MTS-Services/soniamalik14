import React, { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, CircleHelp, Send, Ticket, Trophy, X } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TablePagination from '../../../../components/ui/TablePagination';
import insightsData from '../../../../data/providerInsightsData.json';

const InfoCard = ({ title, value, icon }) => (
  <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-3">
    <div className="flex items-center gap-2 text-[#1D1D1D]">
      <span className="rounded-full bg-[#E7F1F1] p-1.5 text-[#0F766E]">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
    </div>
    <p className="mt-1 text-sm text-[#5B6B69]">{value}</p>
  </div>
);

const buildDummyRows = (count, factory) =>
  Array.from({ length: count }, (_, index) => factory(index + 1));

const withMinimumRows = (rows, minimumCount, factory) => {
  if (Array.isArray(rows) && rows.length >= minimumCount) return rows;
  const existingRows = Array.isArray(rows) ? rows : [];
  const needed = Math.max(0, minimumCount - existingRows.length);
  return [...existingRows, ...buildDummyRows(needed, factory)];
};

const EnquiryDetailsModal = ({ isOpen, onClose, enquiry, eventTitle }) => {
  if (!isOpen || !enquiry) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E2E8EA] px-5 py-4">
          <h3 className="text-xl font-semibold text-[#1D1D1D]">Enquiry Details</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#1D1D1D]"
            aria-label="Close enquiry details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4">
            <p className="text-sm font-semibold tracking-wide text-[#0F766E] uppercase">Event</p>
            <p className="mt-1 text-base font-semibold text-[#1D1D1D]">{eventTitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280] uppercase">
                Player Name
              </p>
              <p className="mt-1 text-base font-medium text-[#1D1D1D]">{enquiry.playerName}</p>
            </div>
            <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280] uppercase">
                Phone Number
              </p>
              <p className="mt-1 text-base font-medium text-[#1D1D1D]">{enquiry.phone}</p>
            </div>
            <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4 sm:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280] uppercase">Email</p>
              <p className="mt-1 text-base font-medium break-all text-[#1D1D1D]">{enquiry.email}</p>
            </div>
            <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4 sm:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280] uppercase">
                Message
              </p>
              <p className="mt-1 text-base leading-relaxed text-[#374151]">{enquiry.message}</p>
            </div>
            <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4 sm:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280] uppercase">Date</p>
              <p className="mt-1 text-base font-medium text-[#1D1D1D]">{enquiry.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const statusMeta = {
  complete: {
    label: 'Complete',
    className: 'bg-[#E8F8EF] text-[#15803D] border border-[#BBE6CC]',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-[#EAF3FF] text-[#1D4ED8] border border-[#BED8FF]',
  },
  pending: {
    label: 'Pending',
    className: 'bg-[#FFF6E8] text-[#B45309] border border-[#FFD9A6]',
  },
  cancel: {
    label: 'Cancelled',
    className: 'bg-[#FEECEC] text-[#B91C1C] border border-[#FECACA]',
  },
};

const InsightsPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const event = state?.item || insightsData.find((item) => item.id === id) || insightsData[0];
  const statusConfig = statusMeta[event.status];

  const [bookingPage, setBookingPage] = useState(1);
  const [interestPage, setInterestPage] = useState(1);
  const [enquiryPage, setEnquiryPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const perPage = 6;
  const minimumRows = 12;

  const bookings = useMemo(
    () =>
      withMinimumRows(event.bookings, minimumRows, (n) => ({
        name: `Participant ${n}`,
        phone: `(555) 100-${String(n).padStart(4, '0')}`,
        email: `participant${n}.${event.id}@example.com`,
      })),
    [event.bookings, event.id]
  );

  const interests = useMemo(
    () =>
      withMinimumRows(event.registerInterest, minimumRows, (n) => ({
        name: `Interested User ${n}`,
        phone: `(555) 200-${String(n).padStart(4, '0')}`,
        email: `interest${n}.${event.id}@example.com`,
      })),
    [event.registerInterest, event.id]
  );

  const enquiries = useMemo(
    () =>
      withMinimumRows(event.enquiries, minimumRows, (n) => ({
        playerName: `Player ${n}`,
        phone: `(555) 300-${String(n).padStart(4, '0')}`,
        email: `enquiry${n}.${event.id}@example.com`,
        message: `I would like to know more details about schedule, venue support, and registration process for slot ${n}.`,
        date: `${String((n % 28) + 1).padStart(2, '0')} Mar 26`,
      })),
    [event.enquiries, event.id]
  );

  const bookingTotalPages = Math.max(1, Math.ceil(bookings.length / perPage));
  const interestTotalPages = Math.max(1, Math.ceil(interests.length / perPage));
  const enquiryTotalPages = Math.max(1, Math.ceil(enquiries.length / perPage));
  const safeBookingPage = Math.min(bookingPage, bookingTotalPages);
  const safeInterestPage = Math.min(interestPage, interestTotalPages);
  const safeEnquiryPage = Math.min(enquiryPage, enquiryTotalPages);

  const paginatedBookings = useMemo(() => {
    const start = (safeBookingPage - 1) * perPage;
    return bookings.slice(start, start + perPage);
  }, [bookings, safeBookingPage]);

  const paginatedInterests = useMemo(() => {
    const start = (safeInterestPage - 1) * perPage;
    return interests.slice(start, start + perPage);
  }, [interests, safeInterestPage]);

  const paginatedEnquiries = useMemo(() => {
    const start = (safeEnquiryPage - 1) * perPage;
    return enquiries.slice(start, start + perPage);
  }, [enquiries, safeEnquiryPage]);

  const openEnquiryModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <div className="dashboardPy">
      <div className="rounded-lg">
        <button
          type="button"
          onClick={() =>
            navigate('/provider/insights', {
              state: {
                activeTab: state?.activeTab || 'all',
                currentPage: state?.currentPage || 1,
              },
            })
          }
          className="mb-4 inline-flex items-center gap-2 text-base font-medium text-[#0F766E] hover:text-[#0d655d]"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="overflow-hidden rounded-lg">
          <img
            src={event.coverImage || '/images/Football.jpg'}
            alt={event.title}
            className="h-72 w-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
          <section className="rounded-lg bg-white p-4 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold text-[#1D1D1D]">{event.title}</h1>
              {statusConfig && (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-base font-semibold ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
              )}
            </div>
            <p className="mt-1 text-base text-[#6B7280]">
              Event Type: {event.eventType || 'Workshop & Learning'}
            </p>

            <div className="mt-4 rounded-lg border border-[#E2E8EA] bg-[#F8FAFB] p-4">
              <h2 className="text-base font-semibold text-[#1D1D1D]">Event Type</h2>
              <p className="mt-1 text-base leading-relaxed text-[#4B5563]">{event.about}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1.2fr]">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-[#1D1D1D]">Session Overview</h3>
                <InfoCard
                  title="Sport"
                  value={event.sport}
                  icon={<Trophy className="h-3.5 w-3.5" />}
                />
                <InfoCard
                  title="Event Type"
                  value={event.sessionType || 'Recreational'}
                  icon={<Ticket className="h-3.5 w-3.5" />}
                />
                <InfoCard
                  title="Suitable For"
                  value={event.suitableFor || 'New to the sport'}
                  icon={<CircleHelp className="h-3.5 w-3.5" />}
                />
                <div className='flex   flex-col md:flex-row gap-4'>
                  <button className="rounded-md bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white">
                    Book Your Place
                  </button>
                  <button className="rounded-md bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white sm:ml-2">
                    Register Interest
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#1D1D1D]">Venue Information</h3>
                <div className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-3">
                  <p className="text-sm whitespace-pre-line text-[#4B5563]">{event.venue}</p>
                  <div className="mt-2 overflow-hidden rounded-md">
                    <img
                      src="/images/detaisPage/detailsBanner.png"
                      alt="Map"
                      className="h-50 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-lg bg-[#EAF2F1] p-4 shadow-sm">
            <h3 className="text-base font-semibold text-[#1D1D1D]">Contact Organiser</h3>
            <p className="mt-2 text-sm text-[#5B6B69]">Ask the organiser a question</p>
            <textarea
              rows={6}
              placeholder="Write your message"
              className="mt-2 w-full resize-none rounded-md border border-[#B5D5D2] bg-[#B5D5D2]/55 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[#0F766E]"
            />
            <button className="mt-3 inline-flex items-center gap-1 rounded-md bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white">
              <Send className="h-3.5 w-3.5" /> Send message
            </button>
          </aside>
        </div>

        <section className="mt-4 rounded-lg bg-white shadow-sm">
          <div className="border-b border-[#E2E8EA] px-4 py-3">
            <h3 className="text-2xl font-semibold text-[#1D1D1D]">Bookings</h3>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {paginatedBookings.map((booking, idx) => (
              <div
                key={`${booking.email}-${idx}`}
                className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-3"
              >
                <p className="text-base font-semibold text-[#1D1D1D]">{booking.name}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Phone: {booking.phone}</p>
                <p className="mt-1 text-sm break-all text-[#4B5563]">Email: {booking.email}</p>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-160 border-collapse lg:min-w-full">
              <thead>
                <tr className="bg-[#F8FAFA] text-left">
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Name</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Phone Number</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Email</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.map((booking, idx) => (
                  <tr key={`${booking.email}-${idx}`} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{booking.name}</td>
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{booking.phone}</td>
                    <td className="px-4 py-3 text-sm break-all text-[#2F3B3A]">{booking.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={safeBookingPage}
            totalPages={bookingTotalPages}
            totalResults={bookings.length}
            resultsPerPage={perPage}
            onPageChange={(p) => setBookingPage(Math.max(1, Math.min(bookingTotalPages, p)))}
            wrapperClass="px-4 py-3"
            resultsTextClass="text-sm text-[#0F766E]"
            buttonClass="px-3 py-1 text-sm rounded-md"
          />
        </section>

        <section className="mt-4 rounded-lg bg-white shadow-sm">
          <div className="border-b border-[#E2E8EA] px-4 py-3">
            <h3 className="text-2xl font-semibold text-[#1D1D1D]">Register Interest</h3>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {paginatedInterests.map((interest, idx) => (
              <div
                key={`${interest.email}-${idx}`}
                className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-3"
              >
                <p className="text-base font-semibold text-[#1D1D1D]">{interest.name}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Phone: {interest.phone}</p>
                <p className="mt-1 text-sm break-all text-[#4B5563]">Email: {interest.email}</p>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-160 border-collapse lg:min-w-full">
              <thead>
                <tr className="bg-[#F8FAFA] text-left">
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Name</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Phone Number</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Email</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInterests.map((interest, idx) => (
                  <tr key={`${interest.email}-${idx}`} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{interest.name}</td>
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{interest.phone}</td>
                    <td className="px-4 py-3 text-sm break-all text-[#2F3B3A]">{interest.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={safeInterestPage}
            totalPages={interestTotalPages}
            totalResults={interests.length}
            resultsPerPage={perPage}
            onPageChange={(p) => setInterestPage(Math.max(1, Math.min(interestTotalPages, p)))}
            wrapperClass="px-4 py-3"
            resultsTextClass="text-sm text-[#0F766E]"
            buttonClass="px-3 py-1 text-sm rounded-md"
          />
        </section>

        <section className="mt-4 rounded-lg bg-white shadow-sm">
          <div className="border-b border-[#E2E8EA] px-4 py-3">
            <h3 className="text-2xl font-semibold text-[#1D1D1D]">Enquiries</h3>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {paginatedEnquiries.map((enquiry, idx) => (
              <div
                key={`${enquiry.email}-${idx}`}
                className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-3"
              >
                <p className="text-base font-semibold text-[#1D1D1D]">{enquiry.playerName}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Phone: {enquiry.phone}</p>
                <p className="mt-1 text-sm break-all text-[#4B5563]">Email: {enquiry.email}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Date: {enquiry.date}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Message: {enquiry.message}</p>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(enquiry)}
                    className="inline-flex items-center justify-center rounded-md p-1 text-[#1D1D1D] hover:bg-[#EAF2F1]"
                    aria-label={`Open enquiry details for ${enquiry.playerName}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-230 border-collapse xl:min-w-full">
              <thead>
                <tr className="bg-[#F8FAFA] text-left">
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Player Name</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Phone Number</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Email</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Message</th>
                  <th className="px-4 py-3 text-base font-medium text-[#1D1D1D]">Date</th>
                  <th className="px-4 py-3 text-center text-base font-medium text-[#1D1D1D]">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEnquiries.map((enquiry, idx) => (
                  <tr key={`${enquiry.email}-${idx}`} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{enquiry.playerName}</td>
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{enquiry.phone}</td>
                    <td className="px-4 py-3 text-sm break-all text-[#2F3B3A]">{enquiry.email}</td>
                    <td className="max-w-65 px-4 py-3 text-sm text-[#2F3B3A]">{enquiry.message}</td>
                    <td className="px-4 py-3 text-sm text-[#2F3B3A]">{enquiry.date}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => openEnquiryModal(enquiry)}
                        className="inline-flex items-center justify-center rounded-md p-1 text-[#1D1D1D] hover:bg-[#EAF2F1]"
                        aria-label={`Open enquiry details for ${enquiry.playerName}`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={safeEnquiryPage}
            totalPages={enquiryTotalPages}
            totalResults={enquiries.length}
            resultsPerPage={perPage}
            onPageChange={(p) => setEnquiryPage(Math.max(1, Math.min(enquiryTotalPages, p)))}
            wrapperClass="px-4 py-3"
            resultsTextClass="text-sm text-[#0F766E]"
            buttonClass="px-3 py-1 text-sm rounded-md"
          />
        </section>

        <EnquiryDetailsModal
          isOpen={isEnquiryModalOpen}
          onClose={closeEnquiryModal}
          enquiry={selectedEnquiry}
          eventTitle={event.title}
        />
      </div>
    </div>
  );
};

export default InsightsPreview;
