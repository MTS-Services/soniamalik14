import React from 'react';

const DemandVsSupply = () => {
  const sports = ['Football', 'Cricket', 'Tennis', 'Squash', 'Rugby', 'Netball', 'Golf', 'Running'];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm min-w-0">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Demand vs Supply by Sport</h2>
      <div className="space-y-3">
        {sports.map((sport, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 w-20">{sport}</span>
            <div className="flex-1 flex gap-1">
              <div className="h-2 bg-btn-primary rounded flex-1"></div>
              <div className="h-2 bg-yellow-300 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandVsSupply;
