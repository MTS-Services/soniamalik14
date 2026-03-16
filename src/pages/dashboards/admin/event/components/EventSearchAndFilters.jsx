import React from 'react';
import { Search, ChevronDown, Calendar } from 'lucide-react';

const EventSearchAndFilters = ({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedSport,
    setSelectedSport,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    tabs,
    uniqueSports
}) => {
    return (
        <div className="p-6">
            {/* Search and Tabs */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-gray-100 pb-4 mb-6">

                {/* Search Bar */}
                <div className="flex items-center w-full max-w-md bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search listings, providers or categories"
                        className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Tabs - Desktop View */}
                <div className="hidden lg:flex w-full lg:w-auto gap-6 pb-4 border-b border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-base font-medium whitespace-nowrap pb-4 -mb-4 transition-colors ${activeTab === tab
                                ? 'text-[#0f766e] border-b-2 border-[#0f766e]'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tabs - Mobile Select View */}
                <div className="lg:hidden relative w-full">
                    <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="appearance-none w-full px-4 py-2 pr-10 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                    >
                        {tabs.map((tab) => (
                            <option key={tab} value={tab}>{tab}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            {/* Dropdown & Date Filters */}
            <div className="flex flex-wrap gap-4">

                {/* Sport Filter Dropdown */}
                <div className="relative">
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        className="appearance-none flex items-center justify-between w-40 px-4 py-2 pr-10 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                    >
                        {uniqueSports.map(sport => (
                            <option key={sport} value={sport}>{sport === 'All Sports' ? 'Select sports' : sport}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* From Date Filter */}
                <div className="relative">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="appearance-none flex items-center justify-between w-40 px-4 py-2 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    {!fromDate && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none bg-white pr-2">Form date</span>}
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* To Date Filter */}
                <div className="relative">
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="appearance-none flex items-center justify-between w-40 px-4 py-2 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    {!toDate && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none bg-white pr-2">To date</span>}
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

            </div>
        </div>
    );
};

export default EventSearchAndFilters;
