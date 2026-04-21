import React, { useEffect, useMemo, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Button from '../../../../components/ui/Button';
import { updateUserProfile } from '../../../../services/authService';

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

const resolveUserId = (user) => user?.id || user?._id || user?.userId || null;

const ProviderProfileSection = ({ user, fetchMe }) => {
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
  const [savingProfile, setSavingProfile] = useState(false);

  const selectedSports = useMemo(
    () =>
      Array.isArray(profile.sports)
        ? profile.sports
        : String(profile.sports || '')
            .split(',')
            .filter(Boolean),
    [profile.sports]
  );

  const inputClass =
    'w-full rounded-lg border border-[#D4E3E2] bg-white px-4 py-3 text-base text-[#1D1D1D] outline-none focus:border-[#0F766E]';

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
    const userId = resolveUserId(user);

    if (!userId) {
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
          form.append(key, Array.isArray(value) ? value.join(',') : (value ?? ''));
        });
        form.append('avatar', imageFile);
        result = await updateUserProfile(userId, form);
      } else {
        result = await updateUserProfile(userId, payload);
      }

      if (result?.success) {
        await fetchMe();
      }
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview, imageFile]);

  return (
    <section className="rounded-lg border border-[#D4E3E2] bg-white">
      <form className="space-y-8 p-6" onSubmit={handleProfileSubmit}>
        <div className="space-y-5">
          {/* Profile Image with Camera Overlay */}
          <div className="relative mb-8 h-30 w-30">
            <div className="h-full w-full overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              <img
                src={imagePreview || '/coachindex.jpg'}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <label
              htmlFor="imgInput"
              className="absolute right-1 bottom-1 cursor-pointer rounded-full border border-gray-200 bg-white p-1.5 shadow-md transition-all hover:bg-gray-50"
            >
              <FiCamera size={14} className="text-gray-600" />
              <input type="file" id="imgInput" className="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">
              Organization or Coach Name
            </label>
            <input
              name="businessName"
              value={profile.businessName}
              onChange={handleProfileChange}
              className={inputClass}
              placeholder="Woking Warriors FC"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">
              About your organisation
            </label>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleProfileChange}
              className={`${inputClass} min-h-40`}
              placeholder="Write about club"
            />
          </div>

          <div>
            <p className="mb-2 text-base font-medium text-[#1D1D1D]">Session Type</p>
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
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Postcode</label>
            <input
              name="postcode"
              value={profile.postcode}
              onChange={handleProfileChange}
              className={inputClass}
              placeholder="SW1"
            />
          </div>

          <div>
            <p className="mb-2 text-base font-medium text-[#1D1D1D]">Sport</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {sportsOptions.map((sport) => (
                <label
                  key={sport}
                  className="inline-flex items-center gap-2 text-base text-[#1D1D1D]"
                >
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

        <div className="space-y-5 pt-6">
          <div>
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Full Name</label>
            <input
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              className={inputClass}
              placeholder="Enter Your Full Name"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Email</label>
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
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Phone Number</label>
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
          <Button className="rounded-lg" type="submit" variant="primary" disabled={savingProfile}>
            {savingProfile ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProviderProfileSection;
