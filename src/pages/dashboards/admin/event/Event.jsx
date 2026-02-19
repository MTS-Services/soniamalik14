import React, { useState, useEffect } from 'react';
import { MoreVertical, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Button from '../../../../components/ui/Button';

const Event = () => {
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const [currentEventListPage, setCurrentEventListPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const eventData = [
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
    {
      title: 'Women Physio Workshop',
      type: 'Workshop',
      organizer: 'FitHeal Clinic',
      role: 'Service Provider',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Pending',
    },
    {
      title: 'Netball Skills Day',
      type: 'Training',
      organizer: 'Queens Netball',
      role: 'Club Owner',
      sport: 'Netball',
      date: '12 Mar 26',
      status: 'Pending',
    },
    {
      title: 'Mental Health Session',
      type: 'Workshop',
      organizer: 'MindStrong',
      role: 'Service Provider',
      sport: 'Multi',
      date: '12 Mar 26',
      status: 'Pending',
    },
    {
      title: 'Netball Skills Day',
      type: 'Training',
      organizer: 'Queens Netball',
      role: 'Club Owner',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Pending',
    },
  ];

  const eventListData = [
    {
      title: "Women's Football Trial",
      type: 'Trial',
      organizer: 'Sunny Lions FC',
      role: 'Club Owner',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Approved',
    },
    {
      title: 'Girls Cricket Camp',
      type: 'Training',
      organizer: 'London Warriors',
      role: 'Club Owner',
      sport: 'Cricket',
      date: '12 Mar 26',
      status: 'Approved',
    },
    {
      title: 'Women Physio Workshop',
      type: 'Workshop',
      organizer: 'FitHeal Clinic',
      role: 'Service Provider',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Approved',
    },
    {
      title: 'Netball Skills Day',
      type: 'Training',
      organizer: 'Queens Netball',
      role: 'Club Owner',
      sport: 'Netball',
      date: '12 Mar 26',
      status: 'Approved',
    },
    {
      title: 'Mental Health Session',
      type: 'Workshop',
      organizer: 'MindStrong',
      role: 'Service Provider',
      sport: 'Multi',
      date: '12 Mar 26',
      status: 'Approved',
    },
    {
      title: 'Netball Skills Day',
      type: 'Training',
      organizer: 'Queens Netball',
      role: 'Club Owner',
      sport: 'Football',
      date: '12 Mar 26',
      status: 'Approved',
    },
  ];

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

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleAction = (action, event) => {
    console.log(`${action} action for:`, event);
    setOpenDropdown(null);
    
    if (action === 'Cancel') {
      setSelectedEvent(event);
      setIsCancelModalOpen(true);
    }

    if (action === 'See Details') {
    
      navigate(`/admin/event/${event.title.replace(/\s+/g, '-').toLowerCase()}`, { state: { event } });
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

  const renderEventRow = (event, index) => (
    <>
      <td className="px-4 py-4 text-base">{event.title}</td>
      <td className="px-4 py-4 text-base">{event.type}</td>
      <td className="px-4 py-4 text-base">{event.organizer}</td>
      <td className="px-4 py-4 text-base">{event.role}</td>
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
        <div className="relative flex items-center  gap-2">
          <button 
            onClick={() => toggleDropdown(`event-${index}`)}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          
          {openDropdown === `event-${index}` && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => handleAction('See Details', event)}
                className="w-full text-left px-4 py-2 text-base text-white transition-colors"
                style={{ backgroundColor: '#0F766E' }}
              >
                See Details
              </button>
              <button
                onClick={() => handleAction('Approved', event)}
                className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
              >
                Approved
              </button>
              <button
                onClick={() => handleAction('Cancel', event)}
                className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </td>
    </>
  );

  const renderEventListRow = (event, index) => (
    <>
      <td className="px-4 py-4 ">{event.title}</td>
      <td className="px-4 py-4 ">{event.type}</td>
      <td className="px-4 py-4 ">{event.organizer}</td>
      <td className="px-4 py-4 ">{event.role}</td>
      <td className="px-4 py-4 ">{event.sport}</td>
      <td className="px-4 py-4 ">{event.date}</td>
      <td className="px-4 py-4">
        <span
          className="text-base font-medium"
          style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.status}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <div className="relative flex items-center justify-center gap-2">
          <button 
            onClick={() => toggleDropdown(`eventList-${index}`)}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          
          {openDropdown === `eventList-${index}` && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => handleAction('See Details', event)}
                className="w-full text-left px-4 py-2 text-base text-white transition-colors rounded-t-md"
                style={{ backgroundColor: '#0F766E' }}
              >
                See Details
              </button>
              <button
                onClick={() => handleAction('Approved', event)}
                className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
              >
                Approved
              </button>
              <button
                onClick={() => handleAction('Cancel', event)}
                className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </td>
    </>
  );

  const renderEventCard = (event, index, prefix = 'card') => (
    <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 mb-3">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{event.title}</h3>
          <div className="relative">
            <button 
              onClick={() => toggleDropdown(`${prefix}-${index}`)}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {openDropdown === `${prefix}-${index}` && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleAction('See Details', event)}
                  className="w-full text-left px-4 py-2 text-base text-white transition-colors rounded-t-md"
                  style={{ backgroundColor: '#0F766E' }}
                >
                  See Details
                </button>
                <button
                  onClick={() => handleAction('Approved', event)}
                  className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
                >
                  Approved
                </button>
                <button
                  onClick={() => handleAction('Cancel', event)}
                  className="w-full text-left px-4 py-2 text-base hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-base">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-2 font-medium">{event.type}</span>
          </div>
          <div>
            <span className="text-gray-500">Sport:</span>
            <span className="ml-2 font-medium">{event.sport}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Organizer:</span>
            <span className="ml-2 font-medium">{event.organizer}</span>
          </div>
          <div>
            <span className="text-gray-500">Role:</span>
            <span className="ml-2 font-medium">{event.role}</span>
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
          <Table columns={eventColumns} data={eventData} renderRow={renderEventRow} />
          <TablePagination
            currentPage={currentEventPage}
            totalPages={1}
            totalResults={eventData.length}
            resultsPerPage={eventData.length}
            onPageChange={setCurrentEventPage}
          />
        </div>
      </div>

      {/* Event List Section */}
      <div>
        <DashboardHeader title="Event List" />
        
        {/* Mobile Card View */}
        <div className="md:hidden">
          {eventListData.map((event, index) => renderEventCard(event, index, 'cardList'))}
          <TablePagination
            currentPage={currentEventListPage}
            totalPages={1}
            totalResults={eventListData.length}
            resultsPerPage={eventListData.length}
            onPageChange={setCurrentEventListPage}
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block border border-gray-100 rounded-md">
          <Table columns={eventColumns} data={eventListData} renderRow={renderEventListRow} />
          <TablePagination
            currentPage={currentEventListPage}
            totalPages={1}
            totalResults={eventListData.length}
            resultsPerPage={eventListData.length}
            onPageChange={setCurrentEventListPage}
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
    </div>
  );
};

export default Event;