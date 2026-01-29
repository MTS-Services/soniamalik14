import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';

const InjurySupportHub = () => {
  return (
    <section 
      style={{ backgroundImage: "url('/Content.png')" }}
      className="bg-cover bg-center flex items-center justify-center py-10 lg:pt-14"
    >
      <Container>
        <div className="flex lg:flex-row flex-col gap-12 justify-between items-center">
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
            <h2 className="sectiontitle mb-2 lg:mb-3">Injury Support Hub</h2>

            <p className="description text-lg mb-6 max-w-2xl">
              From prevention to recovery. Connect with trusted physio partners and find easy-to-follow recovery tips tailored for female athletes.
            </p>

            <ul className="list-disc pl-5 text-left text-base text-gray-700 mb-6 max-w-2xl">
              <li className="mb-1">Build gradually — Ease into new activities over time.</li>
              <li className="mb-1">Warm up and cool down — Gentle movement before and after activity.</li>
              <li className="mb-1">Listen to early signs — Watch for aches, tightness, fatigue.</li>
              <li className="mb-1">Rest is part of progress — Allow time to recover.</li>
              <li className="mb-1">Everyone's different — Find what suits your body.</li>
            </ul>

            <div className="flex items-center sm:flex-row flex-col justify-center lg:justify-start gap-4">
              <Button variant="primary" className="rounded-full px-6 py-2">Find professional support</Button>
              <Button variant="outline" className="rounded-full px-6 py-2 border border-btn-primary text-btn-primary">Ask the community</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InjurySupportHub;