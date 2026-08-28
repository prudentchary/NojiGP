import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { StatCard } from "@/components/common/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import logo2 from "@/assets/logo2.png";
import { ScoreDriversBarChart } from "@/components/common/ScoreDriversBarChart";
import { SCRSTrendChart } from "@/components/common/SCRSTrendChart";
import { TopContributors } from "@/components/common/TopContributors";
import { PolicyViolationChart } from "@/components/common/PolicyViolationChart";
import { DateRangeDropdown } from "@/components/common/DateRangeDropdown";
import { filterByDateRange } from "@/lib/dashboardFilters";
import {
  scoreDrivers,
  scrsTrendData,
  policyViolationData,
  topContributors,
  dashboardStats,
} from "@/mocks/dashboardMocks"; // Changed "dashboardMocks" -> "dashboardMock" if file is singular
import { DonutChartSmall, SystemHealthChart } from "@/components/common/Charts";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLayoutContext } from "@/components/common/LayoutContext";
import { useAuth } from "@/hooks/useAuth";
import { DashboardDateRange } from "@/types/dashboard";



const Dashboard: React.FC = () => {
  const { user, isAuthenticated, fetchProfile } = useAuth((state) => state);
  const { isGridLayout } = useLayoutContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Fetch fresh user data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, fetchProfile]);

  // Open modal only when we have the confirmed fresh data
  useEffect(() => {
    if (user?.isFirstLogin === true) {
      setIsModalOpen(true);
    }
  }, [user]);
  //modal ends

  //dashboard date range states

  const [overviewRange, setOverviewRange] =
    useState<DashboardDateRange>("today");

  const [scrsTrendRange, setScrsTrendRange] =
    useState<DashboardDateRange>("today");

  const [otherDataRange, setOtherDataRange] =
    useState<DashboardDateRange>("today");

  // Filtered data/charts based on selected date ranges

  const filteredScoreDrivers = filterByDateRange(scoreDrivers, overviewRange);

 const filteredSCRSTrend = filterByDateRange(
  scrsTrendData,
  scrsTrendRange
);

  const filteredTopContributors = filterByDateRange(
    topContributors,
    scrsTrendRange,
  );

  const filteredPolicyViolations = filterByDateRange(
    policyViolationData,
    otherDataRange,
  );
  const filteredDashboardStats = filterByDateRange(
    dashboardStats,
    otherDataRange,
  );

  return (
    <div className="flex flex-col w-full">
      {/* Overview Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50">
          Overview
        </h2>
        <DateRangeDropdown value={overviewRange} onChange={setOverviewRange} />
      </div>

      {/* Top Section: Organization SCRS & Score Drivers */}
      <div
        className={cn(
          "grid grid-cols-1 gap-8 mb-8",
          isGridLayout ? "lg:grid-cols-12" : "",
        )}
      >
        <div className="lg:col-span-4 h-[267px] bg-white border border-slate-50 rounded-[20px] p-4 shadow-sm flex flex-col dark:bg-[#1F262E] dark:border-transparent">
          <h6 className="text-lg font-bold text-slate-900 mb-2 dark:text-slate-50">
            Organization SCRS
          </h6>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[30px] font-bold text-slate-900 leading-none dark:text-slate-50">
              40
            </span>
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-50">
              %
            </span>
          </div>
          <div className="flex items-center justify-center py-2">
            <DonutChartSmall percentage={40} />
          </div>
          <div className="mt-4 flex items-center justify-center gap-16 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
              <span className="text-slate-400 dark:text-slate-400">
                Healthy
              </span>
            </div>
            <span className="text-slate-300 font-medium">52.1%</span>
          </div>
        </div>

        <div className="lg:col-span-8 h-[267px] bg-white border border-slate-50 rounded-[20px] p-4 shadow-sm dark:bg-[#1F262E] dark:border-transparent">
          <h3 className="text-lg font-bold text-slate-900 mb-4 dark:text-slate-100">
            Score drivers
          </h3>
          <ScoreDriversBarChart data={filteredScoreDrivers} />
        </div>
      </div>

      {/* SCRS Trend & Top Contributors */}

      <div className="flex items-center justify-between mb-8 mt-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50">
          SCRS Trend
        </h2>
        <DateRangeDropdown
          value={scrsTrendRange}
          onChange={setScrsTrendRange}
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-8 mb-8",
          isGridLayout ? "lg:grid-cols-3" : "",
        )}
      >
        <div
          className={cn(
            "bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1f262E] dark:border-transparent",
            isGridLayout ? "lg:col-span-2" : "",
          )}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF365E]" />
                <span className="text-slate-300">Critical</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                <span className="text-slate-300">Normal</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-slate-300">High</span>
              </div>
            </div>
          </div>
          <div className="h-[330px] w-full">
            <SCRSTrendChart data={filteredSCRSTrend} />
          </div>
        </div>

        <div className="bg-white border border-slate-50 rounded-[24px] shadow-sm overflow-hidden dark:bg-[#000000] dark:border-transparent">
          {/* Header */}
          <div className="bg-slate-100 dark:bg-[#313740] px-6 py-5">
            <h3 className="text-[18px] font-bold text-slate-800 dark:text-slate-50">
              Top contributors to SCRS
            </h3>
          </div>
          <div className="px-6 py-2">
            <TopContributors contributors={filteredTopContributors} />
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseButton
        className="dark:bg-[#1F262E]"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8 mt-4">
            <div className="size-[140px] rounded-full bg-slate-100 flex items-center justify-center p-6 shadow-inner ring-8 ring-slate-50 relative overflow-hidden group">
              <div className="absolute inset-x-0 -top-1/2 h-full bg-gradient-to-b from-white/10 to-transparent rotate-[30deg] pointer-events-none" />
              <img
                src={logo2}
                alt="Logo"
                className="w-20 h-auto relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight dark:text-slate-100">
            Change Password
          </h2>

          <p className="text-[15px] leading-relaxed text-slate-600 max-w-[360px] mb-10 dark:text-slate-300">
            Would you like to reset your password to something you can always
            remember?
          </p>

          <div className="w-full flex flex-col items-center gap-6">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                navigate("/change-password");
              }}
              colorScheme="gradient"
              size="lg"
              className="h-12 w-44 font-bold tracking-widest uppercase border-none transition-all duration-300 rounded-[4px]"
            >
              Let's do it
            </Button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="text-[15px] font-bold text-[#0D9488] hover:text-[#0C8075] transition-colors duration-200 dark:text-[#00f3f9] outline-none focus:ring-0"
            >
              I will do this later
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center justify-between mb-4 mt-8">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50">
          Other relevant data
        </h2>
        <DateRangeDropdown
          value={otherDataRange}
          onChange={setOtherDataRange}
        />
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-8 mb-8",
          isGridLayout ? "lg:grid-cols-3" : "",
        )}
      >
        <div
          className={cn(
            "bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent",
            isGridLayout ? "lg:col-span-2" : "",
          )}
        >
          <div className="flex items-center gap-10 mb-8 pb-4 border-b border-slate-50">
            <h5 className="flex items-center gap-2 text-[15px] font-bold text-slate-800 hover:text-slate-900 transition-colors dark:text-slate-100 dark:hover:text-slate-500">
              Policy Violations
            </h5>
            <div className="h-6 w-[1px] bg-slate-100 ml-[-10px]" />
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFFFFF]" />
                <span className="text-xs text-slate-300">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8FA9D9]" />
                <span className="text-xs text-slate-300">High</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4C400]" />
                <span className="text-xs text-slate-300">Low</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <PolicyViolationChart data={filteredPolicyViolations} />
          </div>
        </div>

        <div className="bg-white border h-[] border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[18px] font-bold text-slate-800 tracking-tight dark:text-slate-100">
              System health overview
            </h3>
          </div>
          <SystemHealthChart />
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className={cn(
          "grid grid-cols-1 gap-3 mb-3",
          isGridLayout ? "lg:grid-cols-4" : "lg:grid-cols-1",
        )}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-x-3 gap-y-2",
            isGridLayout
              ? "lg:col-span-3 md:grid-cols-3"
              : "sm:grid-cols-2 md:grid-cols-3",
          )}
        >
          {filteredDashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
         
        </div>

        <div className="bg-[#F8FBFF]/50 border border-slate-50 rounded-[20px] p-8 flex flex-col justify-between h-auto shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-[14.5px] font-semibold text-slate-800 tracking-tight">
              Endpoint Health status
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[38px] font-bold text-slate-900 leading-none">
                30
              </span>
              <span className="text-xl font-bold text-slate-400 opacity-60">
                %
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center py-2">
            <DonutChartSmall percentage={30} />
          </div>
        </div>
      </div>

      {/* Other Relevant Data Section */}

      {/* Event Timeline Footer Section */}
      {/* <div
        className={cn(
          "grid grid-cols-1 gap-8",
          isGridLayout ? "lg:grid-cols-3" : "",
        )}
      >
        <div
          className={cn(
            "bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm h-[200px] flex items-center justify-between dark:bg-[#1F262E] dark:border-transparent",
            isGridLayout ? "lg:col-span-2" : "",
          )}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Event timeline
          </h3>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Events by time |{" "}
              <span className="size-2 rounded-full bg-slate-900" /> Critical
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2 rounded-lg">
              Today <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm h-[200px] flex items-center justify-between dark:bg-[#1F262E] dark:border-transparent">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Events by status
          </h3>
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            Today <ChevronDown className="size-4" />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
