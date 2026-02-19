import React from 'react';

import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CoreFeatures from './components/CoreFeatures';
import InjurySupportHub from './components/InjurySupportHub';
import JoinCta from './components/JoinCta';
import FindYourSport from './components/FindYourSport';

const HomeView = () => {

  

  return (
    <div className=" " >
      <Hero/>
      {/* <GetInvolved/> */}
      <CoreFeatures/>
      <HowItWorks/>
      <FindYourSport/>
      {/* <InjurySupportHub/> */}
      {/* <JoinCta/> */}
    </div>
  );
};

export default HomeView;
