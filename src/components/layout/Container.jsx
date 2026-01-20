import React from 'react';

const Container = ({children, className}) => {
    return (
        <div className={`${className} lg:max-w-7xl mx-auto w-11/12 px-4`}>
            {children}
        </div>
    );
};

export default Container;