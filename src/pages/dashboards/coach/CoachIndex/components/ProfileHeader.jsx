import React from 'react';
import PageHeader from '../../../../../components/ui/PageHeader';
import { IoLocationOutline } from 'react-icons/io5';

const ProfileHeader = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-4">
            <img
                src="/coachindex.jpg"
                alt="coach"
                className="w-26 h-26 rounded-lg object-cover shadow-sm"
            />

            <div>
               <h1 className="text-2xl font-bold text-btn-primary">Northside Elite Football</h1>
                <p className="text-base text-secondary-text mt-1 flex items-center gap-1 ">
                    <IoLocationOutline />Manchester, UK
                </p>
                <p className="text-base text-description mt-2 max-w-2xl">
                    Leading the way in youth female development. Our mission is to provide
                    professional-grade training and competition for girls aged 12-18 across the North West.
                </p>
            </div>
        </div>
    );
};

export default ProfileHeader;
