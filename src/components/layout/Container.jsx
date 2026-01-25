import React from 'react';

const Container = ({children, className}) => {
    return (
        <div className={`${className} xl:container w-11/12 mx-auto px-4`}>
            {children}
        </div>
    );
};

export default Container;