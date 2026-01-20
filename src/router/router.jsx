import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';

import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import ContactView from '../pages/public/public_contact/ContactView';

import NotFound from '../pages/error/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<HomeView />} />
      <Route path="about" element={<AboutView />} />
      <Route path="contact" element={<ContactView />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
