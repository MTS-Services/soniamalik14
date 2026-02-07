// import React from 'react';
// import Container from '../../../../components/layout/Container';
// import Title from '../../../../components/ui/Title';

// const steps = [
//   {
//     id: 1,
//     number: '01',
//     title: 'Create Account',
//     description:
//       'Create a profile in a few minutes so relevant teams, sessions, events, and services can be shown.',
//     img: '/howitworks1.png',
//   },
//   {
//     id: 2,
//     number: '02',
//     title: 'Browse opportunities',
//     description:
//       'Explore women-only teams, sessions, events, and support across sports and locations.',
//     img: '/howitworks2.png',
//   },
//   {
//     id: 3,
//     number: '03',
//     title: 'Get involved',
//     description: 'Join a session or event, connect with others, or access services.',
//     img: '/howitworks3.png',
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <section className="bg-white py-10 lg:py-16">
//       <Container>
//         <div className="mb-16 flex flex-col justify-center items-center text-center">
//           <Title>How ESSA Hub Works</Title>
//           <p className="description max-w-2xl">
//             Create your profile, explore women-only sports, and join activities that suit you.
//           </p>
//         </div>

//         <div className="space-y-20 max-w-7xl mx-auto">
//           {steps.map((s, idx) => {
//             const flipped = idx % 2 === 1; // true for second row
//             return (
//               <div
//                 key={s.id}
//                 className={`flex flex-col lg:items-center ${flipped ? 'md:flex-row-reverse md:justify-between' : 'md:flex-row md:justify-between'}`}
//               >
//                 {/* Image column - only image, centered vertically */}
//                 <div className="w-full lg:w-1/2 flex items-center">
//                   <img
//                     src={s.img}
//                     alt={s.title}
//                     className="w-full max-w-xl h-64 lg:h-72 rounded-xl object-contain"
//                   />
//                 </div>

//                 {/* Text column - vertically centered to match image */}
//                 <div className="w-full lg:w-1/2 flex items-center">
//                   <div className="max-w-lg">
//                     <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
//                     <p className="text-base text-gray-600">{s.description}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default HowItWorks;








import React from 'react';
import Container from '../../../../components/layout/Container';
import Title from '../../../../components/ui/Title';
import { Building2, MousePointerClick, Search } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-white" />,
    title: "Sign Up Online",
    description: "Create a profile to join the ESSA Hub community and take part when you're ready"
  },
  {
    icon: <MousePointerClick className="w-8 h-8 text-white" />,
    title: "Browse opportunities",
    description: "Explore women-only teams, sessions, events and support across a range of sports and locations."
  },
  {
    icon: <Building2 className="w-8 h-8 text-white" />,
    title: "Get involved",
    description: "Join a session or event, connect with others, and access the support around you."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 sm:px-8 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          How ESSA Hub Works
        </h2>

        {/* Process Container */}
        <div className="flex flex-col md:flex-row items-start justify-between relative gap-12 md:gap-4">

          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Individual Step */}
              <div className="flex flex-col items-center text-center md:flex-1 z-10">
                {/* Icon Box with Gradient and Shadow */}
                <div className="relative group mb-8">
                  <div
                    className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-br from-[#2FDDCF] to-[#118980] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      boxShadow:
                        '0px 1.85px 3.15px rgba(34,197,94,0.0169), 0px 8.15px 6.52px rgba(34,197,94,0.0275), 0px 20px 13px rgba(34,197,94,0.035), 0px 38.52px 25.48px rgba(34,197,94,0.0425), 0px 64.81px 46.85px rgba(34,197,94,0.0531), 0px 100px 80px rgba(34,197,94,0.07)'
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>

              {/* Connector (Only show between items and on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-1 pt-12">
                  <div className="flex items-center w-full px-4">
                    {/* Left Dot */}
                    <div className="w-3 h-3 rounded-full bg-linear-to-br from-[#2FDDCF] to-[#118980]" />
                    {/* Dashed Line */}
                    <div className="flex-1 border-t-2 border-dashed border-[#c5e9e5] mx-1" />
                    {/* Right Dot */}
                    <div className="w-3 h-3 rounded-full bg-linear-to-br from-[#2FDDCF] to-[#118980]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
 



