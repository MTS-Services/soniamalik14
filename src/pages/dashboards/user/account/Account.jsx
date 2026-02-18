import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { changePassword, updateUserProfile, updateBillingAddress, updateShippingAddress } from '../../../../services/authService'
import { FiCamera, FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi'

export default function Account() {
  const { fetchMe, user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMe();
        // eslint-disable-next-line no-console
        console.log('[Account] /api/auth/me:', res?.user ?? res);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Account] fetchMe error', e);
      }
    };
    load();
  }, [fetchMe]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [accountData, setAccountData] = useState({
    firstName: 'Kevin',
    lastName: 'Display name',
    email: 'customer@gmail.com',
    phone: '+1-202-555-0118',
    region: 'Alabama',
    city: 'Montgomery',
    zipCode: '1000',
    address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [changingPassword, setChangingPassword] = useState(false)
  const [savingAccount, setSavingAccount] = useState(false)
  const [savingBilling, setSavingBilling] = useState(false)
  const [savingShipping, setSavingShipping] = useState(false)

  const [billingAddress, setBillingAddress] = useState({
    firstName: 'Kevin',
    lastName: 'Gilbert',
    companyName: '',
    address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D',
    region: '',
    city: 'Dhaka',
    zipCode: '1207',
    email: 'customer@example.com',
    phone: '+1-202-555-0118'
  })

  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Kevin',
    lastName: 'Gilbert',
    companyName: '',
    address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D',
    region: '',
    city: 'Dhaka',
    zipCode: '1207',
    email: 'customer@gmail.com',
    phone: '+1-202-555-0118'
  })

  const regions = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut']
  const cities = ['Montgomery', 'Birmingham', 'Mobile', 'Huntsville', 'Tuscaloosa']

  // When `user` becomes available, populate the form fields with real data
  useEffect(() => {
    if (!user) return;
    const fullName = user.name || user.fullName || '';
    const parts = fullName.trim().split(' ').filter(Boolean);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    setAccountData((prev) => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      email: user.email || prev.email,
      phone: user.phoneNumber || user.phone || prev.phone,
      region: user.region || prev.region,
      city: user.city || prev.city,
      zipCode: user.zipCode || prev.zipCode,
      address: user.address || prev.address,
    }));

    // Populate billing address from user.billingAddress object if available
    if (user.billingAddress) {
      setBillingAddress({
        firstName: user.billingAddress.firstName || firstName,
        lastName: user.billingAddress.lastName || lastName,
        companyName: user.billingAddress.companyName || '',
        address: user.billingAddress.address || '',
        region: user.billingAddress.regionState || user.billingAddress.region || '',
        city: user.billingAddress.city || '',
        zipCode: user.billingAddress.zipCode || '',
        email: user.billingAddress.email || user.email || '',
        phone: user.billingAddress.phoneNumber || user.billingAddress.phone || user.phoneNumber || ''
      });
    } else {
      setBillingAddress((prev) => ({
        ...prev,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phoneNumber || user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }

    // Populate shipping address from user.shippingAddress object if available
    if (user.shippingAddress) {
      setShippingAddress({
        firstName: user.shippingAddress.firstName || firstName,
        lastName: user.shippingAddress.lastName || lastName,
        companyName: user.shippingAddress.companyName || '',
        address: user.shippingAddress.address || '',
        region: user.shippingAddress.regionState || user.shippingAddress.region || '',
        city: user.shippingAddress.city || '',
        zipCode: user.shippingAddress.zipCode || '',
        email: user.shippingAddress.email || user.email || '',
        phone: user.shippingAddress.phoneNumber || user.shippingAddress.phone || user.phoneNumber || ''
      });
    } else {
      setShippingAddress((prev) => ({
        ...prev,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phoneNumber || user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Account Setting Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ACCOUNT SETTING</h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0">

            </div>

            {/* Form Fields */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <input
                    type="text"
                    value={accountData.firstName}
                    onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <input
                    type="text"
                    value={accountData.lastName}
                    onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={accountData.phone}
                    onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                  <div className="relative">
                    <select
                      value={accountData.region}
                      onChange={(e) => setAccountData({ ...accountData, region: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <div className="relative">
                    <select
                      value={accountData.city}
                      onChange={(e) => setAccountData({ ...accountData, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={accountData.zipCode}
                    onChange={(e) => setAccountData({ ...accountData, zipCode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={accountData.address}
                    onChange={(e) => setAccountData({ ...accountData, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (!user?.id) {
                    // toast.error('User ID not found');
                    return;
                  }
                  setSavingAccount(true);
                  const userData = {
                    name: `${accountData.firstName} ${accountData.lastName}`.trim(),
                    email: accountData.email,
                    phoneNumber: accountData.phone,
                    address: accountData.address,
                    city: accountData.city,
                    region: accountData.region,
                    zipCode: accountData.zipCode,
                  };
                  const result = await updateUserProfile(user.id, userData);
                  setSavingAccount(false);
                  if (result.success && result.user) {
                    // Optionally refresh user data
                    await fetchMe();
                  }
                }}
                className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
                disabled={savingAccount}
              >
                {savingAccount ? 'Saving...' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">CHANGE PASSWORD</h2>

          <div className="">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="8+ characters"
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                const { currentPassword, newPassword, confirmPassword } = passwordData;
                setChangingPassword(true);
                const result = await changePassword(currentPassword, newPassword, confirmPassword);
                setChangingPassword(false);
                if (result.success) {
                  // Clear password inputs on success
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }
              }}
              className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
              disabled={changingPassword}
            >
              {changingPassword ? 'Changing...' : 'CHANGE PASSWORD'}
            </button>
          </div>
        </div>

        {/* Billing and Shipping Address Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Billing Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">BILLING ADDRESS</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={billingAddress.firstName}
                    onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={billingAddress.lastName}
                    onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
                <input
                  type="text"
                  value={billingAddress.companyName}
                  onChange={(e) => setBillingAddress({ ...billingAddress, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={billingAddress.address}
                  onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                <div className="relative">
                  <select
                    value={billingAddress.region}
                    onChange={(e) => setBillingAddress({ ...billingAddress, region: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10 text-gray-500"
                  >
                    <option value="">Select...</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <div className="relative">
                    <select
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={billingAddress.email}
                  onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={billingAddress.phone}
                  onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (!user?.id) return;
                setSavingBilling(true);
                const billingData = {
                  firstName: billingAddress.firstName,
                  lastName: billingAddress.lastName,
                  companyName: billingAddress.companyName,
                  address: billingAddress.address,
                  regionState: billingAddress.region,
                  city: billingAddress.city,
                  zipCode: billingAddress.zipCode,
                  email: billingAddress.email,
                  phoneNumber: billingAddress.phone,
                };
                await updateBillingAddress(user.id, billingData);
                setSavingBilling(false);
              }}
              className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
              disabled={savingBilling}
            >
              {savingBilling ? 'Saving...' : 'SAVE CHANGES'}
            </button>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">SHIPPING ADDRESS</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={shippingAddress.lastName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
                <input
                  type="text"
                  value={shippingAddress.companyName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                <div className="relative">
                  <select
                    value={shippingAddress.region}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, region: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10 text-gray-500"
                  >
                    <option value="">Select...</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <div className="relative">
                    <select
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (!user?.id) return;
                setSavingShipping(true);
                const shippingData = {
                  firstName: shippingAddress.firstName,
                  lastName: shippingAddress.lastName,
                  companyName: shippingAddress.companyName,
                  address: shippingAddress.address,
                  regionState: shippingAddress.region,
                  city: shippingAddress.city,
                  zipCode: shippingAddress.zipCode,
                  email: shippingAddress.email,
                  phoneNumber: shippingAddress.phone,
                };
                await updateShippingAddress(user.id, shippingData);
                setSavingShipping(false);
              }}
              className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
              disabled={savingShipping}
            >
              {savingShipping ? 'Saving...' : 'SAVE CHANGES'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
