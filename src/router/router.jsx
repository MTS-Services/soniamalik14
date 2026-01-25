import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import DiscoverView from '../pages/public/public_discover/DiscoverView';
import SigninView from '../pages/public/public_login/SigninView.jsx';
import CommunityView from '../pages/public/public_community/CommunityView';
import CommunityDetails from '../pages/public/public_community/components/CommunityDetails';
import NotFound from '../pages/error/NotFound';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default router;
