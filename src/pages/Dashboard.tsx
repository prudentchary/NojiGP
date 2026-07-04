import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { StatCard } from '@/components/common/StatCard';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import logo2 from '@/assets/logo2.png';
import {
  // SCRSTrendChart,
  // ScoreDriversBarChart,
  AlertTrendsChart,
  DonutChartSmall,
  SystemHealthChart,
} from '@/components/common/Charts';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLayoutContext } from '@/components/common/LayoutContext';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, fetchProfile } = useAuth(); 
  const { isGridLayout } = useLayoutContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch fresh user data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, fetchProfile]);

  // 2. Open modal only when we have the confirmed fresh data
  useEffect(() => {
    if (user?.isFirstLogin === true) {
      setIsModalOpen(true);
    }
  }, [user]); // Now this only runs when 'user' state is updated by fetchProfile

 
  return (
    <div className='flex flex-col w-full'>
      {/* Overview Header Section */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50'>
          Overview
        </h2>
        <button className='flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-50 shadow-sm'>
          Today
          <ChevronDown className='size-4' />
        </button>
      </div>

      {/* Top Section: Organization SCRS & Score Drivers */}
      <div className={cn('grid grid-cols-1 gap-8 mb-8', isGridLayout ? 'lg:grid-cols-2' : '')}>
        <div className='bg-white border border-slate-50 rounded-[20px] p-8 shadow-sm flex flex-col justify-between dark:bg-[#1F262E] dark:border-transparent dark:text-slate-50'>
          <h3 className='text-lg font-bold text-slate-900 mb-4 dark:text-slate-50'>Organization SCRS</h3>
          <div className='flex items-baseline gap-0.5 mb-4'>
             <span className='text-[48px] font-bold text-slate-900 leading-none dark:text-slate-50'>60</span>
             <span className='text-2xl font-bold text-slate-400 dark:text-slate-50'>%</span>
          </div>
          <div className='flex items-center justify-center py-2'>
            <DonutChartSmall data={[{ label: 'Healthy', value: 52.1, color: '#0D9488' }]} />
          </div>
        </div>

        <div className='bg-white border border-slate-50 rounded-[20px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent'>
          <h3 className='text-lg font-bold text-slate-900 mb-4 dark:text-slate-100 '>Score drivers</h3>
          {/* <ScoreDriversBarChart /> */}
        </div>
      </div>

      {/* SCRS Trend & Top Contributors */}
      <div className={cn('grid grid-cols-1 gap-8 mb-8 dark:bg-[#1F262E', isGridLayout ? 'lg:grid-cols-3' : '')}>
        <div className={cn('bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1f262E] dark:border-transparent', isGridLayout ? 'lg:col-span-2' : '')}>
          <div className='flex items-center justify-between mb-8 pb-4 border-b border-slate-50 '>
             <h3 className='text-[18px] font-bold text-slate-800 dark:text-slate-50'>SCRS Trend</h3>
             <button className='flex items-center gap-2 text-[14px] font-semibold text-slate-400'>
               Today <ChevronDown className='size-4' />
             </button>
          </div>
          <div className='h-[300px] w-full'>
            {/* <SCRSTrendChart /> */}
          </div>
        </div>

        <div className='bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1f262E] dark:border-transparent'>
          <h3 className='text-[18px] font-bold text-slate-800 mb-6 dark:text-slate-50'>Top contributors to SCRS</h3>
          {/* Map through top contributors here */}
        </div>
      </div>
      
    <div className='flex flex-col w-full'>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseButton
      >
        <div className='flex flex-col items-center text-center'>
          {/* Central Logo Container */}
          <div className='relative mb-8 mt-4'>
            <div className='size-[140px] rounded-full bg-slate-100 flex items-center justify-center p-6 shadow-inner ring-8 ring-slate-50 relative overflow-hidden group'>
              {/* Glass effect reflection */}
              <div className='absolute inset-x-0 -top-1/2 h-full bg-gradient-to-b from-white/10 to-transparent rotate-[30deg] pointer-events-none' />
              <img
                src={logo2}
                alt='Logo'
                className='w-20 h-auto relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-110'
              />
            </div>
          </div>

          <h2 className='text-[26px] font-bold text-slate-900 mb-3 tracking-tight'>
            Change Password
          </h2>

          <p className='text-[15px] leading-relaxed text-slate-500 max-w-[360px] mb-10'>
            Would you like to reset your password to something you can always
            remember?
          </p>

          <div className='w-full flex flex-col items-center gap-6'>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                navigate('/change-password');
              }}
              className='bg-slate-900 text-white hover:bg-slate-800 hover:cursor-pointer h-12 w-32 font-bold tracking-tight text-sm rounded-md'
            >
              Let's do it
            </Button>

            <button
              onClick={() => setIsModalOpen(false)}
              className='text-[15px] font-bold text-[#0D9488] hover:text-[#0C8075] transition-colors'
            >
              I will do this later
            </button>
          </div>
        </div>
      </Modal>

      {/* Overview Header Section */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50'>
          Overview
        </h2>
        <button className='flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-50 shadow-sm'>
          Today
          <ChevronDown className='size-4' />
        </button>
      </div>

      {/* Stats Grid -*/}
      <div
        className={cn(
          'grid grid-cols-1 gap-3 mb-3',
          isGridLayout ? 'lg:grid-cols-4' : 'lg:grid-cols-1',
        )}
      >
        {/* Left 3x2 Grid for Stat Cards */}
        <div
          className={cn(
            'grid grid-cols-1 gap-x-3 gap-y-2',
            isGridLayout
              ? 'lg:col-span-3 md:grid-cols-3'
              : 'sm:grid-cols-2 md:grid-cols-3',
          )}
        >
          <StatCard
            label='Total Alerts'
            value='7'
            percentage='+11.01%'
            variant='emerald'
          />
          <StatCard
            label='High severity incidents'
            value='7'
            percentage='+11.01%'
            variant='amber'
          />
          <StatCard
            label='Active threats'
            value='7'
            percentage='+11.01%'
            variant='rose'
          />
          <StatCard
            label='Users with elevated risk'
            value='7'
            percentage='+11.01%'
            variant='emerald'
          />
          <StatCard
            label='Policy violations'
            value='7'
            percentage='+11.01%'
            variant='default'
          />
          <StatCard
            label='Integration health'
            value='90%'
            percentage='+11.01%'
            variant='amber'
          />
        </div>

        {/* Right Tall Endpoint Health status card */}
        <div className='bg-[#F8FBFF]/50 border border-slate-50 rounded-[20px] p-8 flex flex-col justify-between h-auto shadow-sm'>
          <div className='flex flex-col gap-2'>
            <span className='text-[14.5px] font-semibold text-slate-800 tracking-tight'>
              Endpoint Health status
            </span>
            <div className='flex items-baseline gap-0.5'>
              <span className='text-[38px] font-bold text-slate-900 leading-none'>
                60
              </span>
              <span className='text-xl font-bold text-slate-400 opacity-60'>
                %
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center py-2'>
            <DonutChartSmall />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-slate-800 tracking-tight'>
          Alert trends
        </h2>
        <button className='flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors'>
          Today <ChevronDown className='size-4' />
        </button>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-8 mb-8',
          isGridLayout ? 'lg:grid-cols-3' : '',
        )}
      >
        {/* Alert Trends Container */}
        <div
          className={cn(
            'bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent',
            isGridLayout ? 'lg:col-span-2' : '',
          )}
        >
          <div className='flex items-center gap-10 mb-8 pb-4 border-b border-slate-50'>
            <button className='flex items-center gap-2 text-[15px] font-bold text-slate-800 hover:text-slate-900 transition-colors'>
              All levels <ChevronDown className='size-5 text-slate-300' />
            </button>

            <div className='h-6 w-[1px] bg-slate-100 ml-[-10px]' />

            <div className='flex items-center gap-8'>
              <div className='flex items-center gap-2.5'>
                <span className='size-2 rounded-full bg-slate-900' />
                <span className='text-[14px] font-semibold text-slate-400'>
                  Critical
                </span>
              </div>
              <div className='flex items-center gap-2.5'>
                <span className='size-2 rounded-full bg-[#89B3FF]' />
                <span className='text-[14px] font-semibold text-slate-400'>
                  High
                </span>
              </div>
              <div className='flex items-center gap-2.5'>
                <span className='size-2 rounded-full bg-[#FBBF24]' />
                <span className='text-[14px] font-semibold text-slate-400'>
                  Low
                </span>
              </div>
            </div>
          </div>

          <div className='h-[380px] w-full'>
            <AlertTrendsChart />
          </div>
        </div>

        {/* System Health Overview */}
        <div className='bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent'>
          <div className='flex items-center justify-between mb-10'>
            <h3 className='text-[18px] font-bold text-slate-800 tracking-tight'>
              System health overview
            </h3>
          </div>

          <SystemHealthChart />
        </div>
      </div>

      {/* Event Timeline (Placeholder Footer Section) */}
      <div
        className={cn(
          'grid grid-cols-1 gap-8',
          isGridLayout ? 'lg:grid-cols-3' : '',
        )}
      >
        <div
          className={cn(
            'bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm h-[200px] flex items-center justify-between dark:bg-[#1F262E] dark:border-transparent',
            isGridLayout ? 'lg:col-span-2' : '',
          )}
        >
          <h3 className='text-lg font-bold text-slate-900 dark:text-slate-50'>Event timeline</h3>
          <div className='flex items-center gap-6'>
            <button className='flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest'>
              Events by time |{' '}
              <span className='size-2 rounded-full bg-slate-900' /> Critical
            </button>
            <button className='flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2 rounded-lg'>
              Today <ChevronDown className='size-4' />
            </button>
          </div>
        </div>

        <div className='bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm h-[200px] flex items-center justify-between  dark:bg-[#1F262E] dark:border-transparent'>
          <h3 className='text-lg font-bold text-slate-900'>Events by status</h3>
          <button className='flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors'>
            Today <ChevronDown className='size-4' />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
