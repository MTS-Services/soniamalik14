import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import Button from '../../../../components/ui/Button';
import { Check } from 'lucide-react';

const BrandsProducts = () => {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="max-w-xl">
            <SectionHeader
              title="For Brands & Products"
              description="The ESSA Marketplace features thoughtfully selected brands that support women in sport."
            />

            <div className="mt-6">
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Reach women interested in sport and wellbeing</span>
              </p>
              <p className="description mb-4 text-base sm:text-lg flex items-start gap-2">
                <Check className="flex-shrink-0 mt-1" />
                <span>Be featured within a curated, women-focused space</span>
              </p>
              <p className="description mb-6 text-base sm:text-lg">
                If your brand shares our purpose, we'd love to hear from you
              </p>
              
              <Button className="rounded-md">Join the marketplace</Button>
            </div>
          </div>

          {/* Right: Image / visual */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/BrandsProducts.png"
              alt="About mission"
              className="h-auto object-cover lg:w-[80%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandsProducts;
