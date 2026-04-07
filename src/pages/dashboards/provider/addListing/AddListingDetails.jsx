import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  MapPinned,
  Briefcase,
  CalendarDays,
  Trophy,
  FileBadge2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import TablePagination from '../../../../components/ui/TablePagination';
import { addListingDummyData } from './addListingDummyData';

const ServiceOverviewItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-lg border border-[#E5EBEC] bg-[#F8FAFB] px-6 py-4">
    <div className="mt-0.5 rounded-full bg-[#E7F1F1] p-2 text-[#0F766E]">{icon}</div>
    <div>
      <p className="text-base font-medium text-[#1D1D1D]">{label}</p>
      <p className="text-base text-[#5B6B69]">{value}</p>
    </div>
  </div>
);

const AddListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const routedItem = state?.item;
  const matchedDummy = addListingDummyData.find((item) => String(item.id) === String(id));
  const item = routedItem || matchedDummy || addListingDummyData[0];

  const serviceOverview = item?.overview || {
    clinicName: 'The Wellness Centre',
    addressLine1: '123 High Street',
    townCity: 'Richmond',
    postcode: 'TW9 1AB',
    primaryProfession: item?.category || 'Physiotherapist',
    sessionType: 'In Clinic',
    sport: 'Football',
    professionalRegistration: 'HCPC Registered, CSP Member',
    insuranceInPlace: 'Yes',
  };

  const bookings = item?.bookings || addListingDummyData[0].bookings;
  const enquiries = item?.enquiries || addListingDummyData[0].enquiries;

  const [bookingPage, setBookingPage] = useState(1);
  const [enquiryPage, setEnquiryPage] = useState(1);

  const rowsPerPage = 6;

  const bookingTotalPages = Math.max(1, Math.ceil(bookings.length / rowsPerPage));
  const enquiryTotalPages = Math.max(1, Math.ceil(enquiries.length / rowsPerPage));

  const paginatedBookings = useMemo(() => {
    const start = (bookingPage - 1) * rowsPerPage;
    return bookings.slice(start, start + rowsPerPage);
  }, [bookings, bookingPage]);

  const paginatedEnquiries = useMemo(() => {
    const start = (enquiryPage - 1) * rowsPerPage;
    return enquiries.slice(start, start + rowsPerPage);
  }, [enquiries, enquiryPage]);

  return (
    <div className="dashboardPy">
      <div className="rounded-lg bg-[#F1F5F7] p-4 md:p-5">
        <button
          type="button"
          onClick={() => navigate('/provider/add-listing')}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] hover:text-[#0d655d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.45fr_1fr]">
          <section className="rounded-lg  p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="h-18 w-18 overflow-hidden rounded-full bg-[#D9D9D9]">
                {item?.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <h1 className="text-3xl font-semibold leading-tight text-[#1D1D1D]">
                  {item?.providerName || 'Women\'s Sports Physio'}
                </h1>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  Contact: <span className="font-medium text-[#1D1D1D]">{item?.organizer || 'John Doe'}</span>
                </p>
              </div>
            </div>

            <div className='bg-[#FFFFFF] p-6 rounded-2xl'>
              <h2 className="mb-1 text-xl font-semibold text-[#1D1D1D]">About This Service</h2>
              <p className="text-base leading-relaxed text-[#4B5563]">
                {item?.about ||
                  'This physiotherapy service is designed specifically for women athletes who play sports like cricket, football, futsal and other physical games. It helps prevent injuries, improve performance, and support recovery so players can stay fit and confident.'}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="mb-2 text-xl font-semibold text-[#1D1D1D]">Service Overview</h3>
              <div className="grid grid-cols-1 gap-2 sm:max-w-67.5">
                <ServiceOverviewItem icon={<Building2 className="h-6 w-6" />} label="Clinic Name" value={serviceOverview.clinicName} />
                <ServiceOverviewItem icon={<MapPin className="h-6 w-6" />} label="Address Line 1" value={serviceOverview.addressLine1} />
                <ServiceOverviewItem icon={<MapPinned className="h-6 w-6" />} label="Town/City" value={serviceOverview.townCity} />
                <ServiceOverviewItem icon={<MapPinned className="h-6 w-6" />} label="Postcode" value={serviceOverview.postcode} />
                <ServiceOverviewItem icon={<Briefcase className="h-6 w-6" />} label="Primary Profession" value={serviceOverview.primaryProfession} />
                <ServiceOverviewItem icon={<CalendarDays className="h-6 w-6" />} label="Session Type" value={serviceOverview.sessionType} />
                <ServiceOverviewItem icon={<Trophy className="h-6 w-6" />} label="Sport" value={serviceOverview.sport} />
                <ServiceOverviewItem icon={<FileBadge2 className="h-6 w-6" />} label="Professional Registration" value={serviceOverview.professionalRegistration} />
                <ServiceOverviewItem icon={<ShieldCheck className="h-6 w-6" />} label="Insurance in place" value={serviceOverview.insuranceInPlace} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="rounded-md bg-[#0F766E] px-4 py-2 text-base font-semibold text-white hover:bg-[#0d655d]">
                Book Now
              </button>
              <button className="rounded-md bg-[#0F766E] px-4 py-2 text-base font-semibold text-white hover:bg-[#0d655d]">
                Register Interest
              </button>
            </div>
          </section>

          <aside className="rounded-lg bg-[#E7F1F1] p-4 shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-[#1D1D1D]">Contact</h3>
            <p className="mt-2 text-base text-[#5B6B69]">Ask the organiser a question</p>
            <textarea
              rows={6}
              placeholder="Write your message"
              className="mt-2 w-full resize-none rounded-md border border-[#B5D5D2] bg-[#B5D5D2]/55 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
            />
            <button className="mt-3 rounded-md bg-[#0F766E] px-4 py-2 text-base font-semibold text-white hover:bg-[#0d655d]">
              Submit
            </button>
          </aside>
        </div>

        <section className="mt-4 rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-2xl font-semibold text-[#1D1D1D]">Bookings</h3>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {paginatedBookings.map((booking, idx) => (
              <article key={`${booking.email}-${idx}`} className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4">
                <h4 className="text-base font-semibold text-[#1D1D1D]">{booking.name}</h4>
                <div className="mt-2 space-y-1.5 text-sm text-[#4B5563]">
                  <p>
                    <span className="font-semibold text-[#1D1D1D]">Phone:</span> {booking.phone}
                  </p>
                  <p className="break-all">
                    <span className="font-semibold text-[#1D1D1D]">Email:</span> {booking.email}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-245 w-full border-collapse">
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
                    <td className="px-4 py-3 text-base text-[#2F3B3A]">{booking.name}</td>
                    <td className="px-4 py-3 text-base text-[#2F3B3A]">{booking.phone}</td>
                    <td className="break-all px-4 py-3 text-base text-[#2F3B3A]">{booking.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={bookingPage}
            totalPages={bookingTotalPages}
            totalResults={bookings.length}
            resultsPerPage={rowsPerPage}
            onPageChange={(p) => setBookingPage(Math.max(1, Math.min(bookingTotalPages, p)))}
            wrapperClass="border-t border-gray-100 px-4 py-3"
            resultsTextClass="text-sm text-[#0F766E]"
            buttonClass="px-3 py-1 text-sm rounded-md"
          />
        </section>

        <section className="mt-4 rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-2xl font-semibold text-[#1D1D1D]">Enquiries</h3>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {paginatedEnquiries.map((enquiry, idx) => (
              <article key={`${enquiry.email}-${idx}`} className="rounded-xl border border-[#E2E8EA] bg-[#F8FAFB] p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-base font-semibold text-[#1D1D1D]">{enquiry.playerName}</h4>
                  <ChevronRight className="mt-0.5 h-5 w-5 text-[#1D1D1D]" />
                </div>
                <div className="mt-2 space-y-1.5 text-sm text-[#4B5563]">
                  <p>
                    <span className="font-semibold text-[#1D1D1D]">Phone:</span> {enquiry.phone}
                  </p>
                  <p className="break-all">
                    <span className="font-semibold text-[#1D1D1D]">Email:</span> {enquiry.email}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1D1D1D]">Message:</span> {enquiry.message}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1D1D1D]">Date:</span> {enquiry.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-245 w-full border-collapse">
              <thead>
                <tr className="bg-[#F8FAFA] text-left">
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Player Name</th>
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Phone Number</th>
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Email</th>
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Message</th>
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Date</th>
                  <th className="px-4 py-2 text-base font-medium text-[#1D1D1D]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEnquiries.map((enquiry, idx) => (
                  <tr key={`${enquiry.email}-${idx}`} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-base text-[#2F3B3A]">{enquiry.playerName}</td>
                    <td className="px-4 py-2 text-base text-[#2F3B3A]">{enquiry.phone}</td>
                    <td className="break-all px-4 py-2 text-base text-[#2F3B3A]">{enquiry.email}</td>
                    <td className="max-w-65 px-4 py-2 text-base text-[#2F3B3A]">{enquiry.message}</td>
                    <td className="px-4 py-2 text-base text-[#2F3B3A]">{enquiry.date}</td>
                    <td className="px-4 py-2 text-base text-[#1D1D1D]">
                      <ChevronRight className="h-4 w-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={enquiryPage}
            totalPages={enquiryTotalPages}
            totalResults={enquiries.length}
            resultsPerPage={rowsPerPage}
            onPageChange={(p) => setEnquiryPage(Math.max(1, Math.min(enquiryTotalPages, p)))}
            wrapperClass="border-t border-gray-100 px-4 py-3"
            resultsTextClass="text-sm text-[#0F766E]"
            buttonClass="px-3 py-1 text-sm rounded-md"
          />
        </section>
      </div>
    </div>
  );
};

export default AddListingDetails;
