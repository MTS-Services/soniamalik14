import React, { useState, useMemo } from 'react';
import { Download, Search, ChevronDown } from 'lucide-react';

const DemandSignals = () => {
    // State for Tabs and Filters
    const [activeTab, setActiveTab] = useState('Account Preferences');
    const [riSearchQuery, setRiSearchQuery] = useState('');
    const [riFilter, setRiFilter] = useState('All');

    const tabs = ['Account Preferences', 'Register Interest', 'Missing Sports', 'Contact Metadata'];

    // --- DUMMY DATA ---
    const accountPreferencesData = [
        { id: 1, userId: 'USR-1000', sport: 'Tennis', postcode: 'SW1A 1AA', dateJoined: '03/03/2025' },
        { id: 2, userId: 'USR-1001', sport: 'Football', postcode: 'EC1A 1BB', dateJoined: '03/03/2025' },
        { id: 3, userId: 'USR-1002', sport: 'Badminton', postcode: 'M1 1AE', dateJoined: '03/03/2025' },
        { id: 4, userId: 'USR-1003', sport: 'Cricket', postcode: 'B1 1AA', dateJoined: '03/03/2025' },
        { id: 5, userId: 'USR-1004', sport: 'Football', postcode: 'LS1 1UR', dateJoined: '03/03/2025' },
        { id: 6, userId: 'USR-1005', sport: 'Padel', postcode: 'G1 1AA', dateJoined: '03/03/2025' },
    ];

    const registerInterestData = [
        { id: 1, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Pending' },
        { id: 2, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Contacted' },
        { id: 3, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Contacted' },
        { id: 4, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Pending' },
        { id: 5, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Contacted' },
        { id: 6, user: 'USR-1000', listing: 'Premium Tennis Court', sport: 'Tennis', location: 'E1 6AN', date: '03/03/2025', responseTime: '5h', provider: 'Provider A', status: 'Contacted' },
    ];

    const missingSportsData = [
        { id: 1, userId: 'USR-1000', requestedSport: 'Badminton', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
        { id: 2, userId: 'USR-1000', requestedSport: 'Cricket', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
        { id: 3, userId: 'USR-1000', requestedSport: 'Cricket', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
        { id: 4, userId: 'USR-1000', requestedSport: 'Badminton', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
        { id: 5, userId: 'USR-1000', requestedSport: 'Badminton', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
        { id: 6, userId: 'USR-1000', requestedSport: 'Badminton', postcode: 'SW1A', radius: '10 MILE RADIUS', date: '03/03/2025', notes: 'Looking for local facilities.' },
    ];

    const contactMetadataData = [
        { id: 1, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '39m', unanswered: 100, flagged: 3 },
        { id: 2, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '1h 26m', unanswered: 100, flagged: 3 },
        { id: 3, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '1h 26m', unanswered: 100, flagged: 3 },
        { id: 4, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '1h 26m', unanswered: 100, flagged: 3 },
        { id: 5, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '1h 26m', unanswered: 100, flagged: 3 },
        { id: 6, listing: 'Active Football Hub', provider: 'Provider J', received: 231, replies: 80, avgResponse: '1h 26m', unanswered: 100, flagged: 3 },
    ];

    // --- FILTER LOGIC FOR 'REGISTER INTEREST' TAB ---
    const filteredRegisterInterest = useMemo(() => {
        return registerInterestData.filter(item => {
            const matchesSearch = item.user.toLowerCase().includes(riSearchQuery.toLowerCase()) || 
                                  item.listing.toLowerCase().includes(riSearchQuery.toLowerCase()) ||
                                  item.provider.toLowerCase().includes(riSearchQuery.toLowerCase());
            
            const matchesStatus = riFilter === 'All' || 
                                 (riFilter === 'Contacted' && item.status === 'Contacted') ||
                                 (riFilter === 'Not Contacted' && item.status === 'Pending');

            return matchesSearch && matchesStatus;
        });
    }, [riSearchQuery, riFilter]);


    // --- RENDER METHODS FOR DIFFERENT TABLES ---

    const renderAccountPreferences = () => (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#eff4f4] border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">User ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Sport</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Postcode</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Date Joined</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {accountPreferencesData.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm text-gray-700">{row.userId}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.sport}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.postcode}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.dateJoined}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderRegisterInterest = () => (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#eff4f4] border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">User / Listing</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Sport / Location</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Response Time</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {filteredRegisterInterest.length > 0 ? (
                    filteredRegisterInterest.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-800">{row.user}</div>
                                <div className="text-sm text-[#0f766e] mt-1 hover:underline cursor-pointer">{row.listing}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700">{row.sport}</div>
                                <div className="text-sm text-gray-700 mt-1">{row.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {row.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700">{row.responseTime}</div>
                                <div className="text-sm text-[#0f766e] mt-1">{row.provider}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer w-28 ${
                                    row.status === 'Contacted' ? 'bg-[#e2f3f1] text-[#0f766e]' : 'bg-orange-50 text-orange-600'
                                }`}>
                                    {row.status} <ChevronDown className="w-3 h-3" />
                                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">No signals found matching your filters.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderMissingSports = () => (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#eff4f4] border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">User ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Requested Sport</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Postcode / Radius</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Notes</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {missingSportsData.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm text-gray-700">{row.userId}</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                            <span className="px-3 py-1.5 text-xs font-medium text-[#0f766e] bg-[#e2f3f1] rounded-full">
                                {row.requestedSport}
                            </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                            <div>{row.postcode}</div>
                            <div className="mt-1 text-gray-500 text-xs font-medium tracking-wide">{row.radius}</div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.date}</td>
                        <td className="px-6 py-5 text-sm text-gray-600">{row.notes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderContactMetadata = () => (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#eff4f4] border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">LISTING / PROVIDER</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">RECEIVED</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">REPLIES</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">AVG RESPONSE</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">UNANSWERED</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Flagged</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {contactMetadataData.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{row.listing}</div>
                            <div className="text-sm text-gray-700 mt-1">{row.provider}</div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.received}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.replies}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.avgResponse}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{row.unanswered}</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                            <span className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-full">
                                {row.flagged} Flagged
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-[1600px] mx-auto">
                
                {/* 1. Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Demand Signals</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor and analyze user demand, interests, and platform engagement.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0f766e] text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* 2. Tabs Section - SEPARATED */}
                <div className="mb-6">
                    {/* Mobile View: Select Dropdown */}
                    <div className="md:hidden relative">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent font-medium"
                        >
                            {tabs.map(tab => (
                                <option key={tab} value={tab}>{tab}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Desktop View: Tabs inside a white card */}
                    <div className="hidden md:inline-flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-4 pt-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                    activeTab === tab 
                                        ? 'text-[#0f766e] border-[#0f766e]' 
                                        : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-200'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Dynamic Filters Area - SEPARATED (Only for Register Interest) */}
                {activeTab === 'Register Interest' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                            
                            {/* Search Bar */}
                            <div className="flex items-center w-full lg:max-w-md bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input 
                                    type="text" 
                                    value={riSearchQuery}
                                    onChange={(e) => setRiSearchQuery(e.target.value)}
                                    placeholder="Search signal, providers, listings" 
                                    className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 w-full lg:w-auto overflow-x-auto">
                                {['All', 'Contacted', 'Not Contacted'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setRiFilter(filter)}
                                        className={`flex-1 lg:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                                            riFilter === filter 
                                                ? 'bg-[#0f766e] text-white shadow-sm' 
                                                : 'text-gray-600 hover:bg-gray-200/50'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Table Area - SEPARATED */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        {activeTab === 'Account Preferences' && renderAccountPreferences()}
                        {activeTab === 'Register Interest' && renderRegisterInterest()}
                        {activeTab === 'Missing Sports' && renderMissingSports()}
                        {activeTab === 'Contact Metadata' && renderContactMetadata()}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 bg-white">
                        <span className="text-sm font-medium text-[#0f766e]">
                            Showing 1 to 6 of 6 results
                        </span>
                        <div className="flex gap-2">
                            <button className="px-5 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                                Previous
                            </button>
                            <button className="px-5 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DemandSignals;