import React from 'react';
import { Search } from 'lucide-react';

const DemandFilters = ({ riSearchQuery, setRiSearchQuery, riFilter, setRiFilter }) => {
    return (
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
                        className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 w-full lg:w-auto overflow-x-auto">
                    {['All', 'Contacted', 'Not Contacted'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setRiFilter(filter)}
                            className={`flex-1 lg:flex-none px-4 py-2 text-base font-medium rounded-md transition-colors whitespace-nowrap ${riFilter === filter
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
    );
};

export default DemandFilters;
