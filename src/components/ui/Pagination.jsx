import React from 'react';

const ChevronLeft = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Pagination = ({ page = 1, total = 10, onChange = () => {} }) => {
  const buildPages = () => {
    const pages = [];
    // show all pages when small
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    // when there are many pages, show compact with ellipses
    if (page <= 3) {
      pages.push(1, 2, 3);
      pages.push('end-ellipsis');
      pages.push(total - 1, total);
      return pages;
    }

    if (page >= total - 2) {
      pages.push(1, 2);
      pages.push('start-ellipsis');
      for (let i = total - 2; i <= total; i++) pages.push(i);
      return pages;
    }

    // middle range
    pages.push(1);
    pages.push('start-ellipsis');
    pages.push(page - 1, page, page + 1);
    pages.push('end-ellipsis');
    pages.push(total);
    return pages;
  };

  const pages = buildPages();

  const squareBase = 'h-10 w-10 inline-flex items-center justify-center rounded-md text-base border';

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        aria-label="Prev"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`${squareBase} ${page === 1 ? 'bg-gray-100 text-gray-400 border-gray-100' : 'bg-white text-gray-700 border-gray-200'}`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) => {
        if (p === 'start-ellipsis' || p === 'end-ellipsis') {
          return (
            <div
              key={`e-${idx}`}
              className={`${squareBase} bg-white border-gray-200 text-gray-500 flex items-center justify-center`}
            >
              â€¦
            </div>
          );
        }

        const isCurrent = p === page;

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${squareBase} ${isCurrent ? 'border-teal-600 text-teal-800' : 'border-gray-200 text-gray-800'} bg-white`}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {p}
          </button>
        );
      })}

      <button
        aria-label="Next"
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className={`${squareBase} ${page === total ? 'bg-gray-100 text-gray-400 border-gray-100' : 'bg-white text-gray-700 border-gray-200'}`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
