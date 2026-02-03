import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import Button from '../../../../components/ui/Button';

const ClubListDetailsc = () => {
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const [currentEventListPage, setCurrentEventListPage] = useState(1);
  const [currentMembersPage, setCurrentMembersPage] = useState(1);

const ActiveData = [
  {
    SessionName: "Morning Cricket Training",
    Sport: "Cricket",
    Coach: "John Smith",
    Date: "15 Jan 2026",
    Players: "18",
    Status: "Active",
  },
  {
    SessionName: "Advanced Batting Drill",
    Sport: "Cricket",
    Coach: "Rahul Dravid",
    Date: "16 Jan 2026",
    Players: "12",
    Status: "Active",
  },
  {
    SessionName: "Junior Football Basics",
    Sport: "Football",
    Coach: "Sarah Jenkins",
    Date: "16 Jan 2026",
    Players: "22",
    Status: "Active",
  },
  {
    SessionName: "Fast Bowling Workshop",
    Sport: "Cricket",
    Coach: "Brett Lee",
    Date: "17 Jan 2026",
    Players: "8",
    Status: "Active",
  },
  {
    SessionName: "Midfield Strategy",
    Sport: "Football",
    Coach: "Mike Ross",
    Date: "18 Jan 2026",
    Players: "15",
    Status: "Active",
  },
  {
    SessionName: "Goalkeeper Reflexes",
    Sport: "Football",
    Coach: "Emma Vance",
    Date: "18 Jan 2026",
    Players: "4",
    Status: "Active",
  },
  {
    SessionName: "Tennis Aces Clinic",
    Sport: "Tennis",
    Coach: "Roger Fed",
    Date: "19 Jan 2026",
    Players: "10",
    Status: "Active",
  },
  {
    SessionName: "Basketball Dunk Prep",
    Sport: "Basketball",
    Coach: "LeBron J.",
    Date: "20 Jan 2026",
    Players: "14",
    Status: "Active",
  },
  {
    SessionName: "Spin Bowling Masterclass",
    Sport: "Cricket",
    Coach: "Shane W.",
    Date: "21 Jan 2026",
    Players: "6",
    Status: "Active",
  },
  {
    SessionName: "Swim Speed Laps",
    Sport: "Swimming",
    Coach: "Michael P.",
    Date: "22 Jan 2026",
    Players: "12",
    Status: "Active",
  },
  {
    SessionName: "Fielding Agility",
    Sport: "Cricket",
    Coach: "Jonty Rhodes",
    Date: "23 Jan 2026",
    Players: "20",
    Status: "Active",
  },
  {
    SessionName: "Penalty Kick Practice",
    Sport: "Football",
    Coach: "David B.",
    Date: "24 Jan 2026",
    Players: "11",
    Status: "Active",
  },
  {
    SessionName: "Point Guard Vision",
    Sport: "Basketball",
    Coach: "Stephen C.",
    Date: "25 Jan 2026",
    Players: "9",
    Status: "Active",
  }
];

  // Sample recruitment posts
  const eventListData = [
 { id: 1, title: 'Summer Youth Trials', sport: 'Football', location: 'Community Ground A', interested: 34, status: 'Approved' },
  { id: 2, title: 'Open Bowling Session', sport: 'Cricket', location: 'Royal Sports Arena', interested: 12, status: 'Pending' },
  { id: 3, title: 'Tennis Beginners', sport: 'Tennis', location: 'Court 3', interested: 8, status: 'Approved' },
  { id: 4, title: 'Winter Football Camp', sport: 'Football', location: 'Community Ground B', interested: 27, status: 'Approved' },
  { id: 5, title: 'Cricket Coaching Clinic', sport: 'Cricket', location: 'Royal Sports Arena', interested: 15, status: 'Pending' },
  { id: 6, title: 'Advanced Tennis Workshop', sport: 'Tennis', location: 'Court 1', interested: 10, status: 'Live' },
  { id: 7, title: 'Junior Football League', sport: 'Football', location: 'Community Ground C', interested: 40, status: 'Live' },
  { id: 8, title: 'Cricket Practice Match', sport: 'Cricket', location: 'Royal Sports Arena', interested: 20, status: 'Live' },
  { id: 9, title: 'Tennis Doubles Tournament', sport: 'Tennis', location: 'Court 2', interested: 12, status: 'Live' },
  { id: 10, title: 'Football Skills Workshop', sport: 'Football', location: 'Community Ground A', interested: 30, status: 'Live' },
  { id: 11, title: 'Evening Cricket Session', sport: 'Cricket', location: 'Royal Sports Arena', interested: 18, status: 'Live' },
  { id: 12, title: 'Tennis Open Day', sport: 'Tennis', location: 'Court 3', interested: 9, status: 'Live' },
  ];

  // Sample club members
  const membersData = [
     { id: 1, name: 'Ariane McCoy', role: 'Owner', joined: '2020-02-10', status: 'Active' },
  { id: 2, name: 'Albert Flores', role: 'Coach', joined: '2021-06-21', status: 'Active' },
  { id: 3, name: 'Dianne Bussell', role: 'Player', joined: '2022-09-12', status: 'Active' },
  { id: 4, name: 'Michael Brown', role: 'Player', joined: '2021-03-05', status: 'Inactive' },
  { id: 5, name: 'Sarah Johnson', role: 'Coach', joined: '2020-11-14', status: 'Active' },
  { id: 6, name: 'David Wilson', role: 'Player', joined: '2022-01-23', status: 'Active' },
  { id: 7, name: 'Emma Davis', role: 'Player', joined: '2021-08-30', status: 'Active' },
  { id: 8, name: 'James Miller', role: 'Player', joined: '2020-05-19', status: 'Inactive' },
  { id: 9, name: 'Olivia Taylor', role: 'Coach', joined: '2022-04-12', status: 'Active' },
  { id: 10, name: 'Liam Anderson', role: 'Player', joined: '2021-12-01', status: 'Active' },
  { id: 11, name: 'Sophia Thomas', role: 'Player', joined: '2020-09-08', status: 'Active' },
  { id: 12, name: 'Noah Jackson', role: 'Player', joined: '2022-07-15', status: 'Active' },

  ];

  // Pagination settings
  const activePerPage = 6;
  const recruitmentPerPage = 5;
  const membersPerPage = 6;

  const activeTotalPages = Math.max(1, Math.ceil(ActiveData.length / activePerPage));
  const recruitmentTotalPages = Math.max(1, Math.ceil(eventListData.length / recruitmentPerPage));
  const membersTotalPages = Math.max(1, Math.ceil(membersData.length / membersPerPage));

  const activePageData = ActiveData.slice((currentEventPage - 1) * activePerPage, (currentEventPage - 1) * activePerPage + activePerPage);
  const recruitmentPageData = eventListData.slice((currentEventListPage - 1) * recruitmentPerPage, (currentEventListPage - 1) * recruitmentPerPage + recruitmentPerPage);
  const membersPageData = membersData.slice((currentMembersPage - 1) * membersPerPage, (currentMembersPage - 1) * membersPerPage + membersPerPage);



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

  const ActiveColumns = [
    'Session Name',
    'Sport',
    'Coach',
    'Date',
    'Players',
    'Status',
    
  ];
  const RecruitmentColumns = [
    'Title',
    'Sport',
    'Location',
    'Interested',
    'Status',
    
    
  ];
  const ClubColumns = [
    'Name',
    'Role',
    'Joined',
    'Status',
   
   
    
  ];

  const renderEventRow = (event) => (
    <>
      <td className="px-4 py-4 text-base">{event.SessionName}</td>
      <td className="px-4 py-4 text-base">{event.Sport}</td>
      <td className="px-4 py-4 text-base">{event.Coach}</td>
      <td className="px-4 py-4 text-base">{event.Date}</td>
      <td className="px-4 py-4 text-base">{event.Players}</td>
      <td className="px-4 py-4">
        <span
          className="text-base font-medium"
            style={{ color: event.Status === 'Active' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.Status}
        </span>
      </td>

    </>
  );

  const renderEventListRow = (event) => (
    <>
      <td className="px-4 py-4 ">{event.title}</td>
      <td className="px-4 py-4 ">{event.sport}</td>
      <td className="px-4 py-4 ">{event.location}</td>
      <td className="px-4 py-4 ">{event.interested}</td>
      <td className="px-4 py-4">
        <span
          className="text-sm font-medium text-[#0F766E]"
          style={{ color: event.status === 'Approved' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}
        >
          {event.status}
        </span>
      </td>
 
    </>
  );

  const renderMemberRow = (member) => (
    <>
      <td className="px-4 py-4">{member.name}</td>
      <td className="px-4 py-4">{member.role}</td>
      <td className="px-4 py-4">{member.joined}</td>
      <td className="px-4 py-4">
        <span className="text-sm font-medium" style={{ color: member.status === 'Active' ? 'var(--color-btn-primary)' : 'var(--color-dashboardPending)' }}>
          {member.status}
        </span>
      </td>
 
    </>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50 ">
      {/* Event Section */}
      <div className=''>
        <DashboardHeader title="Active Sessions" />
        <div className="border border-gray-100 rounded-md">
          <Table columns={ActiveColumns} data={activePageData} renderRow={renderEventRow} />
          <TablePagination
            currentPage={currentEventPage}
            totalPages={activeTotalPages}
            totalResults={ActiveData.length}
            resultsPerPage={activePerPage}
            onPageChange={setCurrentEventPage}
          />
        </div>
      </div>

      {/* Event List Section */}
      <div >
        <div className='pt-6 pb-2'>


        <DashboardHeader title="Recruitment Posts " />
        </div>
        <div className="border border-gray-100 rounded-md">
          <Table columns={RecruitmentColumns} data={recruitmentPageData} renderRow={renderEventListRow} />
          <TablePagination
            currentPage={currentEventListPage}
            totalPages={recruitmentTotalPages}
            totalResults={eventListData.length}
            resultsPerPage={recruitmentPerPage}
            onPageChange={setCurrentEventListPage}
          />
        </div>
      </div>
      <div>
        <DashboardHeader title="Club Members" />
        <div className="border border-gray-100 rounded-md">
          <Table columns={ClubColumns} data={membersPageData} renderRow={renderMemberRow} />
          <TablePagination
            currentPage={currentMembersPage}
            totalPages={membersTotalPages}
            totalResults={membersData.length}
            resultsPerPage={membersPerPage}
            onPageChange={setCurrentMembersPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ClubListDetailsc;