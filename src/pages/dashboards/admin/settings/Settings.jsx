import React, { useState } from 'react'

export default function Settings() {
  const [formData, setFormData] = useState({
    email: 'alma.lawson@example.com',
    phoneNumber: '0413 345 879',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    }

    // Password validation (only if user is trying to change password)
    if (formData.oldPassword || formData.newPassword || formData.confirmNewPassword) {
      if (!formData.oldPassword) {
        newErrors.oldPassword = 'Old password is required'
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required'
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters'
      }
      if (!formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Please confirm your new password'
      } else if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSuccessMessage('')

    if (validateForm()) {
      // Here you would typically make an API call to save the settings
      console.log('Saving settings:', formData)
      setSuccessMessage('Settings saved successfully!')
      
      // Clear password fields after successful save
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }))

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm"
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

      {/* Personal Details Section */}
      <div className="bg-[#B5D5D2] rounded-lg p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Personal Details</h2>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Old Password Field */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.oldPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white`}
              placeholder="••••••"
            />
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password Field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white`}
              placeholder="••••••"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white`}
              placeholder="••••••"
            />
            {errors.confirmNewPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
