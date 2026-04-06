

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
              className="w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg"
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