
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const Hero = () => {
  return (
    <div
      className="relative flex w-full h-[70vh] md:h-150 lg:h-screen items-end md:items-center justify-center bg-cover bg-center 
                 bg-[url('/hero2.webp')] md:bg-[url('/heroWebp.webp')]"
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


