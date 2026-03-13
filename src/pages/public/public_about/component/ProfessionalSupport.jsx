import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import Button from '../../../../components/ui/Button';
import { Check } from 'lucide-react';

const ProfessionalSupport = () => {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="max-w-xl order-first lg:order-last">
            <SectionHeader
              title="For Professional Support"
              description="We want to work with professionals whose expertise supports women in sport — including physiotherapy, strength and conditioning, nutrition, women’s health and wellbeing."
            />

            <div className="mt-6">
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Connect with a targeted audience</span>
              </p>
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Increase visibility within a trusted platform</span>
              </p>
              
              <Button className="rounded-md">List your business</Button>
            </div>
          </div>

          {/* Right: Image / visual (will appear on left at lg via order classes) */}
          <div className="flex justify-center lg:justify-start order-last lg:order-first">
            <img
              src="/ProfessionalSupport.png"
              alt="About mission"
              className="h-auto object-cover lg:w-[80%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfessionalSupport;