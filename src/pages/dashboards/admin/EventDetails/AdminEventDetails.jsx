import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Pagination from '../../../../components/ui/Pagination';

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedEvent = location.state?.event || null;
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  const eventDetailsData = [
    // sample list for related events; the main event shown at top comes from navigation state
    { title: "Women's Football Trial", type: 'Trial', organizer: 'Surrey Lions FC', role: 'Club Owner', sport: 'Football', date: '12 Mar 26', joined: '100' },
    { title: 'Girls Cricket Camp', type: 'Training', organizer: 'London Warriors', role: 'Club Owner', sport: 'Cricket', date: '12 Mar 26', joined: '200' },
    { title: 'Women Physio Workshop', type: 'Workshop', organizer: 'FitHeal Clinic', role: 'Service Provider', sport: 'Football', date: '12 Mar 26', joined: '300' },
    { title: 'Netball Skills Day', type: 'Training', organizer: 'Queens Netball', role: 'Club Owner', sport: 'Netball', date: '12 Mar 26', joined: '400' },
    { title: 'Mental Health Session', type: 'Workshop', organizer: 'MindStrong', role: 'Service Provider', sport: 'Multi', date: '12 Mar 26', joined: '500' },
    { title: 'Netball Skills Day', type: 'Training', organizer: 'Queens Netball', role: 'Club Owner', sport: 'Football', date: '12 Mar 26', joined: '600' },
    { title: 'Netball Skills Day', type: 'Training', organizer: 'Queens Netball', role: 'Club Owner', sport: 'Football', date: '12 Mar 26', joined: '700' },
  ];

  const totalPages = Math.ceil(eventDetailsData.length / resultsPerPage);

  const paginatedData = eventDetailsData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const columns = [
    'Event Title',
    'Type',
    'Organizer',
    'Role',
    'Sport',
    'Date',
    'Joined',
    'Action',
  ];

  // Desktop Table Row Renderer
  const renderRow = (event) => (
    <>
      <td className="px-4 py-4 text-base">{event.title}</td>
      <td className="px-4 py-4 text-base">{event.type}</td>
      <td className="px-4 py-4 text-base">{event.organizer}</td>
      <td className="px-4 py-4 text-base">{event.role}</td>
      <td className="px-4 py-4 text-base">{event.sport}</td>
      <td className="px-4 py-4 text-base">{event.date}</td>
      <td className="px-4 py-4 text-base font-medium text-btn-primary">{event.joined}</td>
      <td className="px-4 py-4 text-left">
        <button
          title="View Event"
          className="p-1.5  rounded-md transition-colors"
        >
          <Eye className="w-5 h-5 text-[#000000]" />
        </button>
      </td>
    </>
  );

  // Mobile Card Component (inline, no separate file needed)
  const EventDetailsCard = ({ event }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
        <button className="p-1 rounded-md">
          <Eye className="w-5 h-5 text-[#000000]" />
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Type:</span> {event.type}</p>
        <p><span className="font-medium">Organizer:</span> {event.organizer}</p>
        <p><span className="font-medium">Role:</span> {event.role}</p>
        <p><span className="font-medium">Sport:</span> {event.sport}</p>
        <p><span className="font-medium">Date:</span> {event.date}</p>
      </div>

      <div className="text-sm font-medium text-btn-primary">
        Joined: {event.joined}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      <DashboardHeader title="Event Details" />

      {/* Main Event Card (from navigation state) */}
      {passedEvent && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">{passedEvent.title}</h1>
              <p className="text-sm text-gray-600 mb-4">{passedEvent.type} • {passedEvent.sport} • Organized by {passedEvent.organizer}</p>
              <div className="space-y-3 text-sm text-gray-700">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Donec accumsan, sapien non gravida hendrerit, nisl arcu cursus mi, a fermentum augue quam nec sapien.</p>
                <p className="text-sm text-gray-600">Date: <span className="font-medium text-gray-900">{passedEvent.date}</span></p>
                <p className="text-sm text-gray-600">Role: <span className="font-medium text-gray-900">{passedEvent.role}</span></p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="w-full bg-gray-50 rounded-md p-4">
                <p className="text-xs text-gray-500">Status</p>
                <p className="mt-1 text-sm font-medium" style={{ color: passedEvent.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}>{passedEvent.status}</p>
              </div>
              <div className="w-full">
                <button onClick={() => navigate(-1)} className="w-full px-4 py-2 rounded-md border border-gray-200 text-sm">Back</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block border border-gray-100 rounded-md bg-white">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={renderRow}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={eventDetailsData.length}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 px-2">
        {paginatedData.map((event, index) => (
          <EventDetailsCard key={index} event={event} />
        ))}
        <Pagination
          page={currentPage} total={totalPages} onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EventDetails;
