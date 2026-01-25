import React from 'react';
import Button from '../../../../components/ui/Button';

const Filters = ({ onFilter, active = 'All' }) => {
  const types = ['All', 'Clubs', 'Sessions', 'Training'];

  return (
    <div className="bg-secondary p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-white rounded-md px-3 py-2 shadow-sm">
          <input
            placeholder="Enter Postcode/City"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex gap-2">
          {types.map((t) => (
            <Button
              key={t}
              variant={t === active ? 'primary' : 'outline'}
              className={`rounded-full px-4 py-1 ${t === active ? 'shadow' : ''}`}
              onClick={() => onFilter && onFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
