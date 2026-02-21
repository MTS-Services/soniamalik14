import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import Button from '../../../../components/ui/Button';

const AboutMission = () => {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-startssetartetars gap-6 lg:gap-0 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="max-w-xl">
            <SectionHeader
              title="About ESSA Hub"
              description="Sport plays a powerful role in physical health, confidence and mental wellbeing. ESSA Hub was created to help more women access those benefits by making women's sport easier to find, easier to join and easier to feel part of."
            />

            <div className="mt-6">
              <p className="description mb-6 text-base sm:text-lg">
                For many women, opportunities aren’t always visible. Information can be scattered, local sessions can be hard to discover, and starting or returning can feel daunting.
              </p>
              <p className="description mb-6 text-base sm:text-lg">
                ESSA Hub brings local sport, community and women-focused services into one place.
              </p>
              <p className="description mb-6 text-base sm:text-lg">
                Built for women. Led by women. Focused on participation.
              </p>
            </div>
          </div>

          {/* Right: Image / visual */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/aboutMission.png"
              alt="About mission"
              className="h-auto object-cover lg:w-[75%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMission;
