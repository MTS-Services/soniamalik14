import React from 'react';
import Container from '../../../../components/layout/Container';
import Title from '../../../../components/ui/Title';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Create Account',
    description:
      'Create a profile in a few minutes so relevant teams, sessions, events, and services can be shown.',
    img: '/howitworks1.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Browse opportunities',
    description:
      'Explore women-only teams, sessions, events, and support across sports and locations.',
    img: '/howitworks2.png',
  },
  {
    id: 3,
    number: '03',
    title: 'Get involved',
    description: 'Join a session or event, connect with others, or access services.',
    img: '/howitworks3.png',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        <div className="mb-16 flex flex-col justify-center items-center text-center">
          <Title>How ESSA Hub Works</Title>
          <p className="description max-w-2xl">
            Create your profile, explore women-only sports, and join activities that suit you.
          </p>
        </div>

        <div className="space-y-20 max-w-7xl mx-auto">
          {steps.map((s, idx) => {
            const flipped = idx % 2 === 1; // true for second row
            return (
              <div
                key={s.id}
                className={`flex flex-col lg:items-center ${flipped ? 'md:flex-row-reverse md:justify-between' : 'md:flex-row md:justify-between'}`}
              >
                {/* Image column - only image, centered vertically */}
                <div className="w-full lg:w-1/2 flex items-center">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full max-w-xl h-64 lg:h-72 rounded-xl object-contain"
                  />
                </div>

                {/* Text column - vertically centered to match image */}
                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="max-w-lg">
                    <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-base text-gray-600">{s.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
