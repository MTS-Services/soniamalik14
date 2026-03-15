import React from 'react';
import Container from '../../../components/layout/Container';
import { Check, ArrowRight } from 'lucide-react';

const collaborateData = [
    {
        id: 1,
        title: "For Sport Providers",
        description1: "If you run sessions, teams or training opportunities, ESSA Hub can help make them easier to find.",
        bullets: [
            "Promote women-only or inclusive sessions",
            "Increase visibility within your local area"
        ],
        description2: "If you deliver sport and want to reach more women, we'd love to hear from you.",
        buttonText: "List your club or sessions",
        buttonLink: "#",
        image: "/sportProviderOrginal.png", 
        layout: "left" 
    },
    {
        id: 2,
        title: "For Professional Support",
        description1: "We want to work with professionals whose expertise supports women in sport — including physiotherapy, strength and conditioning, nutrition, women's health and wellbeing.",
        bullets: [
            "Connect with a targeted audience",
            "Increase visibility within a trusted platform"
        ],
        description2: null, 
        buttonText: "List your business",
        buttonLink: "#",
        image: "/ProfessionalSupport1.png", 
        layout: "right"
    },
    {
        id: 3,
        title: "For Brands & Products",
        description1: "The ESSA Marketplace features thoughtfully selected brands that support women in sport.",
        bullets: [
            "Reach women interested in sport and wellbeing",
            "Be featured within a curated, women-focused space"
        ],
        description2: "If your brand shares our purpose, we'd love to hear from you.",
        buttonText: "Join the marketplace",
        buttonLink: "#",
        image: "/MarketPlace1.png", 
        layout: "left"
    }
];

const CollaborateCard = ({ data }) => {
    const isLeft = data.layout === 'left';

    return (
        <div className="relative rounded-2xl overflow-hidden min-h-[500px] xl:min-h-[600px] flex items-center bg-white border border-gray-100 shadow-sm group">
            
            {/* 1. Background Image Wrapper (Constrained to 70% width on desktop to prevent zooming) */}
            <div className={`absolute inset-0 md:w-[80%] h-full ${isLeft ? 'md:left-auto md:right-0' : 'md:right-auto md:left-0'}`}>
                <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full  object-center objrect-cover " 
                />
            </div>

            {/* 2. Gradient Overlay for Perfect Blending */}
            {/* Mobile: Fades Top to Bottom. Desktop: Fades Left to Right or Right to Left */}
            <div 
                className={`absolute inset-0 w-full h-full
                    bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.8)_40%,#FFF_65%)]
                    ${isLeft 
                        ? 'md:bg-[linear-gradient(90deg,#FFF_45%,rgba(255,255,255,0.8)_55%,transparent_100%)]' 
                        : 'md:bg-[linear-gradient(270deg,#FFF_45%,rgba(255,255,255,0.8)_55%,transparent_100%)]'
                    }
                `} 
            />

            {/* Content Container */}
            <div className={`relative z-10 w-full md:w-[55%] lg:w-[50%] p-6 sm:p-10 lg:p-16 flex flex-col justify-end md:justify-center min-h-[450px] md:min-h-0 h-full ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">
                    {data.title}
                </h2>
                
                <p className="text-[14px] sm:text-[15px] lg:text-base text-gray-600 mb-6 leading-relaxed">
                    {data.description1}
                </p>

                <ul className="space-y-3 mb-6">
                    {data.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-3 text-[14px] sm:text-[15px] lg:text-base text-gray-600">
                            <Check className="w-5 h-5 text-[#137C71] shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>

                {data.description2 && (
                    <p className="text-[14px] sm:text-[15px] lg:text-base text-gray-600 mb-8 leading-relaxed">
                        {data.description2}
                    </p>
                )}

                <div>
                    <a 
                        href={data.buttonLink}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#137C71] text-white rounded-md text-sm sm:text-base font-semibold hover:bg-[#0F635A] transition-colors"
                    >
                        {data.buttonText}
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

const CollaborateView = () => {
    return (
        <section className="py-10 sm:py-16 lg:py-20 bg-[#F8FAFC] font-sans">
            <Container>
                {/* Header Section */}
                <div className="max-w-3xl mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-4">
                        Collaborate With <br className="hidden sm:block" /> ESSA Hub
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                        We're building a trusted space for women's sport and we welcome organisations and businesses who want to be part of it.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {collaborateData.map((item) => (
                        <CollaborateCard key={item.id} data={item} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CollaborateView;