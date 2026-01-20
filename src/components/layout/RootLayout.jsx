import { Outlet } from 'react-router-dom';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';
import SmoothScroll from '../../utils/SmoothScroll.jsx';

const RootLayout = () => {
  return (
    <SmoothScroll>
      <header>
        <NavbarLayout />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </SmoothScroll>
  );
};

export default RootLayout;
