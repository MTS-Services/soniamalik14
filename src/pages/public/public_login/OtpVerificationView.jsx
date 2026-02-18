import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { POST } from '../../../services/httpMethods';
import { ENDPOINT } from '../../../services/httpEndpoint';
import { toast } from 'react-toastify';

const OtpVerificationView = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 5) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const lastIndex = Math.min(digits.length, 4);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join('');
    if (otpValue.length !== 5) {
      setError('Please enter all 5 digits');
      return;
    }

    setLoading(true);
    setError('');

    (async () => {
      try {
        const email = localStorage.getItem('forgot_email');
        const body = { code: otpValue };
        if (email) body.email = email;
        const res = await POST(ENDPOINT.AUTH.VERIFY_OTP, body);
        const payload = res?.data ?? res;
        const msg = payload?.message || 'OTP verified';
        setLoading(false);
        toast.success(msg);
        navigate('/reset-password');
      } catch (err) {
        setLoading(false);
        const message = err?.response?.data?.message || err?.message || 'OTP verification failed';
        setError(message);
        toast.error(message);
      }
    })();
  };

  const handleResend = () => {
    setResendMessage('Code resent successfully!');
    setTimeout(() => {
      setResendMessage('');
    }, 3000);
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
            OTP Verification
          </h1>
          <p className="text-[#666666] text-sm text-center">
            Enter the verification code we just sent to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {resendMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
              {resendMessage}
            </div>
          )}

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-xl font-semibold bg-white border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-btn-primary focus:border-btn-primary transition-all text-gray-700"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-btn-primary hover:bg-[#0d655d] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          {/* Resend Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-[#666666]">
              Didn't receive a code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-btn-primary font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationView;
