import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import FeatureCard from '../../../../components/ui/FeatureCard';
import { CiUser } from 'react-icons/ci';
import { Users } from 'lucide-react';
import { BiCalendar } from 'react-icons/bi';
import { RiShieldKeyholeFill } from 'react-icons/ri';

const serviceProviders = [
    {
        id: 1,
        icon: CiUser,
        title: 'Showcase Your Services',
        description:
            'Highlight your offerings and attract women athletes and community members.',
    },
    {
        id: 2,
        icon: Users,
        title: 'Trusted Providers',
        description:
            'Work with a community of verified physiotherapists, trainers, nutritionists, and more.',
    },
    {
        id: 3,
        icon: BiCalendar,
        title: 'Host Events',
        description: 'Run workshops, webinars, and clinics to share your knowledge.',
    },
    {
        id: 4,
        icon: RiShieldKeyholeFill,
        title: 'Safe & Private',
        description:
            'Connect with the community without accessing private player data.',
    },
];

const ServiceProvidersSection = () => {
    return (
        <section className="py-10 lg:py-16 bg-linear-to-b from-gray-50 to-white">
            <Container>
                <SectionHeader
                    title="For Service Providers"
                    description="Trusted service providers can showcase services, host events, and connect with the community — safely, without accessing private player data."
                    align="left"
                    className="mb-4 lg:mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                    {serviceProviders.map((item) => (
                        <FeatureCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ServiceProvidersSection;