// import { useState } from "react";

// const Foundersection = () => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div className="h-auto md:min-h-164 flex items-center justify-center px-4 sm:p-6 lg:p-8 pt-14 bg-[#E7F1F1] py-10 sm:py-16 lg:py-20">


//       <article
//         className="relative bg-white rounded-2xl shadow-lg  max-w-5xl w-full px-4 py-5 sm:px-6 sm:py-6 md:p-8 lg:p-10 transition-all duration-500"
//         style={{
//           boxShadow: hovered
//             ? "0 32px 64px rgba(90, 158, 146, 0.18), 0 8px 24px rgba(0,0,0,0.07)"
//             : "0 16px 48px rgba(90, 158, 146, 0.12), 0 4px 16px rgba(0,0,0,0.06)"
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {/* Top section: photo + title */}
//         <header className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 mb-5 sm:mb-8">
//           {/* Founder photo */}
//           <div className="flex-shrink-0 w-full sm:w-auto px-2 sm:px-0">
//             <div className="relative flex justify-start">

//               <img
//                 src="/images/founder.jpg"
//                 alt="ESSA Hub founder"
//                 className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full md:rounded-2xl"

//               />
//             </div>
//           </div>

//           {/* Title + first paragraph */}
//           <div className="flex-1 min-w-0 w-full">
//             <h1 className="text-xl sm:text-3xl md:text-4xl font-normal mb-2 sm:mb-4 leading-tight tracking-tight">
//               A note from the founder
//             </h1>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               ESSA Hub grew from recognising that women's relationship with sport isn't always
//               straightforward. Life changes. Confidence shifts. Priorities evolve. The right
//               opportunity isn't always obvious or accessible.
//             </p>
//           </div>
//         </header>




//         <div className="space-y-3 sm:space-y-5">
//           <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//             I wanted to build something that makes getting involved easier — in ways that fit around
//             real life. A space where women can explore opportunities, connect with others and take
//             part in ways that feel right for them, without pressure or judgement.
//           </p>

//           <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//             ESSA Hub is still growing and evolving, shaped by the women who use it. My hope is that
//             it becomes a place women return to again and again, as their lives and interests change
//             over time.
//           </p>
//         </div>

//         {/* Sign-off */}
//         <footer className="mt-1 sm:mt-8 pt-3 sm:pt-5">
//           <p className="font-medium tracking-wide text-base md:text-lg text-gray-900">
//             Welcome to ESSA Hub
//           </p>
//         </footer>
//       </article>
//     </div>
//   );
// };

// export default Foundersection;




import { useState } from "react";

const Foundersection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-auto flex items-center justify-center px-4 bg-[#E7F1F1] py-10 sm:py-16 lg:py-20">
      <article
        className="relative bg-white rounded-2xl max-w-lg md:max-w-5xl w-full px-6 py-8 md:p-10 transition-all duration-500 shadow-lg"
        style={{
          boxShadow: hovered
            ? "0 32px 64px rgba(90, 158, 146, 0.18), 0 8px 24px rgba(0,0,0,0.07)"
            : "0 16px 48px rgba(90, 158, 146, 0.12), 0 4px 16px rgba(0,0,0,0.06)"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header section: Modified for Mobile Horizontal Layout */}
        <header className="flex flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Founder photo: Circular and small on mobile, larger on desktop */}
          <div className="flex-shrink-0">
            <img
              src="/images/founder.jpg"
              alt="ESSA Hub founder"
              className="w-16 h-16 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full"
            />
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-normal leading-tight italic sm:not-italic text-[#1A1D1F]">
              A note from the  founder
            </h1>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-5">
          <p className="text-[15px] md:text-lg text-[#1A1D1F]/80 leading-relaxed">
            ESSA Hub grew from recognising that women's relationship with sport isn't always
            straightforward. Life changes. Confidence shifts. Priorities evolve. The right
            opportunity isn't always obvious or accessible.
          </p>

          <p className="text-[15px] md:text-lg text-[#1A1D1F]/80 leading-relaxed">
            I wanted to build something that makes getting involved easier — in ways that fit around
            real life. A space where women can explore opportunities, connect with others and take
            part in ways that feel right for them, without pressure or judgement.
          </p>

          <p className="text-[15px] md:text-lg text-[#1A1D1F]/80 leading-relaxed">
            ESSA Hub is still growing and evolving, shaped by the women who use it. My hope is that
            it becomes a place women return to again and again, as their lives and interests change
            over time.
          </p>
        </div>

        {/* Sign-off */}
        <footer className="mt-8 pt-2">
          <p className="text-[15px] md:text-lg text-[#1A1D1F] font-medium">
            Welcome to ESSA Hub
          </p>
        </footer>
      </article>
    </div>
  );
};

export default Foundersection;