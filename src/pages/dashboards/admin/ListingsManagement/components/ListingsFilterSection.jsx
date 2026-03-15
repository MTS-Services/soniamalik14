import React from 'react';
import { Search } from 'lucide-react';

const ListingsFilterSection = () => {
    return (
        <div className="mb-6">
            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search listings, providers or categories"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                    <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-[#373737]">
                        <option>Select sports</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-[#373737] pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className="relative">
                    <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-[#373737]">
                        <option>Status</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-[#373737] pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className="relative">
                    <input
                        type="date"
                        placeholder="Form date"
                        className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                    />
                </div>
                <div className="relative">
                    <input
                        type="date"
                        placeholder="To date"
                        className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingsFilterSection;
