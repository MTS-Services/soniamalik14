import React, { useEffect, useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GET } from '../../../../../services/httpMethods';
import { ENDPOINT } from '../../../../../services/httpEndpoint';
import LoadingSpinner from '../../../../../components/ui/LoadingSpinner';

const UserTrendsChart = () => {
  const [period, setPeriod] = useState('year');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserTrends = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await GET(ENDPOINT.ADMIN.USER_TRENDS, { period }, controller.signal);
        const payload = response?.data?.data || response?.data || response;

        if (!Array.isArray(payload)) {
          throw new Error('Invalid user trends response');
        }

        const normalizedData = payload.map((item) => ({
          month: item?.month || '',
          player: Number(item?.player || 0),
          provider: Number(item?.provider || 0),
          sport: Number(item?.sport || 0),
        }));

        setChartData(normalizedData);
      } catch (err) {
        if (err?.name === 'AbortError' || err?.name === 'CanceledError') {
          return;
        }

        const message =
          err?.response?.data?.message || err?.message || 'Failed to load user trends';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTrends();

    return () => {
      controller.abort();
    };
  }, [period]);

  const maxValue = useMemo(() => {
    if (!chartData.length) return 10;

    const values = chartData.flatMap((item) => [item.player, item.provider, item.sport]);
    const max = Math.max(...values, 0);
    return max + 2;
  }, [chartData]);

  return (
    <div className="min-w-0 rounded-lg bg-white p-4 shadow-sm md:rounded-2xl md:p-6 lg:col-span-2">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0 md:mb-6">
        <h2 className="text-lg font-semibold text-gray-900 md:text-2xl">User</h2>
        <select
          className="focus:ring-btn-primary w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:outline-none sm:w-auto md:px-4"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option value="year">This year</option>
          <option value="last-year">Last year</option>
          <option value="6-months">Last 6 months</option>
        </select>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:flex-wrap md:items-center md:gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-btn-primary h-3 w-3 rounded-full md:h-4 md:w-4"></div>
          <span className="text-sm text-gray-700 md:text-base">Player</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-400 md:h-4 md:w-4"></div>
          <span className="text-sm text-gray-700 md:text-base">Service Provider</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-900 md:h-4 md:w-4"></div>
          <span className="text-sm text-gray-700 md:text-base">Sport Providers</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400} className="md:h-96">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPlayer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProvider" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSport" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#111827" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={true} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => value}
            domain={[0, maxValue]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value) => Number(value).toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="player"
            stroke="#0F766E"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="provider"
            stroke="#FBBF24"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="sport"
            stroke="#111827"
            strokeWidth={2}
            fillOpacity={0}
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>

      {isLoading && (
        <LoadingSpinner
          label="Loading trends..."
          containerClassName="mt-2 justify-start py-0"
          spinnerClassName="h-6 w-6"
        />
      )}
      {!isLoading && error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {!isLoading && !error && chartData.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">No trend data available.</p>
      )}
    </div>
  );
};

export default UserTrendsChart;
