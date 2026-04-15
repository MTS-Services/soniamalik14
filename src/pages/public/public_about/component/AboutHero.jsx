// import React from 'react';
// import Container from '../../../../components/layout/Container';
// import Button from '../../../../components/ui/Button';
// import HeroTitle from '../../../../components/ui/HeroTitle';

// const AboutHero = () => {
//   const backgroundImageUrl = '/images/About.jpg'; 
//   return (
//     <div
//       style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none' }}
//       className="relative flex w-auto items-center justify-center bg-cover bg-center h-70 sm:h-160 md:h-160 lg:h-200"
//     >
//       <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
//       <Container className="relative z-10 py-10 lg:py-0">
    
//       </Container>
//     </div>
//   );
// };

// export default AboutHero;






import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const AboutHero = () => {


  return (
    <div
      className={`
        relative flex w-auto items-center justify-center bg-cover bg-center 
        h-70 sm:h-160 md:h-160 lg:h-190
        
        bg-[url('/images/about1.png')] 
        
        lg:bg-[url('/images/About.jpg')]
      `}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
      
      <Container className="relative z-10 py-10 lg:py-0">
        {/* Apnar content ekhane thakbe */}
      </Container>
    </div>
  );
};

export default AboutHero;