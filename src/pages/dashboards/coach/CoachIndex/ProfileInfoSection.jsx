import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';

const sportsOptions = [
    'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 
    'Padel', 'Tennis', 'Badminton', 'Golf', 'Running', 'Other'
];

const ProfileInfoSection = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(() => ({
        clubName: user?.clubName || user?.organization || 'Woking Warriors FC',
        about: user?.about || '',
        postcode: user?.postcode || 'SW1',
        sessionType: user?.sessionType || 'women',
        sports: user?.sports || ['Football', 'Rugby'],
        fullName: user?.name || user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
    }));

    const [imagePreview, setImagePreview] = useState(user?.avatar || '/coachindex.jpg');

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

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

    const handleSaveProfile = (e) => {
        e.preventDefault();
        toast.success('Profile updated successfully!');
    };

    // Styling constant image er moto
    const inputClass = "w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#0F766E] transition-all placeholder:text-gray-400";
    const labelClass = "mb-2 block text-[15px] font-medium text-[#1D1D1D]";

    return (
        <section className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <form className="space-y-6">
                {/* Profile Image with Camera Overlay */}
                <div className="relative w-24 h-24 mb-8">
                    <div className="h-full w-full rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <label htmlFor="imgInput" className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50 transition-all">
                        <FiCamera size={14} className="text-gray-600" />
                        <input type="file" id="imgInput" className="hidden" accept="image/*" onChange={handleImageSelect} />
                    </label>
                </div>

                {/* Organization Name */}
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

                {/* About Section */}
                <div>
                    <label className={labelClass}>About your organisation</label>
                    <textarea 
                        name="about" 
                        value={profile.about} 
                        onChange={handleProfileChange} 
                        className={`${inputClass} min-h-[150px] resize-none`}
                        placeholder="Write about club"
                    />
                </div>

                {/* Session Type - Checkbox Style like Image */}
                <div>
                    <p className={labelClass}>Session Type</p>
                    <div className="flex gap-4">
                        {['women', 'mixed'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setProfile({...profile, sessionType: type})}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#D1E7E5] text-[#0F766E] text-sm font-semibold"
                            >
                                <input 
                                    type="checkbox" 
                                    checked={profile.sessionType === type} 
                                    readOnly 
                                    className="w-4 h-4 accent-[#0F766E]" 
                                />
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

                {/* Sport Grid - Small Badge Style */}
                <div>
                    <p className={labelClass}>Sport</p>
                    <div className="flex flex-wrap gap-3">
                        {sportsOptions.map((sport) => (
                            <button
                                key={sport}
                                type="button"
                                onClick={() => toggleSport(sport)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#D1E7E5] text-[#0F766E] text-sm font-semibold border border-transparent"
                            >
                                <input 
                                    type="checkbox" 
                                    checked={profile.sports.includes(sport)} 
                                    readOnly 
                                    className="w-4 h-4 accent-[#0F766E]" 
                                />
                                {sport}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Contact Section */}
                <div className="pt-4">
                    <h3 className="text-xl font-bold text-[#1D1D1D] mb-6">Primary Contact</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <input 
                                name="fullName" 
                                value={profile.fullName} 
                                onChange={handleProfileChange} 
                                className={inputClass}
                                placeholder="Enter Your Full Name"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Email</label>
                            <input 
                                name="email" 
                                value={profile.email} 
                                onChange={handleProfileChange} 
                                className={inputClass}
                                placeholder="Write your email"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <input 
                                name="phone" 
                                value={profile.phone} 
                                onChange={handleProfileChange} 
                                className={inputClass}
                                placeholder="enter your phone number"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Changes Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSaveProfile}
                        className="bg-[#0F766E] text-white px-8 py-2.5 rounded-md font-semibold hover:bg-[#0d635d] transition-colors"
                    >
                        SAVE CHANGES
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ProfileInfoSection;