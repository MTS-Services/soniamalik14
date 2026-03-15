import React from 'react';

const PaginationSection = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <span className="text-sm text-gray-600">
                Showing 1 to 6 of 6 results
            </span>
            <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    Previous
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationSection;
