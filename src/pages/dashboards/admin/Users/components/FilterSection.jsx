import React from 'react';

const FilterSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="From date"
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="To date"
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-gray-500">
                    <option>Select Sport</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-base appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-gray-500">
                    <option>Status</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    );
};

export default FilterSection;
