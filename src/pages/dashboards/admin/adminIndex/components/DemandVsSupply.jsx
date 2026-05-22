import React from 'react';

const DemandVsSupply = () => {
  const sportsData = [
    { name: 'Football', demand: 90, supply: 40 },
    { name: 'Cricket', demand: 90, supply: 40 },
    { name: 'Tennis', demand: 90, supply: 40 },
    { name: 'Squash', demand: 90, supply: 40 },
    { name: 'Rugby', demand: 90, supply: 40 },
    { name: 'Netball', demand: 85, supply: 40 },
    { name: 'Golf', demand: 85, supply: 70 },
    { name: 'Running', demand: 40, supply: 90 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Demand vs Supply by Sport</h2>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm text-gray-700">Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FDE68A]"></div>
          <span className="text-sm text-gray-700">Supply</span>
        </div>
      </div>

      {/* Chart - Added fixed height and vertical scroll */}
      <div className="space-y-4  overflow-y-auto pr-3 custom-scrollbar">
        {sportsData.map((sport, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-base font-medium text-gray-700 w-16">{sport.name}</span>
            
            {/* Bars Container - Changed to flex-col to stack them vertically */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div
                className="h-4 bg-[#14B8A6] rounded-full"
                style={{ width: `${sport.demand}%` }}
              ></div>
              <div
                className="h-4 bg-[#FDE68A] rounded-full"
                style={{ width: `${sport.supply}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandVsSupply;