import React, { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import Table from '../../../../../components/ui/Table';
import TablePagination from '../../../../../components/ui/TablePagination';

const ApplicationTable = ({ applicants = [], resultsPerPage = 9 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = applicants.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * resultsPerPage;
    return applicants.slice(start, start + resultsPerPage);
  }, [applicants, currentPage, resultsPerPage]);

  const columns = ['Player Name', 'Phone Number', 'Email', 'Date', 'Position', 'Status'];

  const sampleApplicants = [
    { id: 's1', name: 'Eleanor Pena', phone: '(219) 555-0114', email: 'kenzi.lawson@example.com', date: '15 Jan 2026', position: 'Midfielder' },
    { id: 's2', name: 'Wade Warren', phone: '(208) 555-0112', email: 'alma.lawson@example.com', date: '15 Jan 2026', position: 'Midfielder' },
    { id: 's3', name: 'Alex Morgan', phone: '(219) 555-0144', email: 'alex.morgan@example.com', date: '16 Jan 2026', position: 'Forward' },
    { id: 's4', name: 'Jordan Smith', phone: '(310) 555-0199', email: 'jordan.smith@example.com', date: '17 Jan 2026', position: 'Defender' },
    { id: 's5', name: 'Casey Lee', phone: '(415) 555-0133', email: 'casey.lee@example.com', date: '18 Jan 2026', position: 'Goalkeeper' }
  ];

  const effectiveApplicants = (applicants && applicants.length > 0) ? applicants : sampleApplicants;

  const renderRow = (a) => (
    <>
      <td className="px-4 py-4">{a.name}</td>
      <td className="px-4 py-4 text-gray-600">{a.phone}</td>
      <td className="px-4 py-4 text-gray-600">{a.email}</td>
      <td className="px-4 py-4 text-gray-600">{a.date}</td>
      <td className="px-4 py-4 text-gray-600">{a.position}</td>
      <td className="px-4 py-4">
        <button type="button" title="View applicant" className="p-2 rounded-md text-gray-600 hover:text-gray-900">
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </>
  );

  return (
    <div>
      <Table columns={columns} data={paginated.length ? paginated : effectiveApplicants.slice(0, resultsPerPage)} renderRow={renderRow} />

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

export default ApplicationTable;
