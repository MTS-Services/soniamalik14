// import React from 'react';
// import Container from '../../../../components/layout/Container';
// import Button from '../../../../components/ui/Button';

// const InjurySupportHub = () => {
//   return (
//     <section 
//       style={{ backgroundImage: "url('/Content.png')" }}
//       className="bg-cover bg-center flex items-center justify-center py-10 lg:pt-14"
//     >
//       <Container>
//         <div className="flex lg:flex-row flex-col gap-12 justify-between items-center">
//           {/* Left Side - Image Card */}
//           <div className="flex justify-center lg:justify-start">
//             <div className="relative">
//               <img 
//                 src="/injuryCard.png" 
//                 alt="Female athlete holding soccer ball" 
//                 className="w-full max-w-md rounded-3xl"
//               />
//             </div>
//           </div>

//           {/* Right Side - Content */}
//           <div className="text-center lg:text-left">
//             <h2 className="sectiontitle mb-2 lg:mb-3">Injury Support Hub</h2>

//             <p className="description text-lg mb-6 max-w-2xl">
//               From prevention to recovery. Connect with trusted physio partners and find easy-to-follow recovery tips tailored for female athletes.
//             </p>

//             <ul className="list-disc pl-5 text-left text-base text-gray-700 mb-6 max-w-2xl">
//               <li className="mb-1">Build gradually — Ease into new activities over time.</li>
//               <li className="mb-1">Warm up and cool down — Gentle movement before and after activity.</li>
//               <li className="mb-1">Listen to early signs — Watch for aches, tightness, fatigue.</li>
//               <li className="mb-1">Rest is part of progress — Allow time to recover.</li>
//               <li className="mb-1">Everyone's different — Find what suits your body.</li>
//             </ul>

//             <div className="flex items-center sm:flex-row flex-col justify-center lg:justify-start gap-4">
//               <Button variant="primary" className="rounded-full px-6 py-2">Find professional support</Button>
//               <Button variant="outline" className="rounded-full px-6 py-2 border border-btn-primary text-btn-primary">Ask the community</Button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default InjurySupportHub;






import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';

const InjurySupportHub = () => {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-btn-primary text-white grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="p-4 lg:p-12">
              <h2 className="text-2xl lg:text-4xl font-bold mb-4">Injury Support Hub</h2>

              <p className="text-base text-[#F3F3F3] mb-6 max-w-2xl">
                Injuries and setbacks are a common part of staying active — but they shouldn't mean stepping away from sport altogether.
              </p>

              <p className="text-base text-[#F3F3F3] mb-6 max-w-xl">
                The ESSA Injury Support Hub is a starting point for women dealing with injury, recovery, or returning after time out. It helps you find the right professional support and feel less alone in the process.
              </p>
              <p className="text-base text-[#F3F3F3] mb-6 max-w-2xl">
                What this hub aims to offer:
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-white text-lg">Trusted physio partners</h3>
                  <p className="text-white text-base">Connect with professionals who work with women and understand the realities of female sport and movement.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg">Simple, general recovery principles</h3>
                  <p className="text-white text-base">Clear, common-sense guidance around rest, gradual return and listening to your body — without medical overload.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg">Community-led insight</h3>
                  <p className="text-white text-base">Learn from shared experiences within the ESSA community as the platform grows.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg">A place to start</h3>
                  <p className="text-white text-base">If you're unsure who to speak to or how to return, this hub helps you take the first step.</p>
                </div>
              </div>

              <p className="text-base text-white mb-6">ESSA does not replace medical advice – it's here to help you find the right support.</p>

          
            </div>

            {/* Right: Patterned panel */}
            <div 
                className="hidden lg:block h-full"
                style={{
                  backgroundImage: `url('/ctaBg.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InjurySupportHub;





