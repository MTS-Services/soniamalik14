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
        <div className='space-y-3.5 flex flex-col justify-center mt-10 lg:mt-0 items-center text-center'>
          <HeroTitle>Women. Sport. Community</HeroTitle>
          <p className='herosubtitle'>A platform built for women in sport — whatever level you're starting at.</p>
          {/* action btns */}
          <div className='flex justify-center items-center gap-1.5 lg:gap-4 flex-row'>
            <Button className='rounded-md'>Explore <span className='hidden md:flex'>Sports Near You</span></Button>
            <div className='flex'>
              
            <Button className='rounded-md  text-btn font-medium' variant='outline'>Join the ESSA Hub<span className='hidden md:flex'> Community</span></Button>
            </div>
          </div>
          <p className='herosubtitle hidden sm:flex'>Women-focused services, support and connection - all around sport</p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
