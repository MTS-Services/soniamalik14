import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';

import NotFound from '../pages/error/NotFound';
import DiscoverView from '../pages/public/public_discover/DiscoverView';
import CommunityView from '../pages/public/public_community/CommunityView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<HomeView />} />
      <Route path="about" element={<AboutView />} />
      <Route path="discover" element={<DiscoverView />} />
      <Route path="community" element={<CommunityView />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
