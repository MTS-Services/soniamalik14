import React, { useState, useMemo } from 'react';
import Table from '../../../../../components/ui/Table';
import TablePagination from '../../../../../components/ui/TablePagination';
import { Eye } from 'lucide-react';

const SessionsTable = ({ sessions = [], resultsPerPage = 6 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalResults = sessions.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage));

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * resultsPerPage;
        return sessions.slice(start, start + resultsPerPage);
    }, [sessions, currentPage, resultsPerPage]);

    const columns = ['User', 'Service', 'Date', 'Status','Action'];

    const sampleSessions = [
        { id: 's1', user: 'Darlene Robertson', service: 'Physio', date: 'Jan 10', status: 'Completed' },
        { id: 's2', user: 'Jane Cooper', service: 'Physio', date: 'Jan 10', status: 'Upcoming' },
        { id: 's3', user: 'Savannah Nguyen', service: 'Physio', date: 'Jan 10', status: 'Completed' },
        { id: 's4', user: 'Brooklyn Simmons', service: 'Physio', date: 'Jan 11', status: 'Upcoming' },
        { id: 's5', user: 'Kristin Watson', service: 'Physio', date: 'Jan 12', status: 'Completed' },
        { id: 's6', user: 'Eleanor Pena', service: 'Physio', date: 'Jan 12', status: 'Upcoming' }
    ];

    const effectiveSessions = (sessions && sessions.length > 0) ? sessions : sampleSessions;

    const renderRow = (session) => (
        <>
            <td className="px-4 py-4 text-tableText">{session.user}</td>
            <td className="px-4 py-4 text-tableText">{session.service}</td>
            <td className="px-4 py-4 text-tableText">{session.date}</td>
            <td className="px-4 py-4 text-tableText">  <span
                    className={`${session.status === 'Completed'
                        ? 'text-teal-600'
                        : 'text-blue-600'
                        }`}
                >
                    {session.status}
                </span></td>
            <td className="px-8 py-4">
               <button> <Eye className="w-4 h-4 text-gray-600 cursor-pointer" /></button>
            </td>
        </>
    );

    return (
        <div>
            <Table
                columns={columns}
                data={paginated.length ? paginated : effectiveSessions.slice(0, resultsPerPage)}
                renderRow={renderRow}
            />

            <div className="">
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div>
        </div>
    );
};

export default SessionsTable;
