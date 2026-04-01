
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const Hero = () => {
  return (
    <div
      className="relative flex w-full h-[80vh] md:h-150 lg:h-screen items-end md:items-center justify-center bg-cover bg-center 
                 bg-[url('/mobilehero.jpg')] md:bg-[url('/hero.jpg')]"
    >
      <div className="absolute inset-0 z-0 bg-black/10 md:bg-black/10"></div>
      
      <Container className="relative z-10 pb-16 md:pb-0 lg:py-0">
        <div className='space-y-4 md:space-y-5 flex flex-col justify-center items-center text-center px-4'>
          
          <HeroTitle className='text-3xl md:text-5xl lg:text-7xl leading-tight'>
            Women. Sport. <br className="md:hidden" /> Community.
          </HeroTitle>

          <p className='herosubtitle max-w-[280px] md:max-w-none text-white/90 text-sm md:text-lg'>
            A platform built for women in sport — whatever level you're starting at.
          </p>
          
          {/* Action Button */}
          <div className='pt-4 w-full flex justify-center'>
            <Button className='rounded-md whitespace-nowrap px-8 py-3 bg-[#00796B] hover:bg-[#005a50] text-white border-none w-full md:w-auto max-w-[250px]'>
              Join ESSA Hub
            </Button>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Hero;





// const Hero = () => {
//   return (
//     <div
//       className="relative flex w-full h-[100vh] md:h-screen items-end md:items-center justify-center bg-cover bg-center bg-no-repeat 
//                  bg-[url('/mobilehero.jpg')] md:bg-[url('/hero.jpg')]"
//     >
//       {/* Figma Gradient Overlay */}
//       <div 
//         className="absolute inset-0 z-0"
//         style={{
//           background: 'linear-gradient(180deg, rgba(102, 102, 102, 0) 0%, rgba(0, 0, 0, 0.60) 100%)'
//         }}
//       ></div>

//       {/* Main Content Container (Row HTML) */}
//       <div className="relative z-10 w-full container mx-auto px-4 pb-16 md:pb-20 pt-0 md:pt-130">
//         <div className="flex flex-col items-center text-center space-y-5">
          
//           {/* Title */}
//           <h1 className="text-white font-bold text-4xl  md:text-5xl lg:text-6xl  leading-tight tracking-tight">
//             Women. Sport. Community.
//           </h1>

//           {/* Subtitle */}
//           <p className="text-white text-base md:text-lg  leading-relaxed">
//             A platform built for women in sport — whatever level you're starting at.
//           </p>
          
//           {/* Action Button */}
//           <div className="pt-4  flex justify-center">
//             <button className="bg-[#00796B] hover:bg-[#005a50] text-white font-semibold py-3 px-4 md:py-4  rounded-md transition-all duration-300 w-full md:w-auto max-w-[260px] md:max-w-none text-base ">
//               Join ESSA Hub
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;