import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ForgotPasswordView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage('If an account exists with this email, you will receive a password reset code.');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-btn-primary hover:text-[#0d655d] font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#282828] text-center mb-3">
            Forget Password
          </h1>
          <p className="text-[#666666] text-sm text-center">
            Enter the email address or mobile phone number associated with your Clicon account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Success Message */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-[#282828] font-medium mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-btn-primary focus:border-transparent transition-all text-sm text-gray-700"
              required
            />
          </div>

          {/* Send Code Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-btn-primary hover:bg-[#0d655d] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
          >
            {loading ? 'SENDING...' : 'SEND CODE'}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Sign In Link */}
          {/* <div className="text-center pt-2">
            <p className="text-sm text-[#666666]">
              Already have account?{' '}
              <Link to="/signin" className="text-btn-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div> */}

          {/* Sign Up Link */}
          {/* <div className="text-center">
            <p className="text-sm text-[#666666]">
              Don't have account?{' '}
              <Link to="/register" className="text-btn-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div> */}

          {/* Customer Service */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-[#666666]">
              You may contact{' '}
              <a href="#" className="text-btn-primary font-medium hover:underline">
                Customer Service
              </a>{' '}
              for help restoring access to your account.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
