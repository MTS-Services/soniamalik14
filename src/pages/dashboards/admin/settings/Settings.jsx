
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import { changePassword, updateUserProfile } from '../../../../services/authService';

export default function Settings() {
  const { user, fetchMe } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || user?.phone || '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateProfileForm()) return;

    if (!user?.id) {
      setErrors({ email: 'User ID not found' });
      return;
    }

    setLoading(true);
    const result = await updateUserProfile(user.id, {
      phoneNumber: formData.phoneNumber,
    });

    setLoading(false);

    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
      const updatedUserData = await fetchMe(); // Refresh user data
      if (updatedUserData?.success && updatedUserData?.user) {
        setFormData(prev => ({
          ...prev,
          email: updatedUserData.user.email || prev.email,
          phoneNumber: updatedUserData.user.phoneNumber || updatedUserData.user.phone || prev.phoneNumber
        }));
      }
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccessMessage('');

    if (!validatePasswordForm()) return;

    setPasswordLoading(true);
    const result = await changePassword(
      formData.oldPassword,
      formData.newPassword,
      formData.confirmNewPassword
    );

    setPasswordLoading(false);

    if (result.success) {
      setPasswordSuccessMessage('Password changed successfully!');
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      setTimeout(() => setPasswordSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dashboardPy dashboardSpaceY">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-2">Manage your account settings and preferences</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Outer Teal Card Container - Personal Details */}
        <div className="bg-[#91C0BC] rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>

          {/* Inner White Form Container */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700`}
                />
                {errors.phoneNumber && <p className="mt-1 text-base text-red-600">{errors.phoneNumber}</p>}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#007F73] hover:bg-[#00665C] text-white font-semibold py-2.5 px-10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Success Message */}
        {passwordSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {passwordSuccessMessage}
          </div>
        )}

        {/* Password Section - Separate Card */}
        <div className="bg-[#91C0BC] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

          {/* Inner White Form Container */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form onSubmit={handleChangePassword} className="space-y-6">
              {/* Old Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="******"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.oldPassword && <p className="mt-1 text-base text-red-600">{errors.oldPassword}</p>}
              </div>

              {/* New Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="******"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && <p className="mt-1 text-base text-red-600">{errors.newPassword}</p>}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="******"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmNewPassword && <p className="mt-1 text-base text-red-600">{errors.confirmNewPassword}</p>}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-[#007F73] hover:bg-[#00665C] text-white font-semibold py-2.5 px-10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}