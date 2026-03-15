// import { useState } from "react";

// const cardData = [
//   {
//     id: 1,
//     title: "Discover",
//     description:
//       "Explore women-only teams, sessions and activities near you - from beginner-friendly to competitive.",
//     image:
//       "/images/Discover.jpg",
//     alt: "Person tying athletic shoes",
//   },
//   {
//     id: 2,
//     title: "Community & Guidance",
//     description: "Ask questions, share experiences and build your network.",
//     image:
//       "/images/Community.jpg",
//     alt: "Group of women exercising outdoors",
//   },
//   {
//     id: 3,
//     title: "Support & Services",
//     description:
//       "Find women-focused professionals and services designed to support an active lifestyle.",
//     image:
//       "/images/Support.jpg",
//     alt: "Female healthcare professional",
//   },
//   {
//     id: 4,
//     title: "Marketplace",
//     description: "A curated space for brands supporting women in sport.",
//     image:
//       "/images/Marketplace.jpg",
//     alt: "Sports gear and equipment",
//   },
// ];

// const HubCard = ({ title, description, image, alt }) => {
//   const [ setHovered] = useState(false);

//   return (
//     <article
//       className="group bg-white rounded-2xl overflow-hidden   cursor-pointer flex flex-col border-5 border-white shadow-lg shadow-black/20"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       role="button"
//       tabIndex={0}
//       aria-label={`Explore ${title}`}
//       onKeyDown={(e) => e.key === "Enter" && console.log(`Navigate to ${title}`)}
//     >
//       {/* Image container */}
//       <div className="relative overflow-hidden h-52 ">
//         <img
//           src={image}
//           alt={alt}
//           className="w-full h-full object-cover  "
//         />
       
//       </div>

//       {/* Content */}
//       <div className="p-6 flex flex-col flex-1 bg-[#F1F1F5]">
//         <h3 className="text-lg font-semibold text-[#0B544E] mb-2 ">
//           {title}
//         </h3>
//         <p className="text-base text-[#373737] leading-relaxed">{description}</p>

        
//       </div>
//     </article>
//   );
// };

// export default function CoreFeatures() {
//   return (
//     <section
//       className="bg-[#E7F1F199] h-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-10 sm:py-16 lg:py-20"
      
//       aria-labelledby="essa-hub-heading"
//     >
//       <div className="container w-full">
//         {/* Header */}
//         <header className="text-center mb-12">
//           <h1
//             id="essa-hub-heading"
//             className="text-3xl sm:text-4xl font-bold text-teal-900 mb-3 tracking-tight"
//           >
//             Explore ESSA Hub
//           </h1>
//           <p className="text-gray-500 text-base sm:text-lg">
//             Everything you need - all in one place.
//           </p>
//         </header>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {cardData.map((card) => (
//             <HubCard key={card.id} {...card} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







import { useState, useRef } from "react";

const cardData = [
  {
    id: 1,
    title: "Discover",
    description:
      "Explore women-only teams, sessions and activities near you - from beginner-friendly to competitive.",
    image: "/images/Discover.jpg",
    alt: "Person tying athletic shoes",
  },
  {
    id: 2,
    title: "Community & Guidance",
    description: "Ask questions, share experiences and build your network.",
    image: "/images/Community.jpg",
    alt: "Group of women exercising outdoors",
  },
  {
    id: 3,
    title: "Support & Services",
    description:
      "Find women-focused professionals and services designed to support an active lifestyle.",
    image: "/images/Support.jpg",
    alt: "Female healthcare professional",
  },
  {
    id: 4,
    title: "Marketplace",
    description: "A curated space for brands supporting women in sport.",
    image: "/images/Marketplace.jpg",
    alt: "Sports gear and equipment",
  },
];

const HubCard = ({ title, description, image, alt }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <article
      // Mobile view: Takes 85% width and enables snapping. Desktop: Auto width.
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border-[5px] border-white shadow-lg shadow-black/20 shrink-0 w-[85%] sm:w-auto snap-center sm:snap-align-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${title}`}
      onKeyDown={(e) => e.key === "Enter" && console.log(`Maps to ${title}`)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 bg-[#F1F1F5]">
        <h3 className="text-lg font-semibold text-[#0B544E] mb-2 ">
          {title}
        </h3>
        <p className="text-base text-[#373737] leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default function CoreFeatures() {
  const scrollRef = useRef(null);

  // Function to handle manual scrolling via arrows
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      className="bg-[#E7F1F199] h-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 overflow-hidden"
      aria-labelledby="essa-hub-heading"
    >
      <div className="container w-full relative">
        {/* Header */}
        <header className="text-center mb-12">
          <h1
            id="essa-hub-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0B544E] mb-3 tracking-tight"
          >
            Explore ESSA Hub
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Everything you need - all in one place.
          </p>
        </header>

        {/* Mobile Navigation Arrows (Visible only on small screens) */}
        <button
          onClick={() => scroll("left")}
          className="sm:hidden absolute left-0 top-[60%] -translate-y-1/2 -translate-x-2 z-10 bg-[#0B544E] text-white p-2 rounded-full shadow-md focus:outline-none"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="sm:hidden absolute right-0 top-[60%] -translate-y-1/2 translate-x-2 z-10 bg-[#0B544E] text-white p-2 rounded-full shadow-md focus:outline-none"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

        {/* Cards Grid / Slider */}
        <div
          ref={scrollRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {cardData.map((card) => (
            <HubCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}