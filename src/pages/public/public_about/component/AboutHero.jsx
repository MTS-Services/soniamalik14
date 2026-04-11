import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const AboutHero = () => {
  const backgroundImageUrl = '/images/About.jpg'; // Replace with your actual image URL
  return (
    <div
      style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none' }}
      className="relative flex w-auto items-center justify-center bg-cover bg-center h-70 sm:h-160 md:h-160 "
    >
      <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
      <Container className="relative z-10 py-10 lg:py-0">
    
      </Container>
    </div>
  );
};

export default AboutHero;
