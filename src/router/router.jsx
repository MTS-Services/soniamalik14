import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import DiscoverView from '../pages/public/public_discover/DiscoverView';
import SigninView from '../pages/public/public_login/SigninView.jsx';
import CommunityView from '../pages/public/public_community/CommunityView';
import CommunityDetails from '../pages/public/public_community/components/CommunityDetails';
import NotFound from '../pages/error/NotFound';
import Unauthorized from '../pages/error/Unauthorized';
import EventView from '../pages/public/public_event/EventView.jsx';
import MarketPlace from '../pages/public/public_market/MarketPlace.jsx';
import ServiceView from '../pages/public/public_service/ServiceView.jsx';
import UnderConstruction from '../components/ui/UnderConstruction.jsx';
import NewsView from '../pages/public/public_news/NewsView';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import RequireAuth from '../components/auth/RequireAuth.jsx';
import { ROLES } from '../context/AuthContext.jsx';

// Dashboard Pages
import ProviderIndex from '../pages/dashboards/provider/ProviderIndex.jsx';
import CoachIndex from '../pages/dashboards/coach/CoachIndex.jsx';
import Event from '../pages/dashboards/admin/event/Event.jsx';
import AdminIndex from '../pages/dashboards/admin/adminIndex/AdminIndex.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<SigninView />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
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

      {/* Admin Dashboard - Protected */}
      <Route
        path="/admin"
        element={
          <RequireAuth allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminIndex />} />
        <Route path="event" element={<Event />} />
        <Route path="event-details" element={<UnderConstruction />} />
        <Route path="product-request" element={<UnderConstruction />} />
        <Route path="order" element={<UnderConstruction />} />
        <Route path="thread" element={<UnderConstruction />} />
        <Route path="club" element={<UnderConstruction />} />
        <Route path="service" element={<UnderConstruction />} />
        <Route path="finances" element={<UnderConstruction />} />
        <Route path="role-matrix" element={<UnderConstruction />} />
      </Route>

      {/* Provider Dashboard - Protected */}
      <Route
        path="/provider"
        element={
          <RequireAuth allowedRoles={[ROLES.PROVIDER]}>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<ProviderIndex />} />
        <Route path="event-analytics" element={<UnderConstruction />} />
        <Route path="thread" element={<UnderConstruction />} />
        <Route path="service" element={<UnderConstruction />} />
        <Route path="service-analytics" element={<UnderConstruction />} />
      </Route>

      {/* Coach Dashboard - Protected */}
      <Route
        path="/coach"
        element={
          <RequireAuth allowedRoles={[ROLES.COACH]}>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<CoachIndex />} />
        <Route path="event" element={<UnderConstruction />} />
        <Route path="event-analytics" element={<UnderConstruction />} />
        <Route path="thread" element={<UnderConstruction />} />
        <Route path="recruitment" element={<UnderConstruction />} />
      </Route>
    </>
  )
);

export default router;
