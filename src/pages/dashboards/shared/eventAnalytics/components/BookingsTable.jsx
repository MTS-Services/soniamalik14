import React, { useMemo, useState } from 'react';
import TablePagination from '../../../../../components/ui/TablePagination';

const BookingsTable = ({ bookings = [], resultsPerPage = 6 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalResults = bookings.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage));

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * resultsPerPage;
        return bookings.slice(start, start + resultsPerPage);
    }, [bookings, currentPage, resultsPerPage]);

    return (
        <div className="mt-10">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b bg-white border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Bookings</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F8F8F8]">
                            <tr>
                                <th scope="col" className="text-left px-6 py-3 text-sm font-medium text-gray-700">Name</th>
                                <th scope="col" className="text-center px-6 py-3 text-sm font-medium text-gray-700">Phone Number</th>
                                <th scope="col" className="text-right px-6 py-3 text-sm font-medium text-gray-700">Email</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginated.map((b, idx) => (
                                <tr key={idx} className="odd:bg-white even:bg-white">
                                    <td className="px-6 py-6 text-sm text-gray-800 font-medium">{b.name}</td>
                                    <td className="px-6 py-6 text-sm text-center text-gray-700">{b.phone}</td>
                                    <td className="px-6 py-6 text-sm text-gray-700 break-words text-right">{b.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-200">
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onPageChange={(p) => {
                            if (p < 1 || p > totalPages) return;
                            setCurrentPage(p);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;
