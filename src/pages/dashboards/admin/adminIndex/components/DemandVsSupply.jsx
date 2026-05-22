import React, { useEffect, useState } from 'react';
import { GET } from '../../../../../services/httpMethods';
import { ENDPOINT } from '../../../../../services/httpEndpoint';

const DemandVsSupply = () => {
  const [sportsData, setSportsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchDemandSupply = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await GET(ENDPOINT.ADMIN.DEMAND_SUPPLY, {}, controller.signal);
        const payload = response?.data?.data || response?.data || response;

        if (!Array.isArray(payload)) {
          throw new Error('Invalid demand-supply response');
        }

        const normalized = payload.map((item) => ({
          name: item?.name || 'Unknown',
          demand: Number(item?.demand || 0),
          supply: Number(item?.supply || 0),
        }));

        setSportsData(normalized);
      } catch (err) {
        if (err?.name === 'AbortError' || err?.name === 'CanceledError') {
          return;
        }

        const message =
          err?.response?.data?.message || err?.message || 'Failed to load demand vs supply data';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemandSupply();

    return () => {
      controller.abort();
    };
  }, []);

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
        {sportsData.map((sport) => (
          <div key={sport.name} className="flex items-center gap-3">
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

        {isLoading && <p className="text-sm text-gray-500">Loading demand and supply...</p>}
        {!isLoading && error && <p className="text-sm text-red-600">{error}</p>}
        {!isLoading && !error && sportsData.length === 0 && (
          <p className="text-sm text-gray-500">No demand vs supply data available.</p>
        )}
      </div>
    </div>
  );
};

export default DemandVsSupply;