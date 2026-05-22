import React from 'react';

const TopLocationsByDemand = () => {
  // Updated the data to match the image precisely
  const locations = [
    { name: 'London( East )', value: 4500, width: 65 },
    { name: 'Manchester', value: 4500, width: 55 },
    { name: 'Birmingham', value: 4500, width: 60 },
    { name: 'London (West)', value: 4500, width: 65 },
    { name: 'Leeds', value: 4500, width: 50 },
    { name: 'Leeds', value: 4500, width: 62 },
    { name: 'Leeds', value: 4500, width: 50 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm min-w-0 ">
      <h2 className="mb-6 text-xl font-bold text-gray-900 leading-tight">
        Top Locations by Demand
      </h2>
      
      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            
            {/* Text Row */}
            <div className="flex items-center justify-between text-base text-gray-700">
              <span className="font-medium">{location.name}</span>
              <span>{location.value} Interest</span>
            </div>
            
            {/* Progress Bar Row */}
            <div className="h-3 w-full bg-gray-200 rounded-full">
              <div 
                className="h-full bg-[#137466] rounded-full" 
                style={{ width: `${location.width}%` }}
              ></div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLocationsByDemand;