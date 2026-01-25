import React from 'react';
import Button from '../../../../components/ui/Button';

const Pagination = ({ page = 1, total = 10, onChange }) => {
  const pages = Array.from({ length: Math.min(total, 7) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button variant="outline" onClick={() => onChange && onChange(page - 1)} disabled={page === 1}>
        Prev
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'primary' : 'outline'}
          onClick={() => onChange && onChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button variant="outline" onClick={() => onChange && onChange(page + 1)} disabled={page === total}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
