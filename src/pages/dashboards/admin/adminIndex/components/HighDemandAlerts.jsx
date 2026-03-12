import React from 'react';

const HighDemandAlerts = () => {
  const alerts = [1, 2, 3, 4];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm min-w-0">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">High Demand / Low Supply Alerts</h2>
      <div className="space-y-4">
        {alerts.map((item) => (
          <div key={item} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
            <div className="shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-btn-primary">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-900">Football in SW1A (Westminster)</h3>
              <p className="text-sm text-gray-500 mt-1">Demand high • Supply low</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighDemandAlerts;
