import { Plus, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const RecruitmentAds = ({ onPost }) => {
    const ads = [
        { title: 'U16 Goalkeeper Wanted',icon : Users,  applicants: 12, status: 'Active' },
        { title: 'Senior Midfielder - Trial Days', icon : Users, applicants: 45, status: 'Active' },
        { title: 'Assistant Coach (Volunteer)', icon : Users, applicants: 3, status: 'Pending' },
    ];

    return (
        <div className="p-2 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Recruitment Ads</h3>
                <button onClick={onPost} className="text-btn-primary font-medium gap-2 flex items-center"><Plus size={18} /> Post New</button>
            </div>

            <div className="space-y-4">
                {ads.map((ad, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-[#EDEDED] rounded-xl p-4">
                        <div>
                            <h4 className="font-medium">{ad.title}</h4>
                            <p className="text-base text-secondary-text mt-1 flex items-center gap-1">
                                <ad.icon size={18} />
                                {ad.applicants} Applicants
                            </p>
                            <Link to="#" className="text-btn-primary text-base mt-2 inline-block hover:underline">View Listing</Link>
                        </div>
                        <div className="text-base">
                            <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${ad.status === 'Active' ? 'bg-[#E7F1F1] text-[#0F766E]' : 'bg-[#FFDAB9] text-[#FF7700]'}`}>{ad.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecruitmentAds;
