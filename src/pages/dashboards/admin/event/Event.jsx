import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Button from '../../../../components/ui/Button';

const Event = () => {
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const [currentEventListPage, setCurrentEventListPage] = useState(1);

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

  const renderEventRow = (event) => (
    <>
      <td className="px-4 py-4 text-sm">{event.title}</td>
      <td className="px-4 py-4 text-sm">{event.type}</td>
      <td className="px-4 py-4 text-sm">{event.organizer}</td>
      <td className="px-4 py-4 text-sm">{event.role}</td>
      <td className="px-4 py-4 text-sm">{event.sport}</td>
      <td className="px-4 py-4 text-sm">{event.date}</td>
      <td className="px-4 py-4">
        <span
          className="text-sm font-medium"
          style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.status}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </td>
    </>
  );

  const renderEventListRow = (event) => (
    <>
      <td className="px-4 py-4 ">{event.title}</td>
      <td className="px-4 py-4 ">{event.type}</td>
      <td className="px-4 py-4 ">{event.organizer}</td>
      <td className="px-4 py-4 ">{event.role}</td>
      <td className="px-4 py-4 ">{event.sport}</td>
      <td className="px-4 py-4 ">{event.date}</td>
      <td className="px-4 py-4">
        <span
          className="text-sm font-medium"
          style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.status}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <div className="flex items-center gap-2">
          
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </td>
    </>
  );

  const renderEventCard = (event, index) => (
    <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 mb-3">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{event.title}</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
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
            className="text-sm font-medium"
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
          {eventListData.map((event, index) => renderEventCard(event, index))}
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
    </div>
  );
};

export default Event;