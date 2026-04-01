import React, { useState } from 'react';

const RegisteredInterestTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Registered Interest</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFB] border-b border-gray-100">
                        <tr>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Name</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Phone Number</th>
                            <th className="px-5 py-4 text-[13px] font-semibold text-gray-600">Email</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {currentItems.map((b, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-5 py-4 text-[14px] text-gray-800">{b.name}</td>
                                <td className="px-5 py-4 text-[14px] text-gray-600">{b.phone}</td>
                                <td className="px-5 py-4 text-[14px] text-gray-600">{b.email}</td>
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

export default RegisteredInterestTable;
