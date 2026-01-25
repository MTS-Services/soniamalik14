import HowItWorks from '../public_Home/components/HowItWorks';
import AboutCta from './component/AboutCta';
import AboutHero from './component/AboutHero';
import AboutMission from './component/AboutMission';
import ServiceProvidersSection from './component/ServiceProvidersSection';

const AboutView = () => {
  return (
    <div>
      <AboutHero />
      <AboutMission />
      <ServiceProvidersSection />
      <HowItWorks />
      <AboutCta />
    </div>
  );
};

export default AboutView;
