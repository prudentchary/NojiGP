import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useToast } from '@/components/ui/Toast';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PinInput } from '@/components/ui/PinInput';
import { cn } from '@/lib/cn';
import backgroundImage from '@/assets/login_bg.png';
import api from '@/lib/api';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; //zustand auth store
const OTPPage: React.FC = () => {
  const { login } = useAuth(); // Get the login function
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email || 'User';
  const { success, error: toastError } = useToast();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = (value: string) => {
    console.log('OTP Completed:', value);
  };




 const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/verify-otp', {
        email: userEmail,
        otp: otp,
      });

      const token = response.data.token || response.data.accessToken;
      
      if (token) {
        localStorage.setItem('auth_token', token);

        // --- CHANGE START ---
        // We make sure there is ALWAYS a name to show in the sidebar
        const userData = {
          email: userEmail,
          // If backend sends a name, use it. Otherwise, use the email as the name.
          name: response.data.user?.name || response.data.user?.fullName || userEmail,
          ...response.data.user, // spread any other data
        };

        login({
          ...userData,
          token,
        });
        // --- CHANGE END ---

        success('Verification successful! Welcome back.');
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Invalid OTP. Please check your email and try again.';
      setError(errorMsg);
      toastError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError(null);
  };

  return (
    <div
      className='min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='relative w-full max-w-[536px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500'>
        {/* Header */}
        <div className='flex justify-between items-center px-8 pt-8 pb-4'>
          <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
            Enter OTP
          </h1>
          <Link
            to='/login'
            className='text-slate-400 hover:text-slate-600 transition-colors p-1'
          >
            <X className='size-5' />
          </Link>
        </div>

        {/* Body */}
        <div className='px-8 pb-10'>
          <p className='text-[14px] leading-relaxed text-slate-400 mb-8 whitespace-pre-line'>
            A 6 digit OTP has been sent to{' '}
            <span className='font-bold text-slate-500'>{userEmail}</span>
            {'\n'}
            Kindly enter the code to continue.
          </p>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex justify-center'>
              <PinInput
                length={6}
                value={otp}
                onChange={handleOtpChange}
                onComplete={handleComplete}
                error={error}
                className='gap-3 sm:gap-4'
                inputClassName='w-[62px] h-[52px] rounded-[8px] text-lg sm:w-[58px]'
              />
            </div>

            <div className='flex justify-between items-center px-0.5'>
              <span
              
                className={cn(
                  'text-[13px] font-medium tracking-tight transition-colors duration-200',
                  error ? 'text-rose-500' : 'text-slate-400',
                )}
              >
                {error || 'This is a hint text.'}
              </span>
              <span
                className={cn(
                  'text-[13px] font-medium transition-colors duration-200',
                  error ? 'text-rose-500' : 'text-slate-400',
                )}
              >
                Expires in:{' '}
                <span
                  className={cn(
                    'font-bold transition-colors duration-200',
                    error ? 'text-rose-500' : 'text-slate-900',
                  )}
                >
                  {formatTime(timeLeft)}
                </span>
              </span>
            </div>

            <div className='pt-2'>
              <Button
                type='submit'
                colorScheme='slate'
                size='lg'
                fullWidth
                isLoading={loading}
                disabled={otp.length !== 6 || loading}
                className={cn(
                  'h-12 font-bold tracking-widest uppercase border-none transition-all duration-300 rounded-[4px]',
                  otp.length === 6 && !loading
                    ? 'bg-slate-900 text-white hover:bg-slate-800 active:bg-black cursor-pointer'
                    : 'bg-[#E2E8F0] text-slate-400 pointer-events-none',
                )}
              >
                Submit
              </Button>
            </div>

            <div className='flex justify-center pt-2'>
              <button
                type='button'
                onClick={() =>
                  success('Verification code resent to your email!')
                }
                className='text-[15px] font-bold text-[#0D9488] hover:text-[#0C8075] transition-colors duration-200'
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
