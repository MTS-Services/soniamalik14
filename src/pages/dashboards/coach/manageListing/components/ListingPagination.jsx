import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ListingPagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-10 flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded border transition-colors ${currentPage === 1 ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
                <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded transition-all font-bold text-sm border ${currentPage === i + 1
                            ? 'bg-[#007A70] text-white border-[#007A70] shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#007A70]'
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded border transition-colors ${currentPage === totalPages ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default ListingPagination;
