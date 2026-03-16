import React from 'react';
import ContentFormSection from './ContentFormSection';

const ContentAboutUS = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <ContentFormSection title="Hero section" />
            <div className="h-px bg-gray-100 my-10"></div>
            <ContentFormSection title="Founder section" />
        </div>
    );
};

export default ContentAboutUS;
