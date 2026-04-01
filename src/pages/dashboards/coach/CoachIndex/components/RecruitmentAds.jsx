import React from 'react';
import { Link } from 'react-router-dom';

const RecruitmentAds = ({ onPost }) => {
    const ads = [
        { title: 'U16 Goalkeeper Wanted', applicants: 12, status: 'Active' },
        { title: 'Senior Midfielder - Trial Days', applicants: 45, status: 'Active' },
        { title: 'Assistant Coach (Volunteer)', applicants: 3, status: 'Pending' },
    ];

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Recruitment Ads</h3>
                <button onClick={onPost} className="text-btn-primary font-medium">+ Post New</button>
            </div>

            <div className="space-y-4">
                {ads.map((ad, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-4">
                        <div>
                            <h4 className="font-medium">{ad.title}</h4>
                            <p className="text-base text-secondary-text mt-1">{ad.applicants} Applicants</p>
                            <Link to="#" className="text-btn-primary text-base mt-2 inline-block">View Listing</Link>
                        </div>
                        <div className="text-base">
                            <span className={`px-3 py-1 rounded-full text-xs ${ad.status === 'Active' ? 'bg-[#E7F1F1] text-[#0F766E]' : 'bg-[#FFDAB9] text-[#FF7700]'}`}>{ad.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecruitmentAds;
