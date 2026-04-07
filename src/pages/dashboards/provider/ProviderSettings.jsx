import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { updateUserProfile, changePassword } from '../../../services/authService';
import { FiEye, FiEyeOff, FiCamera } from 'react-icons/fi';

const sportsOptions = [
    'Football',
    'Squash',
    'Rugby',
    'Netball',
    'Cricket',
    'Padel',
    'Tennis',
    'Badminton',
    'Golf',
    'Running',
    'Other',
];

const ProviderSettings = () => {
    const { user, fetchMe } = useAuth();

    const [profile, setProfile] = useState({
        businessName: user?.businessName || user?.company || '',
        about: user?.about || '',
        postcode: user?.postcode || '',
        sessionType: user?.sessionType || 'women',
        sports: user?.sports || [],
        fullName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.avatar || user?.image || '');

    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [savingProfile, setSavingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const selectedSports = useMemo(
        () => (Array.isArray(profile.sports) ? profile.sports : String(profile.sports || '').split(',').filter(Boolean)),
        [profile.sports],
    );

    const inputClass =
        'w-full rounded-xl border border-[#D4E3E2] bg-white px-4 py-3 text-base text-[#1D1D1D] outline-none focus:border-[#0F766E]';

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((p) => ({ ...p, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        } else {
            setImagePreview(user?.avatar || user?.image || '');
        }
    };

    const toggleSport = (sport) => {
        setProfile((prev) => {
            const existing = Array.isArray(prev.sports) ? prev.sports : [];
            const next = existing.includes(sport)
                ? existing.filter((s) => s !== sport)
                : [...existing, sport];
            return { ...prev, sports: next };
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error('User id not found');
            return;
        }

        setSavingProfile(true);
        try {
            const payload = {
                name: profile.fullName,
                businessName: profile.businessName,
                about: profile.about,
                postcode: profile.postcode,
                sessionType: profile.sessionType,
                sports: selectedSports,
                email: profile.email,
                phone: profile.phone,
            };

            let result;
            if (imageFile) {
                const form = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    form.append(key, Array.isArray(value) ? value.join(',') : value ?? '');
                });
                form.append('avatar', imageFile);
                result = await updateUserProfile(user.id, form);
            } else {
                result = await updateUserProfile(user.id, payload);
            }

            if (result?.success) {
                await fetchMe();
            }
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setSavingProfile(false);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview, imageFile]);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((p) => ({ ...p, [name]: value }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setChangingPassword(true);
        try {
            const result = await changePassword(passwords.current, passwords.newPass, passwords.confirm);
            if (result?.success) setPasswords({ current: '', newPass: '', confirm: '' });
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <div className="dashboardPy dashboardSpaceY">
            <header className="space-y-2">
                <h1 className="text-5xl font-semibold text-[#1D1D1D]">Profile</h1>
                <p className="text-2xl text-[#6B7280]">Manage your account settings and preferences</p>
            </header>

            <section className="rounded-2xl border border-[#D4E3E2] bg-white p-4 md:p-6">
                <h2 className="mb-6 text-4xl font-semibold text-[#1D1D1D]">Personal Details</h2>

                <form className="space-y-8" onSubmit={handleProfileSubmit}>
                    <div className="space-y-5">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#D4E3E2] bg-[#F4F7F8]">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-[#6B7280]">No Image</div>
                            )}
                            <label
                                htmlFor="providerAvatarInput"
                                className="absolute right-0 bottom-0 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white shadow"
                            >
                                <FiCamera className="text-[#0F766E]" />
                            </label>
                            <input
                                id="providerAvatarInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Organization or Coach Name</label>
                            <input
                                name="businessName"
                                value={profile.businessName}
                                onChange={handleProfileChange}
                                className={inputClass}
                                placeholder="Woking Warriors FC"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">About your organisation</label>
                            <textarea
                                name="about"
                                value={profile.about}
                                onChange={handleProfileChange}
                                className={`${inputClass} min-h-40`}
                                placeholder="Write about club"
                            />
                        </div>

                        <div>
                            <p className="mb-2 text-2xl font-medium text-[#1D1D1D]">Session Type</p>
                            <div className="flex flex-wrap gap-4">
                                <label className="inline-flex items-center gap-2 text-base text-[#1D1D1D]">
                                    <input
                                        type="radio"
                                        name="sessionType"
                                        value="women"
                                        checked={profile.sessionType === 'women'}
                                        onChange={handleProfileChange}
                                        className="h-4 w-4"
                                    />
                                    Women Only
                                </label>
                                <label className="inline-flex items-center gap-2 text-base text-[#1D1D1D]">
                                    <input
                                        type="radio"
                                        name="sessionType"
                                        value="mixed"
                                        checked={profile.sessionType === 'mixed'}
                                        onChange={handleProfileChange}
                                        className="h-4 w-4"
                                    />
                                    Mixed
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Postcode</label>
                            <input
                                name="postcode"
                                value={profile.postcode}
                                onChange={handleProfileChange}
                                className={inputClass}
                                placeholder="SW1"
                            />
                        </div>

                        <div>
                            <p className="mb-2 text-2xl font-medium text-[#1D1D1D]">Sport</p>
                            <div className="flex flex-wrap gap-x-5 gap-y-3">
                                {sportsOptions.map((sport) => (
                                    <label key={sport} className="inline-flex items-center gap-2 text-base text-[#1D1D1D]">
                                        <input
                                            type="checkbox"
                                            checked={selectedSports.includes(sport)}
                                            onChange={() => toggleSport(sport)}
                                            className="h-4 w-4"
                                        />
                                        {sport}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 border-t border-[#E2E8EA] pt-6">
                        <h3 className="text-3xl font-semibold text-[#1D1D1D]">Primary Contact</h3>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Full Name</label>
                            <input
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleProfileChange}
                                className={inputClass}
                                placeholder="Enter Your Full Name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                className={inputClass}
                                placeholder="Write your email"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Phone Number</label>
                            <input
                                name="phone"
                                value={profile.phone}
                                onChange={handleProfileChange}
                                className={inputClass}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button className="rounded-xl" type="submit" variant="primary" disabled={savingProfile}>
                            {savingProfile ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </div>
                </form>
            </section>

            <section className="rounded-2xl border border-[#D4E3E2] bg-white p-4 md:p-6">
                <h3 className="mb-6 text-3xl font-semibold text-[#1D1D1D]">Password Settings</h3>
                <form className="space-y-5" onSubmit={handlePasswordSubmit}>
                    <div>
                        <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Old Password</label>
                        <div className="relative">
                            <input
                                name="current"
                                value={passwords.current}
                                onChange={handlePasswordChange}
                                className={inputClass}
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="******"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword((s) => !s)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6B7280]"
                                aria-label="Toggle current password visibility"
                            >
                                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">New Password</label>
                        <div className="relative">
                            <input
                                name="newPass"
                                value={passwords.newPass}
                                onChange={handlePasswordChange}
                                className={inputClass}
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Minimum 8 characters"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword((s) => !s)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6B7280]"
                                aria-label="Toggle new password visibility"
                            >
                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-2xl font-medium text-[#1D1D1D]">Confirm New Password</label>
                        <div className="relative">
                            <input
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                                className={inputClass}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="**** **** ****"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((s) => !s)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6B7280]"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button className="rounded-xl" type="submit" variant="primary" disabled={changingPassword}>
                            {changingPassword ? 'Changing...' : 'Change Password'}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ProviderSettings;
