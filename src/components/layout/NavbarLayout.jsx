import React, { useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav';

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='relative sticky top-0 w-full z-50'>
      <HeaderTop 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />
      <HeaderNav 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </header>
  );
};

export default NavbarLayout;
