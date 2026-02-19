import React, { useState, useEffect } from 'react';
import Container from '../../../components/layout/Container';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { updateUserProfile, changePassword } from '../../../services/authService';
import { FiEye, FiEyeOff, FiCamera } from 'react-icons/fi';

const ProviderSettings = () => {
    const { user, fetchMe } = useAuth();
    console.log(user)

    const [profile, setProfile] = useState({
        name: user?.name || '',
        businessName: user?.businessName || user?.company || '',
        about: user?.about || '',
        clinicAddress: user?.clinicAddress || user?.address || '',
        serviceArea: user?.serviceArea || '',
        workingDays: user?.workingDays || '',
        workingHours: user?.workingHours || '',
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

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error('User id not found');
            return;
        }
        setSavingProfile(true);
        try {
            let result;
            if (imageFile) {
                const form = new FormData();
                Object.keys(profile).forEach((k) => {
                    if (profile[k] !== undefined && profile[k] !== null) form.append(k, profile[k]);
                });
                form.append('avatar', imageFile);
                result = await updateUserProfile(user.id, form);
            } else {
                result = await updateUserProfile(user.id, profile);
            }

            if (result.success) {
                try {
                    await fetchMe();
                } catch (e) {
                    // ignore
                }
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
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
        const { current, newPass, confirm } = passwords;
        setChangingPassword(true);
        try {
            // authService handles toasts for success/error — avoid duplicating toasts here
            const result = await changePassword(current, newPass, confirm);
            if (result && result.success) setPasswords({ current: '', newPass: '', confirm: '' });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <div className=" dashboardPy dashboardSpaceY">
            <div className="py-4">
                <h2 className="text-2xl font-semibold">Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Manage your profile and change password</p>
            </div>

            <div className="grid grid-cols-1  gap-6">
                {/* Profile Section */}
                <section className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-medium mb-3">Profile Information</h3>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-sm text-gray-400">No image</span>
                                        )}
                                    </div>
                                    <label htmlFor="avatarInput" className="absolute bottom-2 right-1 bg-white rounded-full p-2 shadow-md cursor-pointer">
                                        <FiCamera className="text-gray-600" />
                                    </label>
                                    <input id="avatarInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>

                            </div>
                        </div>
                        <label className="block text-sm mb-1">Business Name</label>
                        <input
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                            placeholder="Business Name"
                        />

                        <label className="block text-sm mb-1">About Business</label>
                        <textarea
                            name="about"
                            value={profile.about}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-3 min-h-[100px]"
                            placeholder="Write about business"
                        />

                        <label className="block text-sm mb-1">Clinic Address</label>
                        <input
                            name="clinicAddress"
                            value={profile.clinicAddress}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                            placeholder="Clinic Address"
                        />

                        <label className="block text-sm mb-1">Service Area</label>
                        <input
                            name="serviceArea"
                            value={profile.serviceArea}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                            placeholder="Service Area"
                        />

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Working Days</label>
                                <input
                                    name="workingDays"
                                    value={profile.workingDays}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                                    placeholder="e.g. Monday - Saturday"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Working Hours</label>
                                <input
                                    name="workingHours"
                                    value={profile.workingHours}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                                    placeholder="e.g. 9:00 am - 8:00 pm"
                                />
                            </div>
                        </div>

                        <label className="block text-sm mb-1">Email</label>
                        <input
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-3"
                            placeholder="Email"
                            type="email"
                        />

                        <label className="block text-sm mb-1">Phone Number</label>
                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="w-full border border-gray-200 px-3 py-2 rounded mb-4"
                            placeholder="Phone Number"
                        />

                        <div className="flex justify-end">
                            <Button className='rounded-lg' type="submit" variant="primary" disabled={savingProfile}>
                                {savingProfile ? 'Saving...' : 'Save Profile'}
                            </Button>
                        </div>
                    </form>
                </section>

                {/* Password Section */}
                <section className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <label className="block text-sm mb-1">Current password</label>
                        <div className="relative mb-3">
                            <input
                                name="current"
                                value={passwords.current}
                                onChange={handlePasswordChange}
                                className="w-full border border-gray-200 px-3 py-2 rounded"
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label="Toggle current password visibility"
                            >
                                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <label className="block text-sm mb-1">New password</label>
                        <div className="relative mb-3">
                            <input
                                name="newPass"
                                value={passwords.newPass}
                                onChange={handlePasswordChange}
                                className="w-full border border-gray-200 px-3 py-2 rounded"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="New password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label="Toggle new password visibility"
                            >
                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <label className="block text-sm mb-1">Confirm new password</label>
                        <div className="relative mb-4">
                            <input
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                                className="w-full border border-gray-200 px-3 py-2 rounded"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <Button className='rounded-lg' type="submit" variant="primary" disabled={changingPassword}>
                                {changingPassword ? 'Changing...' : 'Change Password'}
                            </Button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ProviderSettings;
