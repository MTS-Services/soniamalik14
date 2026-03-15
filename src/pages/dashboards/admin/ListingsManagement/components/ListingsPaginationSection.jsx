import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ListingsPaginationSection = () => {
    return (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">Showing 1 to 6 of 6 results</p>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ListingsPaginationSection;
