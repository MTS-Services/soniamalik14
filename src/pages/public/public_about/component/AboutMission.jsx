import React from 'react';
import Container from '../../../../components/layout/Container';

const AboutMission = () => {
  return (
    <section className="py-8 md:py-12 lg:py-20">
      <Container>
        {/* Switched to flex-col on mobile/tablet so image goes below text, and grid on lg devices */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

          {/* Left: Text Content */}
          <div className="order-1 lg:order-none w-full">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1A1D1F] mb-4 md:mb-6">
              About ESSA Hub
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-[15px] md:text-base lg:text-lg text-[#1A1D1F] leading-relaxed">
                Sport plays a powerful role in physical health, confidence and mental
                wellbeing. ESSA Hub was created to help more women access those
                benefits by making women's sport easier to find, easier to join and
                easier to feel part of.
              </p>

              <p className="text-[15px] md:text-base text-[#1A1D1F] leading-relaxed">
                For many women, opportunities aren't always visible. Information can
                be scattered, local sessions can be hard to discover, and starting or
                returning can feel daunting.
              </p>

              <p className="text-[15px] md:text-base text-[#1A1D1F] leading-relaxed">
                ESSA Hub brings local sport, community and women-focused services
                into one place.
              </p>

              <p className="text-[15px] md:text-base text-[#1A1D1F] font-bold">
                Built for women. Led by women. Focused on participation.
              </p>
            </div>
          </div>

          {/* Right: Image Collage (Below text on Tab/Mobile) */}
          <div className="order-2 lg:order-none w-full max-w-xl mx-auto lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6">

              {/* Left Column */}
              <div className="flex flex-col gap-3 md:gap-5 lg:gap-6">
                {/* Football field - Tall image (Height increased for md/lg, original for xl) */}
                <div className="w-full aspect-[3/4] md:aspect-[2/3] lg:aspect-[2/3.2] xl:aspect-[2.5/3] rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
                  <img
                    src="https://i.ibb.co.com/HTH1JGdM/8566dfd34f75b216152413d0df32b95e7a8e5cde.png"
                    alt="Football field"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Woman resting - Pill shaped (Height increased for md/lg, original for xl) */}
                <div className="w-full aspect-[2/1] md:aspect-[2/1.4] lg:aspect-[2/1.3] xl:aspect-[2.5/1] rounded-[100px] overflow-hidden shadow-sm">
                  <img
                    src="https://i.ibb.co.com/Zz7twh3L/source-3283fe01b0e09f72295fd10412d414c4059d94ea.png"
                    alt="Woman resting"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-3 md:gap-5 lg:gap-6">
                {/* Three women - Pill shaped (Height increased for md/lg, original for xl) */}
                <div className="w-full aspect-[2/1] md:aspect-[2/1.4] lg:aspect-[2/1.3] xl:aspect-[2.5/1] rounded-[100px] overflow-hidden shadow-sm">
                  <img
                    src="https://i.ibb.co.com/Zz04brXC/Frame-2147226201.png"
                    alt="Three women"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Basketball player - Tall image (Height increased for md/lg, original for xl) */}
                <div className="w-full aspect-[3/4] md:aspect-[2/3] lg:aspect-[2/3.2] xl:aspect-[2.5/3] rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
                  <img
                    src="https://i.ibb.co.com/nswVb7Lc/e186ad5a2a26d6d1df719ecff7b35da792473089.jpg"
                    alt="Basketball player"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutMission;