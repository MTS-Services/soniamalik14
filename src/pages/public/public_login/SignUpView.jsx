
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Eye, EyeOff } from 'lucide-react';
import { POST } from '../../../services/httpMethods';
import { ENDPOINT } from '../../../services/httpEndpoint';
import { toast } from 'react-toastify';

const RegisterView = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('User'); 
  const [formData, setFormData] = useState({
    // Shared fields
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    interestedIn: [],
    // User specific
    username: '',
    fullName: '',
    abilityLevel: 'Beginner',
    location: '',
    // Club Owner specific
    clubName: '',
    founded: '',
    about: '',
    clubLocation: '',
    totalMembers: '',
    activePlayers: '',
    coaches: '',
    teams: '',
    groundName: '',
    groundLocation: '',
    ownerFullName: '',
    // Service Provider specific
    businessName: '',
    clinicAddress: '',
    serviceArea: '',
    workingDays: '',
    workingHours: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const sports = ['Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis'];

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setErrors({});
  };

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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const renderUserInput = (label, name, placeholder, type = "text") => (
    <div className="flex-1">
      <label className="block text-[#282828] font-medium mb-2 text-base md:text-base">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-base text-gray-700 placeholder-[#747474]"
      />
    </div>
  );

  const validate = () => {
    const err = {};
    if (role === 'User') {
      if (!formData.username || !formData.username.trim()) err.username = 'Username is required';
      if (!formData.fullName || !formData.fullName.trim()) err.fullName = 'Full name is required';
      if (!formData.email || !formData.email.trim()) err.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Email is invalid';
      if (!formData.password) err.password = 'Password is required';
    }
    if (role === 'Club Owner') {
      if (!formData.clubName || !formData.clubName.trim()) err.clubName = 'Club name is required';
      if (!formData.ownerFullName || !formData.ownerFullName.trim()) err.ownerFullName = 'Owner full name is required';
      if (!formData.email || !formData.email.trim()) err.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Email is invalid';
      if (!formData.password) err.password = 'Password is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.debug('[RegisterView] handleSubmit clicked', { role, formData });
    if (!validate()) {
      toast.error('Please fix the highlighted fields');
      console.debug('[RegisterView] validation failed', errors);
      return;
    }
    setLoading(true);
    try {
      let payload = {};
      if (role === 'User') {
        payload = {
          email: formData.email,
          password: formData.password,
          name: formData.fullName || formData.username,
          role: 'USER',
        };
      } else if (role === 'Club Owner') {
        payload = {
          email: formData.email,
          password: formData.password,
          name: formData.ownerFullName,
          role: 'CLUB_OWNER',
          clubName: formData.clubName,
        };
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
          name: formData.fullName || formData.username || formData.ownerFullName || formData.businessName,
          role: 'USER',
        };
      }

      const res = await POST(ENDPOINT.AUTH.REGISTER, payload);
      const body = res?.data || res;
      toast.success(body?.message || 'Registered successfully. Check email for code.');
      try { localStorage.setItem('register_email', payload.email); } catch (e) { }
      navigate('/verify-email');
    } catch (err) {
      const resp = err?.response?.data;
      const message = resp?.message || err.message || 'Registration failed';
      // eslint-disable-next-line no-console
      console.error('[RegisterView] register error', err);
      toast.error(message);
      if (Array.isArray(resp?.errors)) {
        const serverErrors = {};
        resp.errors.forEach((e) => { if (e.param) serverErrors[e.param] = e.msg || e.message; });
        setErrors((p) => ({ ...p, ...serverErrors }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-secondary overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-base gap-1 text-btn-primary font-medium mb-4">
              <FaArrowLeft /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-[#282828]">Create Account</h1>
            <p className="text-[#363636] text-base">Join the ESSA community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block text-[#282828] font-medium mb-2">I am a</label>
              <select
                value={role}
                onChange={handleRoleChange}
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary appearance-none cursor-pointer text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23363636'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25em 1.25em',
                }}
              >
                <option value="User">User</option>
                <option value="Club Owner">Club Owner</option>
                <option value="Service Provider">Service Provider</option>
              </select>
            </div>

            {/* CONDITIONAL FIELDS BASED ON ROLE */}
            {role === 'User' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {renderUserInput("Username", "username", "john doe")}
                  {renderUserInput("Full Name", "fullName", "Player")}
                </div>
                {renderUserInput("Email", "email", "enter your email", "email")}
                {renderUserInput("Phone Number", "phoneNumber", "enter your phone number", "tel")}
                <div>
                  <label className="block text-[#282828] font-medium mb-2">Ability Level</label>
                  <select name="abilityLevel" value={formData.abilityLevel} onChange={handleChange} className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary appearance-none cursor-pointer text-base"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23363636'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25em 1.25em',
                    }}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                {renderUserInput("Location/Postcode", "location", "e.g. London, SW1")}
                {/* Sports Selection for User */}
                <div>
                  <label className="block text-[#282828] font-medium mb-2">Interested In</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sports.map((sport) => (
                      <label key={sport} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" value={sport} checked={formData.interestedIn.includes(sport)} onChange={handleChange} className="accent-btn-primary" />
                        <span className="text-base">{sport}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === 'Club Owner' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {renderUserInput("Club Name", "clubName", "Woking Warriors FC")}
                  {renderUserInput("Founded", "founded", "2018")}
                </div>
                <div>
                  <label className="block text-[#282828] font-medium mb-2">About</label>
                  <textarea name="about" placeholder="Write a about of this club" className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none h-32 text-base" onChange={handleChange} />
                </div>
                {renderUserInput("Location", "clubLocation", "2118 Thornridge Cir. Syracuse, Connecticut 35624")}
                <div className="grid grid-cols-2 gap-4">
                  {renderUserInput("Total Members", "totalMembers", "128")}
                  {renderUserInput("Active Players:", "activePlayers", "96")}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {renderUserInput("Coaches", "coaches", "8")}
                  {renderUserInput("Teams", "teams", "6")}
                </div>
                {/* Club Owner Shared Game Selector */}
                <div>
                  <label className="block text-[#282828] font-medium mb-2">Club Game</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sports.map((sport) => (
                      <label key={sport} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" value={sport} checked={formData.interestedIn.includes(sport)} onChange={handleChange} className="accent-btn-primary" />
                        <span className="text-base">{sport}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {renderUserInput("Ground Name", "groundName", "Royal Sports Arena")}
                {renderUserInput("Ground Location", "groundLocation", "45 Kingsway Road, London, UK")}
                <div className="pt-4 border-t border-gray-300"><h3 className="font-bold mb-4">Club Owner Details</h3></div>
              </>
            )}

            {role === 'Service Provider' && (
              <>
                {renderUserInput("Business Name", "businessName", "Woking Warriors FC")}
                <div>
                  <label className="block text-[#282828] font-medium mb-2">About</label>
                  <textarea name="about" placeholder="Write a about of this club" className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none h-32 text-base" onChange={handleChange} />
                </div>
                {renderUserInput("Clinic Address", "clinicAddress", "2118 Thornridge Cir. Syracuse, Connecticut 35624")}
                {renderUserInput("Service Area", "serviceArea", "2118 Thornridge Cir. Syracuse, Connecticut 35624")}
                <div className="grid grid-cols-2 gap-4">
                  {renderUserInput("Working Days", "workingDays", "Monday - Saturday")}
                  {renderUserInput("Working Hours", "workingHours", "9:00 am - 8:00Pm")}
                </div>
                <div className="pt-4 border-t border-gray-300"><h3 className="font-bold mb-4">Service Owner Details</h3></div>
              </>
            )}

            {/* Shared Owner Fields (for Club & Service) */}
            {(role === 'Club Owner' || role === 'Service Provider') && (
              <>
                {renderUserInput("Full Name", "ownerFullName", "Enter Your Full Name")}
                {renderUserInput("Email", "email", "Write your email", "email")}
                {renderUserInput("Phone Number", "phoneNumber", "enter your phone number", "tel")}
              </>
            )}

            {/* Shared Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[#282828] font-medium mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="... ... ..." value={formData.password} className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none text-base" onChange={handleChange} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[#282828] font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="... ... ... ..." value={formData.confirmPassword} className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none text-base" onChange={handleChange} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-btn-primary text-white py-3 rounded-lg font-bold hover:bg-[#0d655d] transition-colors">
              Create Account
            </button>
            <p className="text-center text-base">
              Already have an account? <Link to="/signin" className="text-btn-primary font-bold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image Grid (Remains the same as original) */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-6 sticky top-0 h-screen overflow-hidden">
        {/* ... original image grid code ... */}
        <div className="relative w-full max-w-2xl h-full">
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-200"><img src="/images/login/image_1.jpg" alt="Player" className="w-full h-full object-cover" /></div>
              <div className="rounded-[100px] overflow-hidden h-64 bg-gray-200"><img src="/images/login/image_2.jpg" alt="Player" className="w-full h-full object-cover" /></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-[100px] overflow-hidden h-72 bg-gray-200"><img src="/images/login/image_4.jpg" alt="Player" className="w-full h-full object-cover" /></div>
              <div className="rounded-[100px] overflow-hidden h-68 bg-gray-200"><img src="/images/login/image_5.jpg" alt="Player" className="w-full h-full object-cover" /></div>
            </div>
            <div className="flex flex-col gap-4 pt-16">
              <div className="rounded-[100px] overflow-hidden h-56 bg-gray-200"><img src="/images/login/image_7.jpg" alt="Player" className="w-full h-full object-cover" /></div>
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-100 border-2 border-[#5EA39E]"><img src="/images/login/image_9.jpg" alt="Player" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;