import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const EnquiriesTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Enquiries</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#E7F1F1] border-b border-gray-100">
                        <tr>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Player Name</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Phone Number</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Email</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Message</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Date</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {currentItems.map((e, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-5 py-6 text-[14px] text-gray-800 whitespace-nowrap font-medium">{e.name}</td>
                                <td className="px-5 py-6 text-[14px] text-gray-600 whitespace-nowrap">{e.phone}</td>
                                <td className="px-5 py-6 text-[14px] text-gray-600 break-words max-w-[150px]">{e.email}</td>
                                <td className="px-5 py-6 text-[14px] text-gray-500 max-w-[250px] leading-relaxed">{e.msg}</td>
                                <td className="px-5 py-6 text-[14px] text-gray-600 whitespace-nowrap">{e.date}</td>
                                <td className="px-5 py-6 text-[14px] text-gray-600">
                                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5 text-gray-800" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <p className="text-[13px] text-[#0F766E] font-semibold">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} results</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnquiriesTable;
