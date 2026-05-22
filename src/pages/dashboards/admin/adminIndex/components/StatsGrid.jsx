import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Users, TrendingUp, FileText, MessageSquare, UserCog, List, ShieldAlert } from 'lucide-react';
import StatsCard from './StatsCard';
import { GET } from '../../../../../services/httpMethods';
import { ENDPOINT } from '../../../../../services/httpEndpoint';
import LoadingSpinner from '../../../../../components/ui/LoadingSpinner';

const StatsGrid = () => {
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await GET(ENDPOINT.ADMIN.DASHBOARD_STATS, {}, signal);
      const payload = response?.data?.data || response?.data || response;

      if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid dashboard stats response');
      }

      setStatsData(payload);
    } catch (err) {
      if (err?.name === 'AbortError' || err?.name === 'CanceledError') {
        return;
      }

      const message =
        err?.response?.data?.message || err?.message || 'Failed to load dashboard stats';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchStats(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchStats]);

  const stats = useMemo(() => {
    const changeToText = (value) => {
      if (value === null || value === undefined || value === '') return '0%';
      return String(value);
    };

    const toPositive = (change) => !String(change || '').trim().startsWith('-');

    return [
      {
        icon: <Users className="text-btn-primary h-7 w-7" />,
        label: 'Total Users',
        value: statsData?.totalUsers ?? '0',
        change: changeToText(statsData?.totalUsersChange),
      },
      {
        icon: <UserCog className="text-btn-primary h-7 w-7" />,
        label: 'New Signups',
        value: statsData?.newSignups ?? '0',
        change: changeToText(statsData?.newSignupsChange),
      },
      {
        icon: <List className="text-btn-primary h-7 w-7" />,
        label: 'Live Listings',
        value: statsData?.liveListings ?? '0',
        change: changeToText(statsData?.liveListingsChange),
      },
      {
        icon: <TrendingUp className="text-btn-primary h-7 w-7" />,
        label: 'Signed Kmps',
        value: statsData?.signedKmps ?? '0',
        change: changeToText(statsData?.signedKmpsChange),
      },
      {
        icon: <MessageSquare className="text-btn-primary h-7 w-7" />,
        label: 'Messages',
        value: statsData?.messages ?? '0',
        change: changeToText(statsData?.messagesChange),
      },
      {
        icon: <TrendingUp className="text-btn-primary h-7 w-7" />,
        label: 'Outbound Clicks',
        value: statsData?.outboundClicks ?? '0',
        change: changeToText(statsData?.outboundClicksChange),
      },
      {
        icon: <FileText className="text-btn-primary h-7 w-7" />,
        label: 'Pending Approvals',
        value: statsData?.pendingApprovals ?? '0',
        change: changeToText(statsData?.pendingApprovalsChange),
      },
      {
        icon: <ShieldAlert className="text-btn-primary h-7 w-7" />,
        label: 'Flagged Items',
        value: statsData?.flaggedItems ?? '0',
        change: changeToText(statsData?.flaggedItemsChange),
      },
    ].map((item) => ({ ...item, positive: toPositive(item.change) }));
  }, [statsData]);

  if (isLoading && !statsData) {
    return <LoadingSpinner label="Loading dashboard stats..." />;
  }

  if (error && !statsData) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => fetchStats()}
          className="mt-2 rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          positive={stat.positive}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
