import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';

const sportsOptions = [
    'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 
    'Padel', 'Tennis', 'Badminton', 'Golf', 'Running', 'Other'
];

const EditProfile = () => {
    const [profile, setProfile] = useState({
        clubName: 'Woking Warriors FC',
        about: '',
        postcode: 'SW1',
        sessionType: 'women',
        sports: ['Football', 'Rugby'],
        fullName: '',
        email: '',
        phone: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('/coachindex.jpg');
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [savingProfile, setSavingProfile] = useState(false);
    
    // Password Visibility States
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((p) => ({ ...p, [name]: value }));
    };

    const toggleSport = (sport) => {
        setProfile((prev) => ({
            ...prev,
            sports: prev.sports.includes(sport)
                ? prev.sports.filter((s) => s !== sport)
                : [...prev.sports, sport]
        }));
    };

    const inputClass = "w-full rounded-lg border border-[#D4E3E2] bg-white px-4 py-3 text-sm text-[#1D1D1D] placeholder:text-gray-300 outline-none focus:border-[#0F766E] transition-all";
    const labelClass = "mb-2 block text-xl  text-[#1D1D1D]";

    return (
        <div className="min-h-screen bg-[#F4F7F8] p-4 md:p-8 font-sans">
            <div className="">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1D1D1D]">Profile</h1>
                        <p className="text-base text-gray-500 mt-1">Manage your account settings and preferences</p>
                    </div>
                    <button className="bg-[#0F766E] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#0d635d] transition-colors">
                        Save
                    </button>
                </header>

                <div className="bg-[#91C0BC] bg-opacity-60 rounded-xl p-1 md:p-4 md:pt-15 border- border-[#91C0BC]">
                    <section className="bg-white rounded-[16px] p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-[#1D1D1D] mb-8">Personal Details</h2>

                        <form className="space-y-6">
                            {/* Profile Image */}
                            <div className="relative inline-block mb-4">
                                <div className="h-20 w-20 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100">
                                    <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                                </div>
                                <label htmlFor="imgInput" className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer border border-gray-100">
                                    <FiCamera className="text-[#0F766E] size-4" />
                                    <input type="file" id="imgInput" className="hidden" accept="image/*" />
                                </label>
                            </div>

                            <div>
                                <label className={labelClass}>Organization or Coach Name</label>
                                <input 
                                    name="clubName" 
                                    value={profile.clubName} 
                                    onChange={handleProfileChange} 
                                    className={inputClass} 
                                    placeholder="Woking Warriors FC"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>About your organisation</label>
                                <textarea 
                                    name="about" 
                                    value={profile.about} 
                                    onChange={handleProfileChange} 
                                    className={`${inputClass} min-h-[120px] resize-none`} 
                                    placeholder="Write about club"
                                />
                            </div>

                            {/* Session Type */}
                            <div>
                                <p className={labelClass}>Session Type</p>
                                <div className="flex gap-3">
                                    {['women', 'mixed'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setProfile({...profile, sessionType: type})}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 transition-all ${
                                                profile.sessionType === type 
                                                ? 'bg-[#B5D5D2] border-[#94BDBA] text-[#0F766E]' 
                                                : 'bg-[#B5D5D2] border-gray-200 text-gray-500'
                                            }`}
                                        >
                                            <input type="checkbox" checked={profile.sessionType === type} readOnly className="accent-[#0F766E]" />
                                            {type === 'women' ? 'Women Only' : 'Mixed'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Postcode */}
                            <div>
                                <label className={labelClass}>Postcode</label>
                                <input 
                                    name="postcode" 
                                    value={profile.postcode} 
                                    onChange={handleProfileChange} 
                                    className={inputClass} 
                                    placeholder="SW1"
                                />
                            </div>

                            {/* Sports Grid */}
                            <div>
                                <p className={labelClass}>Sport</p>
                                <div className="flex flex-wrap gap-3">
                                    {sportsOptions.map((sport) => (
                                        <button
                                            key={sport}
                                            type="button"
                                            onClick={() => toggleSport(sport)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 transition-all ${
                                                profile.sports.includes(sport)
                                                ? 'bg-[#B5D5D2] border-[#94BDBA] text-[#0F766E]' 
                                                : 'bg-[#B5D5D2] border-gray-200 text-gray-500'
                                            }`}
                                        >
                                            <input type="checkbox" checked={profile.sports.includes(sport)} readOnly className="accent-[#0F766E]" />
                                            {sport}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Primary Contact Section */}
                            <div className="pt-8 border-t border-gray-100 mt-10">
                                <h3 className="text-xl font-bold text-[#1D1D1D] mb-6">Primary Contact</h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className={labelClass}>Full Name</label>
                                        <input className={inputClass} placeholder="Enter Your Full Name" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email</label>
                                        <input className={inputClass} placeholder="Write your email" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone Number</label>
                                        <input className={inputClass} placeholder="Enter your phone number" />
                                    </div>
                                    
                                    {/* Password Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                        <PasswordField label="Password" placeholder="Minimum 8 characters" show={showNew} setShow={setShowNew} />
                                        <PasswordField label="Confirm Password" placeholder="•••• •••• ••••" show={showConfirm} setShow={setShowConfirm} />
                                    </div>
                                </div>
                            </div>

                            {/* Old/New Password Settings Section */}
                            <div className="space-y-5 pt-4">
                                <PasswordField label="Old Password" placeholder="••••••" show={showCurrent} setShow={setShowCurrent} />
                                <PasswordField label="New Password" placeholder="••••••" show={showNew} setShow={setShowNew} />
                                <PasswordField label="Confirm New Password" placeholder="••••••" show={showConfirm} setShow={setShowConfirm} />
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

// Reusable Password Input Component
const PasswordField = ({ label, placeholder, show, setShow }) => (
    <div>
        <label className="mb-2 block text-xl  text-[#1D1D1D]">{label}</label>
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                className="w-full rounded-lg border border-[#D4E3E2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F766E]"
                placeholder={placeholder}
            />
            <button 
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
                {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        </div>
    </div>
);

export default EditProfile;