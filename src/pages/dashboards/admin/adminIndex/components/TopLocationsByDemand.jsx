import React from 'react';

const TopLocationsByDemand = () => {
  const locations = ['London (East)', 'Manchester', 'Birmingham', 'London (West)', 'Leeds', 'Liverpool'];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm min-w-0">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Top Locations by Demand</h2>
      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0 last:pb-0">
            <span className="text-sm font-medium text-gray-700">{location}</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-btn-primary" style={{ width: `${80 - index * 10}%` }}></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">4500</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLocationsByDemand;
