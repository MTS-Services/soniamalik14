import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import DiscoverView from '../pages/public/public_discover/DiscoverView';
import DiscoverDetails from '../pages/public/public_discover/DiscoverDetails';
import SigninView from '../pages/public/public_login/SigninView.jsx';
import CommunityView from '../pages/public/public_community/CommunityView';
import CommunityDetails from '../pages/public/public_community/components/CommunityDetails';
import NotFound from '../pages/error/NotFound';
import Unauthorized from '../pages/error/Unauthorized';
import EventView from '../pages/public/public_event/EventView.jsx';
import EventDetailsPage from '../pages/public/public_event/EventDetails.jsx';
import MarketPlace from '../pages/public/public_market/MarketPlace.jsx';
import MarketplaceDetails from '../pages/public/public_market/MarketplaceDetails.jsx';
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
import EventDetails from '../pages/dashboards/admin/EventDetails/EventDetails.jsx';
import ProductRequested from '../pages/dashboards/admin/ProductRequested/ProductRequested.jsx';
import OrderList from '../pages/dashboards/admin/OrderList/OrderList.jsx';
import CoachEvent from '../pages/dashboards/coach/event/CoachEvent.jsx';
import CoachEventDetails from '../pages/dashboards/coach/event/EventDetails.jsx';
import EventAnalytics from '../pages/dashboards/coach/eventAnalytics/EventAnalytics.jsx';
import Thread from '../pages/dashboards/coach/thread/Thread.jsx';
import ThreadDetails from '../pages/dashboards/coach/thread/ThreadDetails.jsx';
import Recruitment from '../pages/dashboards/coach/recruitment/Recruitment.jsx';
import RecruitmentDetails from '../pages/dashboards/coach/recruitment/RecruitmentDetails.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<SigninView />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomeView />} />
        <Route path="about" element={<AboutView />} />
        <Route path="discover" element={<DiscoverView />} />
        <Route path="discover/:type/:id" element={<DiscoverDetails />} />
        <Route path="community" element={<CommunityView />} />
        <Route path="community/:id" element={<CommunityDetails />} />
        <Route path="events" element={<EventView />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="marketplace/:id" element={<MarketplaceDetails />} />
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
        <Route path="event-details" element={<EventDetails />} />
        <Route path="product-request" element={<ProductRequested />} />
        <Route path="order" element={<OrderList />} />
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
        <Route path="event" element={<CoachEvent />} />
        <Route path="event/:id" element={<CoachEventDetails />} />
        <Route path="event-analytics" element={<EventAnalytics />} />
        <Route path="thread" element={<Thread />} />
        <Route path="thread/:id" element={<ThreadDetails />} />
        <Route path="recruitment" element={<Recruitment />} />
        <Route path="recruitment/:id" element={<RecruitmentDetails />} />
      </Route>
    </>
  )
);

export default router;
