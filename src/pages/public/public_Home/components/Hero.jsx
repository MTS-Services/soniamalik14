import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: "url('/herobg.png')" }}
      className="relative flex  w-auto h-80 md:h-150 lg:h-200 items-center justify-center bg-cover bg-top"
    >
      {/* overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
      <Container className="relative z-10 py-10 lg:py-0">
        <div className='space-y-3.5 md:space-y-5 flex flex-col justify-center mt-10 lg:mt-0 items-center text-center'>
          <HeroTitle className='whitespace-nowrap md:whitespace-normal'>Women. Sport. Community</HeroTitle>
          <p className='herosubtitle'>A platform built for women in sport — whatever level you're starting at.</p>
          {/* action btns */}
          <div className='flex flex-col md:flex-row items-center justify-center gap-1.5 lg:gap-4 w-full'>
            {/* <Button className='w-5/6 max-w-sm rounded-md whitespace-nowrap md:w-auto'>Explore Sports Near You</Button> */}
            <Button className='w-2/3 max-w-xs rounded-md whitespace-nowrap md:w-auto'>Join the ESSA Hub</Button>
            {/* <Button className='w-2/3 max-w-xs rounded-md whitespace-nowrap text-btn font-medium md:w-auto' variant='outline'>Join the ESSA Hub</Button> */}
          </div>
          {/* <p className='herosubtitle hidden sm:flex'>Women-focused services, support and connection - all around sport</p> */}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
