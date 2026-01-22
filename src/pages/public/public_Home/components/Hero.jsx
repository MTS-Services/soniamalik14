import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: "url('/herobg.png')" }}
      className="relative flex  w-auto lg:h-200 items-center justify-center bg-cover bg-center"
    >
      {/* overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
      <Container className="relative z-10">
        <div className='space-y-3.5'>
          <HeroTitle>Women. Sport. Community</HeroTitle>
          <p className='herosubtitle'>A platform built for women in sport — whatever level you're starting at.</p>
          {/* action btns */}
          <div className='flex justify-center items-center gap-4 flex-col lg:flex-row'>
            <Button className='rounded-md'>Explore Sports Near You</Button>
            <Button className='rounded-md hidden sm:block text-btn font-medium' variant='outline'>Join the ESSA Hub Community</Button>
          </div>
          <p className='herosubtitle'>Women-focused services, support and connection - all around sport</p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
