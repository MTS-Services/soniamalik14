import React from 'react';
import { Calendar, BarChart3, Users, TrendingUp } from 'lucide-react';
import DashboardHeader from '../../../components/ui/DashboardHeader';
import Button from '../../../components/ui/Button';
import StatsCard from '../../../components/ui/StatsCard';
import PageHeader from '../../../components/ui/PageHeader';
import CoachFilter from '../coach/components/CoachFilter';
import { Provider } from 'react-redux';
import ProviderEvent from './event/ProviderEvent';

const ProviderIndex = () => {
 

  return (
    <>
    <ProviderEvent />
    </>
  // <div className="dashboardPy dashboardSpaceY">
  //           <div className='mb-6'>
  //               <PageHeader title="Coach Events" description="Host matches, training sessions, trials, and community events for your club." ctaText="Create Event" onCtaClick={() => setIsModalOpen(true)} />
  //           </div>

  //           <div>
  //               <CoachFilter  />
  //           </div>

  //           <div className="pt-4">
               

               
  //           </div>

            
  //       </div>
  );
};

export default ProviderIndex;
