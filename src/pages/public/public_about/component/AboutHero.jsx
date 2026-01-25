import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const AboutHero = () => {
  return (
    <div
      style={{ backgroundImage: "url('/aboutBg.jpg')" }}
      className="relative flex w-auto items-center justify-center bg-cover bg-center lg:h-200"
    >
      <div className="absolute inset-0 z-0 bg-black opacity-30"></div>
      <Container className="relative z-10 py-10 lg:py-0">
        <div className="flex flex-col items-center justify-center space-y-3.5 text-center lg:max-w-3xl mx-auto">
          <HeroTitle>Where Women Play, Train & Belong</HeroTitle>
          <p className="herosubtitle">A safe, inclusive sports community for women & girls</p>
        </div>
      </Container>
    </div>
  );
};

export default AboutHero;
