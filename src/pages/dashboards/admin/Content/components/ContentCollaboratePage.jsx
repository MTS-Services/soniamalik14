import React from 'react';
import ContentFormSection from './ContentFormSection';

const ContentCollaboratePage = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <ContentFormSection title="Hero section" includeImage={false} />
            <div className="h-px bg-gray-100 my-10"></div>
            <ContentFormSection title="Sport Provider section" />
            <div className="h-px bg-gray-100 my-10"></div>
            <ContentFormSection title="Service Provider section" />
            <div className="h-px bg-gray-100 my-10"></div>
            <ContentFormSection title="Brand section" />
        </div>
    );
};

export default ContentCollaboratePage;
