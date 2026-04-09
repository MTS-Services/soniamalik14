
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import HeroTitle from '../../../../components/ui/HeroTitle';

const Hero = () => {
  return (
    <>
    <div className="md:hidden w-full bg-white">
  {/* Image Section with Masking Effect */}
  <div className="relative h-72 w-full">
    <div 
      className="h-full w-full bg-cover bg-center bg-[url('/hero2.png')]"
      style={{
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
      }}
    />
    {/* Optional: Extra overlay to ensure smooth transition to #F2F4F5 or White */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
  </div>

  {/* Text Content Section */}
  <div className="bg-white px-5 py-8 text-center -mt-4 relative z-10">
    <h1 className="text-2xl leading-[1.05] font-semibold text-[#0F6660]">
      Women. Sport. Community.
    </h1>

    <p className="mx-auto mt-3 max-w-95 text-xl leading-8 text-[#545C60]">
      A platform built for women in sport - whatever level you're starting at.
    </p>

    <div className="mt-6 flex justify-center">
      <Button className="rounded-2xl whitespace-nowrap bg-[#0F766E] px-8 py-3 text-base text-white hover:bg-[#0d655d]">
        Join ESSA Hub
      </Button>
    </div>
  </div>
</div>

      <div
        className="relative hidden h-[70vh] w-full bg-white items-end justify-center bg-cover bg-center md:flex md:h-150 lg:h-screen 
                 bg-[url('/heroWebp.webp')]"
      >
        <div className="absolute inset-0 z-0 bg-black/10 md:bg-black/10" />

        <Container className="relative z-10 pb-16 md:pb-0 lg:py-0 ">
          <div className="flex flex-col items-center justify-center  space-y-4 px-4 text-center md:space-y-5">
            <HeroTitle className="text-3xl leading-tight md:text-5xl lg:mt-70 lg:text-7xl">
              Women. Sport. <br className="md:hidden" /> Community.
            </HeroTitle>

            <p className="herosubtitle max-w-70 text-sm text-white/90 md:max-w-none md:text-lg">
              A platform built for women in sport — whatever level you're starting at.
            </p>

            <div className="flex w-full justify-center sm:pb-30   md:pb-35 lg:pb-40">
              <Button className="max-w-62.5 w-full rounded-md border-none bg-[#00796B] px-8 py-3 whitespace-nowrap text-white hover:bg-[#005a50] md:w-auto">
                Join ESSA Hub
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;


