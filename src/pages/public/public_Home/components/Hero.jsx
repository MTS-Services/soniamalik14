import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import Title from '../../../../components/ui/Title';

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: "url('/herobg.png')" }}
      className="relative flex h-200 items-center justify-center bg-cover bg-center py-20"
    >
      {/* overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-10"></div>
      <Container className="relative z-10">
        <div className='space-y-3.5'>
          <Title>Women. Sport. Community</Title>
          <p className='text-white text-[20px] text-center'>A platform built for women in sport — whatever level you're starting at.</p>
          {/* action btns */}
          <div className='flex justify-center items-center gap-4 flex-col lg:flex-row'>
            <Button className='rounded-md' size='sm'>Explore Sports Near You</Button>
            <Button className='rounded-md text-btn font-medium' variant='outline' size='sm'>Join the ESSA Hub Community</Button>
          </div>
          <p className='text-white text-[20px] text-center'>Women-focused services, support and connection - all around sport</p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
