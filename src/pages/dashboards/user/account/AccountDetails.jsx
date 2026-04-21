import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Eye, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';
import { changePassword, getUserProfile, updateUserProfile } from '../../../../services/authService';

const AccountDetails = () => {
  const { user, fetchMe } = useAuth();
  const fileInputRef = useRef(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    address: '',
    region: '',
    city: '',
  });
  const hydratedUserIdRef = useRef(null);

  const normalizeProfile = (profile) => ({
    firstName:
      profile?.firstName ||
      profile?.givenName ||
      profile?.first_name ||
      profile?.name?.split(' ')?.[0] ||
      profile?.fullName?.split(' ')?.[0] ||
      '',
    lastName:
      profile?.lastName ||
      profile?.familyName ||
      profile?.last_name ||
      profile?.name?.split(' ')?.slice(1).join(' ') ||
      profile?.fullName?.split(' ')?.slice(1).join(' ') ||
      '',
    email: profile?.email || profile?.emailAddress || '',
    phone: profile?.phone || profile?.phoneNumber || profile?.mobile || '',
    postcode: profile?.postcode || profile?.zip || profile?.postalCode || '',
    address:
      profile?.address ||
      profile?.streetAddress ||
      profile?.addressLine1 ||
      profile?.addressLine2 ||
      '',
    region: profile?.region || profile?.state || profile?.province || '',
    city: profile?.city || profile?.town || '',
  });

  const resolveUserId = (profile) =>
    profile?.id || profile?._id || profile?.userId || profile?.user_id || profile?.data?.id || profile?.data?._id || profile?.data?.userId || null;

  const userId = useMemo(() => resolveUserId(user), [user]);

  const resolvedProfile = useMemo(() => user?.data?.user || user?.profile || user?.data || user || null, [user]);

  const mergeProfile = useCallback((current, next) => {
    const normalizedNext = normalizeProfile(next);

    return {
      firstName: normalizedNext.firstName || current.firstName,
      lastName: normalizedNext.lastName || current.lastName,
      email: normalizedNext.email || current.email,
      phone: normalizedNext.phone || current.phone,
      postcode: normalizedNext.postcode || current.postcode,
      address: normalizedNext.address || current.address,
      region: normalizedNext.region || current.region,
      city: normalizedNext.city || current.city,
    };
  }, []);

  useEffect(() => {
    if (!resolvedProfile) {
      return;
    }

    setFormData((current) => mergeProfile(current, resolvedProfile));
    setProfileImage(
      resolvedProfile?.avatar ||
        resolvedProfile?.image ||
        resolvedProfile?.profileImage ||
        ''
    );
  }, [resolvedProfile, mergeProfile]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId || hydratedUserIdRef.current === userId) {
        return;
      }

      setLoadingProfile(true);
      try {
        const profileCandidates = [resolvedProfile];
        const response = await getUserProfile(userId);
        profileCandidates.unshift(response?.user, response?.data, response);

        const profile = profileCandidates.find((candidate) => candidate && typeof candidate === 'object');

        if (profile) {
          setFormData((current) => mergeProfile(current, profile));
          setProfileImage(profile?.avatar || profile?.image || profile?.profileImage || '');
        }

        hydratedUserIdRef.current = userId;
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [userId, resolvedProfile, mergeProfile]);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    hydratedUserIdRef.current = userId || hydratedUserIdRef.current;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('User id not found');
      return;
    }

    setSavingProfile(true);
    try {
      const payload = {
        firstName: formData.firstName?.trim(),
        lastName: formData.lastName?.trim(),
        name: [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim(),
        email: formData.email?.trim(),
        phone: formData.phone?.trim(),
        postcode: formData.postcode?.trim(),
        address: formData.address?.trim(),
        region: formData.region?.trim(),
        city: formData.city?.trim(),
      };

      const updatePayload = imageFile ? new FormData() : payload;

      if (imageFile) {
        Object.entries(payload).forEach(([key, value]) => {
          updatePayload.append(key, value ?? '');
        });
        updatePayload.append('avatar', imageFile);
      }

      const result = await updateUserProfile(userId, updatePayload);

      if (result?.success) {
        await fetchMe();
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangingPassword(true);

    try {
      const result = await changePassword(passwords.current, passwords.newPass, passwords.confirm);
      if (result?.success) {
        setPasswords({ current: '', newPass: '', confirm: '' });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="dashboardPy dashboardSpaceY">
      {/* ACCOUNT SETTING SECTION */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider">Account Setting</h2>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 shrink-0">
            <img
              src={profileImage || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={handleProfilePictureClick}
              className="absolute bottom-2 right-2 bg-white border border-gray-200 p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <form className="grow grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleProfileSubmit}>
            <div className="space-y-1">
              <label className="text-base text-gray-700">First name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleProfileChange}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-base text-gray-700">Last name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleProfileChange}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-base text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleProfileChange}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-base text-gray-700">Phone Number</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleProfileChange}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600"
              />
            </div>

            {/* Location Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
              <div className="space-y-1">
                <label className="text-base text-gray-700">Region/State</label>
                <div className="relative">
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleProfileChange}
                    className="w-full appearance-none p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600 bg-white"
                  >
                    <option value="">Select region</option>
                    <option>Albama</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-base text-gray-700">City</label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleProfileChange}
                    className="w-full appearance-none p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700 font-bold bg-white"
                  >
                    <option value="">Select city</option>
                    <option>Montgomery</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-base text-gray-700">Postcode</label>
                <input
                  name="postcode"
                  type="text"
                  value={formData.postcode}
                  onChange={handleProfileChange}
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700 font-bold"
                />
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-base text-gray-700">Address</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleProfileChange}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600"
              />
            </div>

            <div className="pt-4 md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={savingProfile || loadingProfile}
                className="bg-[#147A73] text-white px-6 py-2.5 rounded-sm font-bold text-sm uppercase hover:bg-[#0d5e58] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CHANGE PASSWORD SECTION */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider">Change Password</h2>
        </div>

        <form className="p-6 space-y-4 max-w-full" onSubmit={handlePasswordSubmit}>
          <div className="space-y-1">
            <label className="text-base text-gray-700 font-medium">Current Password</label>
            <div className="relative">
              <input
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                type={showCurrent ? 'text' : 'password'}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                onClick={() => setShowCurrent(!showCurrent)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-base text-gray-700 font-medium">New Password</label>
            <div className="relative">
              <input
                name="newPass"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                type={showNew ? 'text' : 'password'}
                placeholder="8+ characters"
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-sm"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-base text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                type={showConfirm ? 'text' : 'password'}
                className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={changingPassword}
              className="bg-[#147A73] text-white px-6 py-2.5 rounded-sm font-bold text-sm uppercase hover:bg-[#0d5e58] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {changingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;