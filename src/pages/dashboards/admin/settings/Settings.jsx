
import React, { useState } from 'react';

export default function Settings() {
  const [formData, setFormData] = useState({
    email: 'alma.lawson@example.com',
    phoneNumber: '0413 345 879',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (formData.oldPassword || formData.newPassword || formData.confirmNewPassword) {
      if (!formData.oldPassword) newErrors.oldPassword = 'Old password is required';
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validateForm()) {
      setSuccessMessage('Settings saved successfully!');
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      setTimeout(() => setSuccessMessage(''), 3000);
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
          <button
            onClick={handleSave}
            className="bg-[#007F73] hover:bg-[#00665C] text-white font-semibold py-2.5 px-10 rounded transition-colors w-full md:w-auto"
          >
            Save
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Outer Teal Card Container */}
        <div className="bg-[#91C0BC] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>

          {/* Inner White Form Container - Fixed Visibility */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700`}
                />
                {errors.email && <p className="mt-1 text-base text-red-600">{errors.email}</p>}
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

              {/* Old Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="******"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700`}
                />
                {errors.oldPassword && <p className="mt-1 text-base text-red-600">{errors.oldPassword}</p>}
              </div>

              {/* New Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="******"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700`}
                />
                {errors.newPassword && <p className="mt-1 text-base text-red-600">{errors.newPassword}</p>}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="block text-lg font-medium text-[#6D5348] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="******"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-[#91C0BC] bg-white text-gray-700`}
                />
                {errors.confirmNewPassword && <p className="mt-1 text-base text-red-600">{errors.confirmNewPassword}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}