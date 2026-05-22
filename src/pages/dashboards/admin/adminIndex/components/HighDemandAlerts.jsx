import React from 'react';
import { Info } from 'lucide-react';

const HighDemandAlerts = () => {
  const alerts = [
    { sport: 'Football', location: 'SW1A (Westminster)', demand: 'High', supply: 'None' },
    { sport: 'Football', location: 'SW1A (Westminster)', demand: 'High', supply: 'None' },
    { sport: 'Football', location: 'SW1A (Westminster)', demand: 'High', supply: 'None' },
    { sport: 'Football', location: 'SW1A (Westminster)', demand: 'High', supply: 'None' },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm min-w-0 lg:col-span-2">
      <h2 className="mb-6 text-xl font-bold text-gray-900">High Demand / Low Supply Alerts</h2>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          // Replaced border-b with a light gray background and padding
          <div key={index} className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            
            {/* Icon Container */}
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef7f6]">
                <Info className="h-6 w-6 text-[#1b827b]" />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-gray-900">
                {alert.sport} in {alert.location}
              </h3>
              
              {/* Status Indicators */}
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#1b827b]"></div>
                  Demand: {alert.demand}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#1b827b]"></div>
                  Supply: {alert.supply}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighDemandAlerts;