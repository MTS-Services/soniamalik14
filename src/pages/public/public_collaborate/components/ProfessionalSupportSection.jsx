import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

// const ProfessionalSupportSection = () => {
//     return (
//         <div className="relative rounded-2xl overflow-hidden min-h-[500px] xl:min-h-[600px] flex items-center bg-white border border-gray-100 shadow-sm group">
//             {/* Image Layer (Left Side) */}
//             <div className="absolute inset-0 md:w-[80%] h-full md:right-auto md:left-0">
//                 <img
//                     src="/ProfessionalSupport1.png"
//                     alt="For Professional Support"
//                     className="w-full h-full object-cover object-center"
//                 />
//             </div>

//             {/* Gradient Overlay (Fades Right to Left) */}
//             <div
//                 className="absolute inset-0 w-full h-full 
//                 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.8)_40%,#FFF_65%)]
//                 md:bg-[linear-gradient(270deg,#FFF_45%,rgba(255,255,255,0.8)_55%,transparent_100%)]"
//             />

//             {/* Content Container (Right Side) */}
//             <div className="relative z-10 w-full md:w-[55%] lg:w-[50%] p-6 sm:p-10 lg:p-16 flex flex-col justify-end md:justify-center min-h-[450px] md:min-h-0 h-full ml-auto">
//                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">
//                     For Professional Support
//                 </h2>

//                 <p className="text-[14px] sm:text-[15px] lg:text-base text-gray-600 mb-6 leading-relaxed">
//                     We want to work with professionals whose expertise supports women in sport — including physiotherapy, strength and conditioning, nutrition, women's health and wellbeing.
//                 </p>

//                 <ul className="space-y-3 mb-8">
//                     <li className="flex items-start gap-3 text-[14px] sm:text-[15px] lg:text-base text-gray-600">
//                         <Check className="w-5 h-5 text-[#137C71] shrink-0 mt-0.5" strokeWidth={2.5} />
//                         <span>Connect with a targeted audience</span>
//                     </li>
//                     <li className="flex items-start gap-3 text-[14px] sm:text-[15px] lg:text-base text-gray-600">
//                         <Check className="w-5 h-5 text-[#137C71] shrink-0 mt-0.5" strokeWidth={2.5} />
//                         <span>Increase visibility within a trusted platform</span>
//                     </li>
//                 </ul>

//                 <div>
//                     <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#137C71] text-white rounded-md text-sm sm:text-base font-semibold hover:bg-[#0F635A] transition-colors">
//                         List your business
//                         <ArrowRight className="w-4 h-4" />
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };


const ProfessionalSupportSection = () => {
    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-white shadow-sm flex flex-col md:block mb-10">
            
            {/* Mobile Image (Visible only on small screens) */}
            <div className="h-64 sm:h-80 w-full md:hidden relative">
                <img 
                    // Replace with your original image: "/ProfessionalSupport1.png"
                    src="/ProfessionalSupport1.png" 
                    alt="For Professional Support" 
                    className="w-full h-full object-cover object-top"
                />
                {/* Subtle gradient to transition to white content below on mobile */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>

            {/* Desktop Background Image (Hidden on small screens) */}
            <div className="hidden md:block absolute inset-0 z-0 w-full h-full xl:min-h-[700px]">
                <img 
                    // Replace with your original image: "/ProfessionalSupport1.png"
                    src="/ProfessionalSupport1.png" 
                    alt="For Professional Support" 
                    className="absolute inset-0 w-full h-full object-cover "
                />
                {/* Smooth Gradient Overlay (Fades Right to Left this time) */}
                <div className="absolute inset-0 ml-auto bg-[linear-gradient(270deg,#FFFFFF_40%,rgba(255,255,255,0.9)_55%,transparent_100%)] w-[90%] lg:w-[80%]" />
            </div>

            {/* Content Container (Right Side) */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-16 w-full md:w-[65%] lg:w-[55%] bg-white md:bg-transparent min-h-[450px] md:min-h-[500px] xl:min-h-[550px] flex flex-col justify-center ml-auto">
                
                <h2 className="text-3xl md:text-[40px] leading-tight font-medium text-gray-900 mb-5 tracking-tight">
                    For Professional Support
                </h2>
                
                <p className="text-[#333333] text-[16px]  mb-8 leading-relaxed pr-4 md:pr-10 max-w-md">
                    We want to work with professionals whose expertise supports women in sport — including physiotherapy, strength and conditioning, nutrition, women's health and wellbeing.
                </p>

                <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                        <Check className="w-[22px] h-[22px] text-[#107C66] mr-3 mt-[2px] shrink-0" strokeWidth={2.5} />
                        <span className="text-[#1A1A1A] text-base font-medium tracking-tight">
                            Connect with a targeted audience
                        </span>
                    </li>
                    <li className="flex items-start">
                        <Check className="w-[22px] h-[22px] text-[#107C66] mr-3 mt-[2px] shrink-0" strokeWidth={2.5} />
                        <span className="text-[#1A1A1A] text-base font-medium tracking-tight">
                            Increase visibility within a trusted platform
                        </span>
                    </li>
                </ul>

                <div>
                    <a 
                        href="#"
                        className="bg-[#107C66] hover:bg-[#0c6150] transition-colors duration-200 text-white text-[15px] font-medium py-3 px-6 rounded-md inline-flex items-center group shadow-sm"
                    >
                        List your business
                        <ArrowRight className="w-4 h-4 ml-2 mt-[1px] transform group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalSupportSection;
