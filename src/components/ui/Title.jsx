import React from 'react';

const Title = ({title, className}) => {
    return (
        <div className={`${className} text-[#313131] text-2xl sm:text-3xl lg:text-[40px] font-semibold`}>
            {title}
        </div>
    );
};

export default Title;