import React from 'react';
import { useSelector } from 'react-redux';
import {
  Code,
  Zap,
  Shield,
  Smartphone,
  Palette,
  Database,
  Settings,
  Github,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Rocket,
  Terminal,
  Package,
} from 'lucide-react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CoreFeatures from './components/CoreFeatures';
import InjurySupportHub from './components/InjurySupportHub';
import JoinCta from './components/JoinCta';

const HomeView = () => {

  

  return (
    <div className=" " >
      <Hero/>
      <HowItWorks/>
      <CoreFeatures/>
      <InjurySupportHub/>
      <JoinCta/>
    </div>
  );
};

export default HomeView;
