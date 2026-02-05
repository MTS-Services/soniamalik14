import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Eye, EyeOff } from 'lucide-react';

const RegisterView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    abilityLevel: 'Beginner',
    location: '',
    interestedIn: [],
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const sports = ['Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interestedIn: checked 
          ? [...prev.interestedIn, value]
          : prev.interestedIn.filter(sport => sport !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.interestedIn.length === 0) {
      newErrors.interestedIn = 'Please select at least one sport';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert('Account created successfully!');
        navigate('/signin');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-secondary">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-4">
              <Link to="/" className="inline-flex items-center text-sm gap-1 text-btn-primary hover:text-[#0d655d] font-medium">
                <FaArrowLeft /> Back to Home
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#282828] mb-2">
              Create Account
            </h1>
            <p className="text-[#363636] text-sm md:text-base">
              Join the ESSA community today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username and Full Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="john-doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Player"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Ability Level */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Ability Level
              </label>
              <select
                name="abilityLevel"
                value={formData.abilityLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23363636'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25em 1.25em',
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Location/Postcode */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Location/Postcode
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. London, SW1"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>

            {/* Interested In */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Interested in
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sports.map((sport) => (
                  <label
                    key={sport}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={sport}
                      checked={formData.interestedIn.includes(sport)}
                      onChange={handleChange}
                      className="w-4 h-4 text-btn-primary bg-loginInput border-gray-300 rounded focus:ring-2 focus:ring-btn-primary cursor-pointer accent-btn-primary"
                    />
                    <span className="text-sm text-[#363636]">{sport}</span>
                  </label>
                ))}
              </div>
              {errors.interestedIn && (
                <p className="text-red-500 text-xs mt-1">{errors.interestedIn}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="•••• •••• ••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747474] hover:text-btn-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#282828] font-medium mb-2 text-sm md:text-base">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="•••• •••• ••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747474] hover:text-btn-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-btn-primary hover:bg-[#0d655d] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-[#363636]">
                Already have an account?{' '}
                <Link to="/signin" className="text-btn-primary font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image Grid */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-6 sticky top-0 h-screen overflow-hidden">
        <div className="relative w-full max-w-2xl h-full">
          {/* Image Grid Pattern */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-200">
                <img 
                  src="/images/login/image_1.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-64 bg-gray-200">
                <img 
                  src="/images/login/image_2.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-56 bg-gray-100 border-2 border-[#5EA39E]">
                <img 
                  src="/images/login/image_3.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="rounded-[100px] overflow-hidden h-72 bg-gray-200">
                <img 
                  src="/images/login/image_4.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-68 bg-gray-200">
                <img 
                  src="/images/login/image_5.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-72 bg-gray-200">
                <img 
                  src="/images/login/image_6.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 pt-16">
              <div className="rounded-[100px] overflow-hidden h-56 bg-gray-200">
                <img 
                  src="/images/login/image_7.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-64 bg-gray-200">
                <img 
                  src="/images/login/image_8.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-100 border-2 border-[#5EA39E]">
                <img 
                  src="/images/login/image_9.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
