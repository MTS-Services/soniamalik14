import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Settings() {
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Moderator');

    // Dummy data matching the image
    const sportsCategories = [
        'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 
        'Padel', 'Tennis', 'Badminton', 'Golf', 'Running'
    ];

    const handleSendInvite = (e) => {
        e.preventDefault();
        // Implement invite logic here
        console.log(`Inviting ${inviteEmail} as ${inviteRole}`);
        setInviteEmail('');
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">
                
                {/* --- Sport Categories Section --- */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-1">Sport Categories</h1>
                            <p className="text-[15px] text-gray-600">Manage the sport types available on your platform.</p>
                        </div>
                        <button className="px-4 py-2.5 bg-[#0f766e] text-white text-sm font-medium rounded-md hover:bg-teal-800 transition-colors shadow-sm whitespace-nowrap">
                            Add Category
                        </button>
                    </div>

                    {/* Tags Container */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {sportsCategories.map((sport, index) => (
                            <span 
                                key={index} 
                                className="px-5 py-2 text-sm font-medium text-white bg-[#0f766e] rounded-full shadow-sm"
                            >
                                {sport}
                            </span>
                        ))}
                    </div>
                </section>

                {/* --- Role & Permission Strategy Section --- */}
                <section>
                    <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6">Role & Permission Strategy</h2>
                    
                    {/* Invite Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-2xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Invite your team</h3>
                        <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                            Easily add new members to a role by entering their email addresses<br className="hidden md:block"/>
                            below. Once invited, they'll receive an email with a link to join.
                        </p>

                        <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row items-stretch gap-3">
                            
                            {/* Email Input */}
                            <div className="flex-1">
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full bg-[#f1f5f9] border-none text-gray-800 text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* Role Select Dropdown */}
                            <div className="relative">
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className="appearance-none w-full sm:w-36 bg-[#042f2e] text-white text-sm font-medium px-4 py-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 cursor-pointer"
                                >
                                    <option value="Moderator">Moderator</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-[#0f766e] text-white text-sm font-medium rounded-md hover:bg-teal-800 transition-colors shadow-sm whitespace-nowrap"
                            >
                                Send Invite
                            </button>
                        </form>
                    </div>
                </section>

            </div>
        </div>
    );
}