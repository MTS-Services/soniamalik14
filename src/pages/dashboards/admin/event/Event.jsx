import React, { useState, useEffect } from 'react';
import { X, Eye, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Button from '../../../../components/ui/Button';
import { useEvent } from '../../../../context/EventContext';

const Event = () => {
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();

  // Use events from EventContext (fetched from backend /api/events/my/list)
  const { events, fetchEvents, loading } = useEvent();

  // Local fallback sample data while backend list is empty
  const sampleData = [
    {
      title: "Women's Football Trial",
      type: 'Trial',
      organizer: 'Sunny Lions FC',
      role: 'Club Owner',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Pending',
    },
    {
      title: 'Girls Cricket Camp',
      type: 'Training',
      organizer: 'London Warriors',
      role: 'Club Owner',
      sport: 'Cricket',
      date: '12 Mar 26',
      status: 'Pending',
    },
  ];

  const eventData = (events && events.length) ? events : sampleData;

  useEffect(() => {
    // fetch admin's events when component mounts
    fetchEvents();
  }, [fetchEvents]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-btn-primary text-white';
      case 'Pending':
        return 'bg-dashboardPending text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getText = (val, fallback = '-') => {
    if (val === null || val === undefined) return fallback;
    if (typeof val === 'string' || typeof val === 'number') return val;
    if (typeof val === 'object') return val.name || val.fullName || val.email || val.role || fallback;
    return String(val);
  };

  const getRoleText = (event) => {
    if (!event) return '-';
    const org = event.organizer;
    if (org && typeof org === 'object' && org.role) return org.role;
    if (event.role) return event.role;
    return '-';
  };

  const formatEnum = (value) => {
    if (value === null || value === undefined) return '-';
    const str = (typeof value === 'string' || typeof value === 'number') ? String(value) : '';
    // replace underscores/dashes, lowercase, then capitalize words
    return str.replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase().split(' ').map(s => s ? s[0].toUpperCase() + s.slice(1) : '').join(' ');
  };

  const getTypeText = (event) => {
    if (!event) return '-';
    const t = event.eventType ?? event.type ?? null;
    return t ? formatEnum(t) : '-';
  };

  const eventColumns = [
    'Event Title',
    'Type',
    'Organizer',
    'Role',
    'Sport',
    'Date',
    'Status',
    'ACTIONS',
  ];

  // no dropdown toggle — actions are visible buttons

  const handleAction = (action, event) => {
    console.log(`${action} action for:`, event);
    // dropdown removed — no dropdown state to clear
    if (action === 'Cancel') {
      setSelectedEvent(event);
      setIsCancelModalOpen(true);
    }

    if (action === 'See Details') {
      // Navigate to single event details page and pass the event in state
      navigate(`/admin/event/${(event.title || '').replace(/\s+/g, '-').toLowerCase()}`, { state: { event } });
    }
  };

  const handleCancelEvent = () => {
    console.log('Canceling event:', selectedEvent);
    console.log('Cancel reason:', cancelReason);
    // Add your cancel logic here
    // For example: API call to cancel the event

    // Reset and close modal
    setIsCancelModalOpen(false);
    setSelectedEvent(null);
    setCancelReason('');
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedEvent(null);
    setCancelReason('');
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEvent(null);
  };

  const renderEventRow = (event, index) => (
    <>
      <td className="px-4 py-4 text-base">{event.title}</td>
      <td className="px-4 py-4 text-base">{getTypeText(event)}</td>
      <td className="px-4 py-4 text-base">{getText(event.organizer)}</td>
      <td className="px-4 py-4 text-base">{getRoleText(event)}</td>
      <td className="px-4 py-4 text-base">{event.sport}</td>
      <td className="px-4 py-4 text-base">{event.date}</td>
      <td className="px-4 py-4">
        <span
          className="text-base font-medium"
          style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.status}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="flex flex-row items-center justify-end gap-2 whitespace-nowrap">
          <button
            onClick={() => handleAction('See Details', event)}
            className="inline-flex w-9 h-9 items-center justify-center bg-[#0F766E] text-white rounded-md text-sm p-0"
            aria-label="View"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction('Approved', event)}
            className="inline-flex w-9 h-9 items-center justify-center bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 text-green-600 p-0"
            aria-label="Approve"
            title="Approve"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction('Cancel', event)}
            className="inline-flex w-9 h-9 items-center justify-center bg-white border border-red-200 text-red-600 rounded-md text-sm hover:bg-red-50 p-0"
            aria-label="Cancel"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </td>
    </>
  );

  const renderEventCard = (event, index, prefix = 'card') => (
    <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 mb-3">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{event.title}</h3>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => handleAction('See Details', event)}
              className="inline-flex w-8 h-8 items-center justify-center bg-[#0F766E] text-white rounded-md text-sm p-0"
              aria-label="View"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction('Approved', event)}
              className="inline-flex w-8 h-8 items-center justify-center bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 text-green-600 p-0"
              aria-label="Approve"
              title="Approve"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction('Cancel', event)}
              className="inline-flex w-8 h-8 items-center justify-center bg-white border border-red-200 text-red-600 rounded-md text-sm hover:bg-red-50 p-0"
              aria-label="Cancel"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-base">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-2 font-medium">{getTypeText(event)}</span>
          </div>
          <div>
            <span className="text-gray-500">Sport:</span>
            <span className="ml-2 font-medium">{event.sport}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Organizer:</span>
            <span className="ml-2 font-medium">{getText(event.organizer)}</span>
          </div>
          <div>
            <span className="text-gray-500">Role:</span>
            <span className="ml-2 font-medium">{getRoleText(event)}</span>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <span className="ml-2 font-medium">{event.date}</span>
          </div>
        </div>

        <div className="pt-2">
          <span
            className="text-base font-medium"
            style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
          >
            {event.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      {/* Event Section */}
      <div>
        <DashboardHeader title="Event" />

        {/* Mobile Card View */}
        <div className="md:hidden">
          {eventData.map((event, index) => renderEventCard(event, index))}
          <TablePagination
            currentPage={currentEventPage}
            totalPages={1}
            totalResults={eventData.length}
            resultsPerPage={eventData.length}
            onPageChange={setCurrentEventPage}
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block border border-gray-100 rounded-md">
          <style>{`.event-actions-table th:last-child, .event-actions-table td:last-child { width: 140px; min-width: 140px; max-width: 140px; }
.event-actions-table td:last-child { padding-right: 16px; }
.event-actions-table td:last-child .flex { justify-content: flex-end; }
@media (max-width: 1024px) { .event-actions-table th:last-child, .event-actions-table td:last-child { min-width: 110px; width: 110px; } }`}</style>
          <Table className="event-actions-table" columns={eventColumns} data={eventData} renderRow={renderEventRow} />
          <TablePagination
            currentPage={currentEventPage}
            totalPages={1}
            totalResults={eventData.length}
            resultsPerPage={eventData.length}
            onPageChange={setCurrentEventPage}
          />
        </div>
      </div>

      {/* Cancel Reason Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-semibold text-gray-900">Cancel Reason</h2>
              <button
                onClick={closeCancelModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Write Cancel Reason
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Why cancel this event describe in details"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-base"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCancelEvent}
                  className="px-6 py-3 bg-[#0F766E] text-white rounded-md shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E]"
                >
                  Cancel Event
                </button>
                <button
                  onClick={() => { /* implement send logic if needed */ }}
                  className="px-6 py-3 bg-white text-[#0F766E] border border-[#0F766E] rounded-md shadow-sm hover:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E]"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Image / Quick Details Modal */}
      {isViewModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
            <div className="flex items-start justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedEvent.title || 'Event'}</h3>
              <button onClick={closeViewModal} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 md:p-6 grid md:grid-cols-2 gap-4 items-start">
              <div className="flex items-center justify-center bg-gray-50 rounded-md p-3">
                {selectedEvent.image || selectedEvent.imageUrl ? (
                  <img
                    src={selectedEvent.image || selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="max-h-[60vh] w-full object-contain rounded"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Type</div>
                  <div className="font-medium">{getTypeText(selectedEvent)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Organizer</div>
                  <div className="font-medium">{getText(selectedEvent.organizer)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Role</div>
                  <div className="font-medium">{getRoleText(selectedEvent)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{selectedEvent.date || '-'}</div>
                </div>

                <div className="pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        closeViewModal();
                        navigate(`/admin/event/${(selectedEvent.title || '').replace(/\s+/g, '-').toLowerCase()}`, { state: { event: selectedEvent } });
                      }}
                      className="px-4 py-2 bg-[#0F766E] text-white rounded-md"
                    >
                      Open Full Details
                    </button>
                    <button onClick={closeViewModal} className="px-4 py-2 bg-white border rounded-md">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;