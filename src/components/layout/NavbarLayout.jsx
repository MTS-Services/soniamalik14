import React, { useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav';

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
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
