import { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    email: 'alma.lawson@example.com',
    phone: '0412 345 678',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen  dashboardPy dashboardSpaceY">
      <div className="  ">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-8 rounded"
          >
            Save
          </button>
        </div>

        {/* Personal Details Card */}
        <div className="bg-[#91C0BC] rounded-lg p-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>

          {/* Form Fields */}
          <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
            {/* Email Field */}
            <div>
              <label className="block text-base font-medium text-[#6D5348] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6D5348]  placeholder:text-[#6D5348] rounded focus:outline-none focus:border-teal-600 bg-white"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-base font-medium text-[#6D5348] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6D5348] placeholder:text-[#6D5348] rounded focus:outline-none focus:border-teal-600 bg-white"
              />
            </div>

            {/* Old Password Field */}
            <div>
              <label className="block text-base font-medium text-[#6D5348] mb-2">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6D5348] placeholder:text-[#6D5348] rounded focus:outline-none focus:border-teal-600 bg-white"
              />
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-base font-medium text-[#6D5348] mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6D5348] placeholder:text-[#6D5348] rounded focus:outline-none focus:border-teal-600 bg-white"
              />
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label className="block text-base font-medium text-[#6D5348] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6D5348] placeholder:text-[#6D5348] rounded focus:outline-none focus:border-teal-600 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}