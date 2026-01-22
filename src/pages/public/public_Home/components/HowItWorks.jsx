import React from 'react';
import Container from '../../../../components/layout/Container';
import Title from '../../../../components/ui/Title';

const HowItWorks = () => {
    return (
        <div className='py-20'>
            <Container>
                <div className='flex lg:flex-row flex-col w-full justify-between items-center gap-8'>
                    <div className=' space-y-6'>
                        <Title>How It Works</Title>
                        <div className='space-y-5 max-w-xl'>
                            <div className='space-y-1.5'>
                                <h2 className='subtitle text-[28px] font-medium'>Step 1: Create Your Profile</h2>
                                <p className='description text-base'>Set up your profile in minutes. Tell us your location, sport, and ability level so we can show you the most relevant opportunities.</p>
                            </div>
                            <div className='space-y-1.5'>
                                <h2 className='subtitle text-[28px] font-medium'>Step 2: Find Opportunities</h2>
                                <p className='description text-base'>Set up your profile in minutes. Tell us your location, sport, and ability level so we can show you the most relevant opportunities.</p>
                            </div>
                            <div className='space-y-1.5'>
                                <h2 className='subtitle text-[28px] font-medium'>Step 3: Join and Play</h2>
                                <p className='description text-base'>Set up your profile in minutes. Tell us your location, sport, and ability level so we can show you the most relevant opportunities.</p>
                            </div>
                        </div>
                    </div>
                    {/* image */}
                    <div className=''>
                        <img src="howitworks.png" alt="how it works" />
                    </div>
                    
                </div>
            </Container>
        </div>
    );
};

export default HowItWorks;