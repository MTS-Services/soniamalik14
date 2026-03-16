import React from 'react';
import { ChevronDown } from 'lucide-react';

const AnalyticsCharts = ({ userFilter, onUserFilterChange }) => {
    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">User</h2>
                <button
                    onClick={onUserFilterChange}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                >
                    {userFilter} <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-base font-medium text-gray-700">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span>Player
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDE68A]"></span>Service Provider
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]"></span>Sport Providers
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-[280px] w-full">
                {/* Y Axis Grid & Labels */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400 pb-8">
                    {['50K', '40K', '30K', '20K', '10K', '1k'].map((label, i) => (
                        <div className="flex items-center w-full gap-4" key={i}>
                            <span className="w-6 text-right">{label}</span>
                            <div className="flex-1 border-b border-dashed border-gray-100"></div>
                        </div>
                    ))}
                </div>

                {/* SVG Lines */}
                <div className="absolute inset-0 left-10 bottom-8">
                    <svg viewBox="0 0 1000 240" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        {/* Navy Line (Sport Providers) */}
                        <path
                            d="M 0 240 C 200 150, 400 130, 600 140 C 800 150, 900 120, 1000 80"
                            fill="none" stroke="#111827" strokeWidth="2.5"
                        />
                        {/* Yellow Line (Service Provider) */}
                        <path
                            d="M 0 240 C 200 160, 300 90, 500 120 C 700 150, 800 140, 1000 40"
                            fill="none" stroke="#fde047" strokeWidth="2.5"
                        />
                        {/* Teal Line (Player) */}
                        <path
                            d="M 0 240 C 150 50, 300 80, 450 100 C 600 120, 700 -20, 850 60 C 900 90, 950 160, 1000 170"
                            fill="none" stroke="#2dd4bf" strokeWidth="2.5"
                        />
                    </svg>
                </div>

                {/* X Axis Labels */}
                <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-400 font-medium">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <span key={m}>{m}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
