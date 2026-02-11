import React from 'react';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import { CiUser } from 'react-icons/ci';
import { UserCheck, Users } from 'lucide-react';
import { BiCalendar } from 'react-icons/bi';
import { RiShieldKeyholeFill } from 'react-icons/ri';

const serviceProviders = [
    {
        id: 1,
        icon: UserCheck,
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
        <section className="py-10 lg:py-16 ">
            <Container>
                <SectionHeader
                    title="For Service Providers"
                    description="Trusted service providers can showcase services, host events, and connect with the community — safely, without accessing private player data."
                    align="left"
                    className="mb-4 lg:mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                    {serviceProviders.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="bg-[#E7F1F1] border border-[#0000001F] rounded-2xl p-6 shadow-sm text-center"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className=" text-emerald-700 ">
                                        <Icon className="h-10 w-10" />
                                    </div>
                                </div>
                                <h3 className="text-xl text-[#000000] font-semibold mb-2">{item.title}</h3>
                                <p className="text-base text-[#323232]">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default ServiceProvidersSection;