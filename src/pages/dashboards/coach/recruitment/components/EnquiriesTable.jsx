import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ApplicantModal from './ApplicantModal';

const EnquiriesTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const [selected, setSelected] = useState(null);



    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-md font-sans overflow-hidden">
            {/* Title */}
            <div className="pt-6 px-6 pb-4">
                <h2 className="m-0 text-2xl font-semibold text-gray-900">Enquiries</h2>
            </div>

            {/* Table for desktop, hidden on mobile */}
            <div className="hidden md:block">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#E7F1F1]">
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200">Player Name</th>
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200">Phone Number</th>
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200">Email</th>
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200">Message</th>
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200">Date</th>
                            <th className="px-6 py-3 text-left text-base font-medium text-gray-500 border-t border-b border-gray-200 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((e, i) => (
                            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50/50">
                                <td className="px-6 py-5 text-base text-gray-900 font-medium whitespace-nowrap">{e.name}</td>
                                <td className="px-6 py-5 text-base text-gray-700 whitespace-nowrap">{e.phone}</td>
                                <td className="px-6 py-5 text-base text-gray-700 break-words max-w-[150px]">{e.email}</td>
                                <td className="px-6 py-5 text-base text-gray-500 max-w-[250px] leading-relaxed">{e.msg}</td>
                                <td className="px-6 py-5 text-base text-gray-700 whitespace-nowrap">{e.date}</td>
                                                                <td className="px-6 py-5 text-base text-gray-700">
                                                                    <button
                                                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                                                                        onClick={() => setSelected(e)}
                                                                        aria-label="View Details"
                                                                    >
                                                                        <ChevronRight className="w-5 h-5 text-gray-800" />
                                                                    </button>
                                                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for mobile, hidden on desktop */}
            <div className="block md:hidden px-4 pb-2">
                {currentItems.map((e, i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-lg mb-4 bg-gray-50 shadow-sm p-4"
                    >
                        <div className="font-semibold text-teal-600 text-[16px] mb-2">{e.name}</div>
                        <div className="text-base text-gray-700 mb-1">
                            <span className="font-medium">Phone:</span> {e.phone}
                        </div>
                        <div className="text-base text-gray-700 mb-1">
                            <span className="font-medium">Email:</span> {e.email}
                        </div>
                        <div className="text-base text-gray-500 mb-1">
                            <span className="font-medium">Message:</span> {e.msg}
                        </div>
                        <div className="text-base text-gray-700 mb-2">
                            <span className="font-medium">Date:</span> {e.date}
                        </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                                                        onClick={() => setSelected(e)}
                                                        aria-label="View Details"
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-gray-800" />
                                                    </button>
                                                </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 px-4 md:px-6 pb-4 md:pb-8 pt-4"
            >
                <span
                    className="text-base text-teal-700 font-medium text-center md:text-left"
                >
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} results
                </span>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-base font-medium rounded-lg border transition-colors duration-150 ${
                            currentPage === 1
                                ? 'text-gray-400 border-gray-300 bg-white cursor-default'
                                : 'text-teal-700 border-teal-600 bg-white hover:bg-teal-50 cursor-pointer'
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-150 ${
                            currentPage === totalPages
                                ? 'text-gray-400 border-gray-300 bg-white cursor-default'
                                : 'text-teal-700 border-teal-600 bg-white hover:bg-teal-50 cursor-pointer'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* Modal for applicant details */}
            <ApplicantModal enquiry={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default EnquiriesTable;
