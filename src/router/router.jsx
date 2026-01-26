import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import DiscoverView from '../pages/public/public_discover/DiscoverView';
import SigninView from '../pages/public/public_login/SigninView.jsx';
import CommunityView from '../pages/public/public_community/CommunityView';
import CommunityDetails from '../pages/public/public_community/components/CommunityDetails';
import NotFound from '../pages/error/NotFound';
import EventView from '../pages/public/public_event/EventView.jsx';
import MarketPlace from '../pages/public/public_market/MarketPlace.jsx';
import ServiceView from '../pages/public/public_service/ServiceView.jsx';
import UnderConstruction from '../components/ui/UnderConstruction.jsx';
import NewsView from '../pages/public/public_news/NewsView';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import AdminIndex from '../pages/dashboards/admin/AdminIndex.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<SigninView />} />
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<HomeView />} />
        <Route path="about" element={<AboutView />} />
        <Route path="discover" element={<DiscoverView />} />
        <Route path="community" element={<CommunityView />} />
        <Route path="community/:id" element={<CommunityDetails />} />
        <Route path="events" element={<EventView />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="services" element={<ServiceView />} />
        <Route path="news" element={<NewsView />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminIndex />} />
      </Route>
    </>
  )
);

export default router;
