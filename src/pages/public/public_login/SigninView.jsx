import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth, ROLES } from '../../../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

const LoginView = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Role-based login
    const result = login(formData.email, formData.password);
    
    setTimeout(() => {
      setLoading(false);
      if (result.success) {
        // Redirect based on role
        switch (result.role) {
          case ROLES.ADMIN:
            navigate('/admin');
            break;
          case ROLES.PROVIDER:
            navigate('/provider');
            break;
          case ROLES.COACH:
            navigate('/coach');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.message);
      }
    }, 500); 
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-secondary">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-4">
              <Link to="/" className="inline-flex items-center text-sm gap-1 text-btn-primary hover:text-[#0d655d] font-medium">
                <FaArrowLeft /> Back to Home
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#282828] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#363636] text-sm md:text-base">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-2">Demo Credentials (Password: demo123)</p>
              <div className="space-y-1 text-xs">
                <p><strong>Admin:</strong> admin@essahub.com</p>
                <p><strong>Provider:</strong> provider@essahub.com</p>
                <p><strong>Coach:</strong> coach@essahub.com</p>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#282828] font-medium mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@essahub.com"
                className="w-full px-4 py-3 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#282828] font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="•••• •••• ••••"
                  className="w-full px-4 py-3 pr-12 bg-loginInput rounded-lg outline-none focus:ring-2 focus:ring-btn-primary transition-all text-sm text-gray-700 placeholder-[#747474]"
                  required
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
              <div className="mt-2 text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-btn-primary hover:text-[#0d655d] font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-btn-primary hover:bg-[#0d655d] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Create Account Section */}
            <div className="text-center pt-4">
              <p className="text-sm text-[#363636] mb-3">Don't have account</p>
              <Link
                to="/signup"
                className="block w-full border-2 border-btn-primary text-btn-primary hover:bg-btn-primary hover:text-white py-3 rounded-lg font-medium transition-all"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image Grid */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-6 relative overflow-hidden">
        <div className="relative w-full max-w-2xl h-full">
          {/* Image Grid Pattern */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-200 ">
                <img 
                  src="/images/login/image_1.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-64 bg-gray-200">
                <img 
                  src="/public/images/login/image_2.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-56 bg-gray-100 border-2 border-[#5EA39E]">
                <img 
                  src="/public/images/login/image_3.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="rounded-[100px] overflow-hidden h-72 bg-gray-200">
                <img 
                  src="/public/images/login/image_4.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-68 bg-gray-200">
                <img 
                  src="/public/images/login/image_5.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-72 bg-gray-200">
                <img 
                  src="/public/images/login/image_6.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 pt-16">
              <div className="rounded-[100px] overflow-hidden h-56 bg-gray-200">
                <img 
                  src="/public/images/login/image_7.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-64 bg-gray-200">
                <img 
                  src="/public/images/login/image_8.jpg" 
                  alt="Player" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[100px] overflow-hidden h-84 bg-gray-100 border-2 border-[#5EA39E]">
                <img 
                  src="/public/images/login/image_9.jpg" 
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

export default LoginView;
