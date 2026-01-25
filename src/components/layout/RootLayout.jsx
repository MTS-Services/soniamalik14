import { Outlet } from 'react-router-dom';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';
import SmoothScroll from '../../utils/SmoothScroll.jsx';

const RootLayout = () => {
  return (
    <>
        <NavbarLayout />
      

      <SmoothScroll>
        <main>
          <Outlet />
        </main>
      </SmoothScroll>

      <footer>
        <FooterLayout />
      </footer>
    </>
  );
};

export default RootLayout;
