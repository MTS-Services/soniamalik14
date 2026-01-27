import React from 'react';
import Button from './Button';

const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  totalResults = 0,
  resultsPerPage = 10,
  onPageChange,
  showResultsText = true,
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className=" bg-white border-gray-100 border-t px-6 py-4 rounded-b-lg flex items-center justify-between">
      {showResultsText && (
        <p className="text-sm text-cardTitle">
          Showing {startResult} to {endResult} of {totalResults} results
        </p>
      )}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-white border border-cardTitle text-cardTitle rounded-xl px-4 py-0.5 text-sm font-medium hover:bg-cardTitle/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white border border-cardTitle text-cardTitle rounded-xl px-4 py-0.5 text-sm font-medium hover:bg-cardTitle/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
