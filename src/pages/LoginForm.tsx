import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate, Link } from 'react-router';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/cn';
import backgroundImage from '@/assets/login_bg.png';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

const EyeIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
    />
    <circle cx='12' cy='12.5' r='2' fill='currentColor' />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      className='opacity-40'
    />
    <circle cx='12' cy='12.5' r='2' fill='currentColor' />
    <path
      d='M3 3L21 21'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuth((state) => state.login); // calling auth function to set the user as logged in
  const { success, error: toastError } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');
  const isFormFilled = emailValue.length > 0 && passwordValue.length > 0;

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setServerError(null);
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      console.log('Login API Response:', response.data);

      success('OTP sent! Please check your email.');

     // 3. Navigate to the OTP page
     
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err: any) {
      console.log('FULL ERROR:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        'Incorrect password and email combination';

      toastError(errorMessage);
      setServerError(errorMessage);

      setError('password', { type: 'manual', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className='min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Semi-transparent overlay to match the image depth if needed, but the image is already dark */}
      {/* <div className="absolute inset-0 bg-black/20 pointer-events-none" /> */}

      <div className='relative w-full max-w-[520px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500'>
        {/* Header */}
        <div className='flex justify-between items-center px-8 pt-8 pb-4'>
          <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
            Login To Your Account
          </h1>
          <Link
            to='/'
            className='text-slate-400 hover:text-slate-600 transition-colors p-1'
          >
            <X className='size-5' />
          </Link>
        </div>

        {/* Form Body */}
        <div className='px-8 pb-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5'>
              {/* Email Field */}
              <div className='space-y-2'>
                <Input
                  id='email'
                  label='Email address'
                  type='email'
                  placeholder='Enter email'
                  variant='filled'
                  {...register('email', {
                    onChange: () => clearErrors(['email', 'password']),
                  })}
                  error={errors.email?.message}
                  helperText='Only official email address'
                  className='h-11 rounded-md'
                  containerClassName='gap-1'
                />
              </div>

              {/* Password Field */}
              <div className='space-y-2 text-left'>
                <Input
                  id='password'
                  label='Your password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='************'
                  variant='filled'
                  {...register('password', {
                    onChange: () => clearErrors(['email', 'password']),
                  })}
                  error={errors.password?.message}
                  className='h-11 rounded-md'
                  containerClassName='gap-1'
                  rightElement={
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className='text-slate-400 hover:text-slate-600 transition-all duration-200 outline-none focus:ring-0 py-2'
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  }
                />

                <div className='flex justify-end pt-1'>
                  <Link
                    to='/forgot-password'
                    className='text-sm font-bold text-[#0D9488] hover:text-[#0C8075] transition-colors duration-200'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            {/* {serverError && (
                            <div className="bg-rose-50 text-rose-600 text-[13px] font-semibold px-4 py-3 rounded-md border border-rose-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                {serverError}
                            </div>
                        )} */}

            <Button
              type='submit'
              colorScheme='slate'
              size='lg'
              fullWidth
              isLoading={loading}
              className={cn(
                'h-12 mt-4 font-bold tracking-widest uppercase border-none transition-all duration-300 rounded-[4px]',
                isFormFilled
                  ? 'bg-slate-900 text-white hover:bg-slate-800 active:bg-black cursor-pointer'
                  : 'bg-[#E2E8F0] text-slate-400 cursor-not-allowed pointer-events-none',
              )}
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
