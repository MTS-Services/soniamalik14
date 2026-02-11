import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import FeatureCard from '../../../../components/ui/FeatureCard';
import { coreFeatures } from '../../../../config/coreFeatures';

const CoreFeatures = () => {
  return (
    <section className="py-10 lg:pt-16 lg:pb-20  ">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title="Everything you need to get involved "
          description="ESSA Hub brings together sport, community and support for women - whether you're starting for the first time
or returning after a break."
          align="left"
          className="mb-4 lg:mb-6 text-xl lg:text-2xl"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-5">
          {coreFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoreFeatures;