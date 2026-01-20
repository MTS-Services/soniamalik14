import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';

const InjurySupportHub = () => {
  return (
    <section 
      style={{ backgroundImage: "url('/Content.png')" }}
      className="bg-cover bg-center flex items-center justify-center py-20"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Card */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img 
                src="/injuryCard.png" 
                alt="Female athlete holding soccer ball" 
                className="w-full max-w-md rounded-3xl"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left">
            <h2 className="sectiontitle mb-6">
              Injury Support Hub
            </h2>
            
            <p className="description text-lg mb-8 max-w-xl">
              From prevention to recovery. Connect with trusted physio partners and find easy-to-follow recovery tips tailored for female athletes.
            </p>

            <Button 
              variant="primary" 
              size="lg"
              className="rounded-full px-8"
            >
              Get Support
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InjurySupportHub;