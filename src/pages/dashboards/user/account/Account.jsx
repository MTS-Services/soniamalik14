import React, { useState } from 'react'
import { FiCamera, FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi'

export default function Account() {
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

  return (
    <div className="min-h-screen bg-transparent">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Account Setting Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ACCOUNT SETTING</h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/placeholder-avatar.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = '<div class="text-gray-400 text-2xl font-bold">KD</div>'
                    }}
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-200 transition-colors">
                  <FiCamera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
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

              <button className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium">
                SAVE CHANGES
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

            <button className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium">
              CHANGE PASSWORD
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

            <button className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium">
              SAVE CHANGES
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

            <button className="mt-6 px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
