import React from 'react';
import { Download } from 'lucide-react';

const DemandHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Demand Signals</h1>
                <p className="text-sm text-gray-500 mt-1">Monitor and analyze user demand, interests, and platform engagement.</p>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0f766e] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors">
                <Download className="w-4 h-4" />
                Export CSV
            </button>
        </div>
    );
};

export default DemandHeader;
