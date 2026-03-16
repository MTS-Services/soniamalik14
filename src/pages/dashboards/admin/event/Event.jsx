import React, { useState, useMemo } from 'react';
import EventHeaderSection from './components/EventHeaderSection';
import EventSearchAndFilters from './components/EventSearchAndFilters';
import EventTableHeader from './components/EventTableHeader';
import EventTableRow from './components/EventTableRow';
import EventEmptyState from './components/EventEmptyState';
import EventPagination from './components/EventPagination';

const Events = () => {
  // Filter States
  const [activeTab, setActiveTab] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Hardcoded dummy data matching the image exactly
  const eventsData = [
    {
      id: 1,
      name: 'Beginner Tennis Sessions',
      date: '03/03/2025',
      provider: "Sarah's Tennis Academy",
      providerSub: '',
      sport: 'Tennis',
      postcode: 'SW1A 1AA',
      status: 'Pending',
      engagement: null
    },
    {
      id: 2,
      name: 'City 5x5 Football Championship',
      date: '03/03/2025',
      provider: 'City Sports',
      providerSub: 'Texnsports',
      sport: 'Football',
      postcode: 'EC1A 1BB',
      status: 'Featured',
      engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
    },
    {
      id: 3,
      name: 'Future Tennis Stars Clinic',
      date: '04/03/2025',
      provider: 'Grand Slam Acad..',
      providerSub: 'ExmoRatsmanades',
      sport: 'Badminton',
      postcode: 'M1 1AE',
      status: 'Live',
      engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
    },
    {
      id: 4,
      name: 'Weekend Yoga Retreat',
      date: '05/03/2025',
      provider: 'ZenFit Retreats',
      providerSub: 'Fionstranics',
      sport: 'Cricket',
      postcode: 'B1 1AA',
      status: 'Live',
      engagement: { views: 1250, trend: 48, messages: 28, shares: 28 }
    },
    {
      id: 5,
      name: 'Flag Football League Kickoff',
      date: '06/03/2025',
      provider: 'Kickoff League',
      providerSub: 'EESTRoone Lounge',
      sport: 'Football',
      postcode: 'LS1 1UR',
      status: 'Banned',
      engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
    },
    {
      id: 6,
      name: 'Padel Tournament - Semi Finals',
      date: '07/03/2025',
      provider: 'ESSA Hub',
      providerSub: 'FESL , Whoe Hub',
      sport: 'Padel',
      postcode: 'G1 1AA',
      status: 'Live',
      engagement: { views: 1250, trend: 45, messages: 28, shares: 28 }
    }
  ];

  const tabs = ['All Events', 'Pending', 'Featured', 'Live', 'Past', 'Banned'];

  // Get unique sports for the dropdown
  const uniqueSports = ['All Sports', ...Array.from(new Set(eventsData.map(item => item.sport)))];

  // Helper function to parse "DD/MM/YYYY" to a comparable Date object
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    return eventsData.filter((event) => {
      // 1. Tab Filter
      const matchesTab = activeTab === 'All Events' || event.status === activeTab;

      // 2. Search Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        event.name.toLowerCase().includes(query) ||
        event.provider.toLowerCase().includes(query) ||
        (event.providerSub && event.providerSub.toLowerCase().includes(query)) ||
        event.sport.toLowerCase().includes(query) ||
        event.postcode.toLowerCase().includes(query);

      // 3. Sport Dropdown Filter
      const matchesSport = selectedSport === 'All Sports' || event.sport === selectedSport;

      // 4. Date Filters
      const eventDate = parseDate(event.date);
      const filterFromDate = fromDate ? new Date(fromDate) : null;
      const filterToDate = toDate ? new Date(toDate) : null;

      const matchesFromDate = !filterFromDate || (eventDate && eventDate >= filterFromDate);
      const matchesToDate = !filterToDate || (eventDate && eventDate <= filterToDate);

      return matchesTab && matchesSearch && matchesSport && matchesFromDate && matchesToDate;
    });
  }, [activeTab, searchQuery, selectedSport, fromDate, toDate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Featured':
        return <span className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">Featured</span>;
      case 'Pending':
        return <span className="px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">Pending</span>;
      case 'Live':
        return <span className="px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">Live</span>;
      case 'Banned':
        return <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">Banned</span>;
      case 'Past':
        return <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">Past</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      <div className="">

        {/* Header Section */}
        <EventHeaderSection />

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

          {/* Search and Filters */}
          <EventSearchAndFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            tabs={tabs}
            uniqueSports={uniqueSports}
          />

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <EventTableHeader />
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <EventTableRow key={row.id} row={row} />
                  ))
                ) : (
                  <EventEmptyState />
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <EventPagination filteredDataLength={filteredData.length} />

        </div>
      </div>
    </div>
  );
};

export default Events;