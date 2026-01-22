import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import Button from '../../../../components/ui/Button';
import Card from '../../../../components/ui/Card';

const AboutMission = () => {
    return (
        <section className="py-16">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left: Text */}
                    <div className='max-w-xl'>
                        <SectionHeader
                            title={"A Safe Space for Women in Sports"}
                            description={"ESSA HUB is a women-first sports community connecting players with clubs, coaches, training opportunities, and trusted service providers — all in one supportive platform. Whether you're just starting out or aiming to grow competitively, we help you find the right space to play and thrive."}
                        />

                        <div className="mt-6">
                            <h4 className="subtitle mb-2">Our Mission</h4>
                            <p className="description mb-6">Our mission is to empower women through sport by removing barriers to access, visibility, and opportunity. We aim to create a trusted digital space where women can confidently discover clubs, join training sessions, take part in community discussions, and grow their sporting journey — regardless of age, background, or ability level.</p>
                            <Button className="rounded-md">About Us</Button>
                        </div>
                    </div>

                    {/* Right: Image / visual */}
                    <div className="flex justify-center lg:justify-end">
                            <img src="/aboutMission.png" alt="About mission" className="lg:w-[80%] h-auto object-cover" />
                        
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutMission;