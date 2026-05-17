import React, { useEffect, useMemo, useState } from 'react';
import EventHeaderSection from './components/EventHeaderSection';
import EventSearchAndFilters from './components/EventSearchAndFilters';
import EventTableHeader from './components/EventTableHeader';
import EventTableRow from './components/EventTableRow';
import EventEmptyState from './components/EventEmptyState';
import EventPagination from './components/EventPagination';
import { GET } from '../../../../services/httpMethods';
import { ENDPOINT } from '../../../../services/httpEndpoint';

const normalizeEventsList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value.events)) return value.events;
  if (Array.isArray(value.data)) return value.data;
  if (Array.isArray(value.rows)) return value.rows;
  if (Array.isArray(value.items)) return value.items;
  return [];
};

const formatDate = (value) => {
  if (!value) return 'Date not set';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatStatus = (value) => {
  const normalized = String(value || '').trim().toLowerCase();

  if (['approved', 'live', 'active'].includes(normalized)) return 'Live';
  if (['pending', 'pending_approval', 'awaiting'].includes(normalized)) return 'Pending';
  if (['featured'].includes(normalized)) return 'Featured';
  if (['banned', 'blocked', 'rejected'].includes(normalized)) return 'Banned';
  if (['past', 'completed', 'ended'].includes(normalized)) return 'Past';

  return value ? String(value) : 'Pending';
};

const formatProviderName = (event) =>
  event?.provider || event?.organizer?.name || event?.organizerName || event?.providerName || 'Provider not set';

const formatProviderSub = (event) =>
  event?.providerSub || event?.organizer?.subtitle || event?.providerSubtitle || event?.organizerName || '';

const formatSport = (event) => event?.sport || event?.sportType || event?.category || 'Sport not set';

const formatPostcode = (event) => event?.postcode || event?.zipCode || event?.postalCode || event?.venue?.postcode || 'N/A';

const formatEngagement = (event) => event?.engagement || event?.metrics || null;

const Events = () => {
  // Filter States
  const [activeTab, setActiveTab] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GET(ENDPOINT.EVENTS.LIST, {}, controller.signal);
        const rows = normalizeEventsList(response?.data?.data || response?.data || response || []);

        if (!isActive) return;

        setEventsData(
          rows.map((event) => ({
            id: event?.id,
            name: event?.name || event?.title || 'Untitled Event',
            date: formatDate(event?.date || event?.startDate || event?.eventDate),
            provider: formatProviderName(event),
            providerSub: formatProviderSub(event),
            sport: formatSport(event),
            postcode: formatPostcode(event),
            status: formatStatus(event?.status || event?.approvalStatus || event?.eventStatus),
            engagement: formatEngagement(event),
          }))
        );
      } catch (err) {
        if (!isActive) return;

        setEventsData([]);
        setError(err?.response?.data?.message || err?.message || 'Failed to fetch events');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const tabs = ['All Events', 'Pending', 'Featured', 'Live', 'Past', 'Banned'];

  // Get unique sports for the dropdown
  const uniqueSports = ['All Sports', ...Array.from(new Set(eventsData.map((item) => item.sport).filter(Boolean)))];

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
  }, [activeTab, searchQuery, selectedSport, fromDate, toDate, eventsData]);

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
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading events from the backend...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">Error: {error}</div>
            ) : (
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
            )}
          </div>

          {/* Pagination */}
          <EventPagination filteredDataLength={filteredData.length} />

        </div>
      </div>
    </div>
  );
};

export default Events;