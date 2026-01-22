import HowItWorks from "../public_Home/components/HowItWorks";
import AboutCta from "./component/AboutCta";
import AboutHero from "./component/AboutHero";
import AboutMission from "./component/AboutMission";


const AboutView = () => {


  

  return (
    <div>
      <AboutHero/>
      <AboutMission/>

      <HowItWorks/>
      <AboutCta/>
    </div>
  );
};

export default AboutView;
