

 
import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
 
export default function Foundersection() {
  return (
    <div
      className="w-full flex items-center justify-center bg-[#E7F1F1] py-8 lg:py-12"
    >
      <Container className="w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[35%_65%] items-center gap-4 md:pl-10 lg:pl-0  lg:-ml-12">
          {/* Left: Image */}
          <div className="px-4 sm:px-6 md:pl-8 lg:pl-12 py-6">
            <img
              src="./fromfounders.png"
              alt="Founder of ESSA Hub"
              className="w-full h-56 sm:h-72 md:h-96 lg:h-[460px] object-cover object-[center_10%] rounded-lg shadow-lg block"
            />
          </div>
 
          {/* Right: Text */}
          <div className="max-w-3xl px-4 md:px-0 ">
          <SectionHeader
            title={"A note from the founder"}
            align="left"
            className="mb-4"
          />
 
          <p className="text-base sm:text-lg text-[#2f2f2f] leading-[1.8] mb-5">
            ESSA Hub grew from recognising that women&#39;s relationship with sport isn&#39;t always
            straightforward. Life changes. Confidence shifts. Priorities evolve. The right
            opportunity isn&#39;t always obvious or accessible.
          </p>
 
          <p className="text-base sm:text-lg text-[#2f2f2f] leading-[1.8] mb-5">
            I wanted to build something that makes getting involved easier - in ways that fit around
            real life. A space where women can explore opportunities, connect with others and
            take part in ways that feel right for them, without pressure or judgement.
          </p>
 
          <p className="text-base sm:text-lg text-[#2f2f2f] leading-[1.8] mb-6">
            ESSA Hub is still growing and evolving, shaped by the women who use it. My hope is
            that it becomes a place women return to again and again, as their lives and interests
            change over time.
          </p>
 
          <p className="text-base sm:text-lg text-[#2f2f2f] leading-[1.8]">
            Welcome to ESSA Hub
          </p>
 
          </div>
        </div>
      </Container>
    </div>
  );
}
 