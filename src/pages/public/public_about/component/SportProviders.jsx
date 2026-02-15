import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import Button from '../../../../components/ui/Button';
import { Check } from 'lucide-react';

const SportProviders = () => {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10  lg:gap-0 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="max-w-xl">
            <SectionHeader
              title="For Sport Providers"
              description="If you run sessions, teams or training opportunities, ESSA Hub can help make them easier to find."
            />

            <div className="mt-6">
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Promote women-only or inclusive sessions</span>
              </p>
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Increase visibility within your local area</span>
              </p>
              <p className="description mb-6 text-base sm:text-lg">
                If you deliver sport and want to reach more women, we'd love to hear from you.
              </p>
              
              <Button className="rounded-md">List your club or sessions</Button>
            </div>
          </div>

          {/* Right: Image / visual */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/FrameForSportProviders.png"
              alt="About mission"
              className="h-auto object-cover lg:w-[80%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SportProviders;
