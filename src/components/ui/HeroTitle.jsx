import React from 'react';

const HeroTitle = ({ children, className = '' }) => {
    return (
        <div className={`${className} text-white text-2xl sm:text-3xl lg:text-[64px] font-semibold`}>
            {children}
        </div>
    );
};

export default HeroTitle;