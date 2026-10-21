import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { StatCard } from "@/components/common/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import logo2 from "@/assets/logo2.png";
import { ScoreDriversBarChart } from "@/components/common/ScoreDriversBarChart";
import { SCRSTrendChart } from "@/components/common/SCRSTrendChart";
import { TopContributors } from "@/components/common/TopContributors";
import PolicyViolationChart, {
  PolicyViolationTrend,
} from "@/components/common/PolicyViolationChart";
import { TimeFilterDropdown } from "@/components/common/TimeFilterDropdown";
import { DonutChartSmall, SystemHealthChart } from "@/components/common/Charts";
import { filterByDateRange } from "@/lib/dashboardFilters";
import { cn } from "@/lib/cn";
import { useLayoutContext } from "@/components/common/LayoutContext";
import { useAuth } from "@/hooks/useAuth";
import { dashboardService } from "@/services/dashboard.service";

// Fallback Mock Data for charts that don't have endpoints yet
import {
  scoreDrivers,
  scrsTrendData,
  // policyViolationData,
  topContributors,
} from "@/mocks/dashboardMocks";

/**
 * Transforms the raw API response from GET /dashboard/violations 
 * into the shape expected by PolicyViolationChart.
 */
export const mapViolationsToTrendData = (apiResponse: any): PolicyViolationTrend[] => {
  if (!apiResponse) return [];

  if (Array.isArray(apiResponse.timeline) && apiResponse.timeline.length > 0) {
    return apiResponse.timeline.map((item: any) => ({
      // Format ISO timestamp -> "23:41"
      month: new Date(item.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      // Use LOWERCASE keys matching PolicyViolationTrend & Recharts dataKey props!
      critical: item.count ?? 0,
      high: 0,
      low: 0,
    }));
  }

  return [];
};

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, fetchProfile } = useAuth((state) => state);
  const { isGridLayout } = useLayoutContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                DATE RANGES                                 */
  /* -------------------------------------------------------------------------- */
  // Use generic string or TimeRange type matching backend window parameters ("15m" | "1h" | "24h" | "7d" | "30d")
  const [overviewRange, setOverviewRange] = useState<string>("24h");
  const [scrsTrendRange, setScrsTrendRange] = useState<string>("24h");
  const [otherDataRange, setOtherDataRange] = useState<string>("24h");

  /* -------------------------------------------------------------------------- */
  /*                              LIVE API STATES                               */
  /* -------------------------------------------------------------------------- */
  const [summaryData, setSummaryData] = useState<any>(null);
  const [apiViolations, setApiViolations] = useState<any>(null);
  const [isOverviewLoading, setIsOverviewLoading] = useState<boolean>(false);
  const [isViolationsLoading, setIsViolationsLoading] = useState<boolean>(false);

  /* -------------------------------------------------------------------------- */
  /*                           AUTH & USER CHECKS                               */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated, fetchProfile]);

  useEffect(() => {
    if (user?.isFirstLogin === true) setIsModalOpen(true);
  }, [user]);

  /* -------------------------------------------------------------------------- */
  /* 1. OVERVIEW SECTION: Summary Metrics & Score Drivers                       */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      setIsOverviewLoading(true);
      try {
        const summaryRes = await dashboardService.getSummary(overviewRange);
        if (isMounted) setSummaryData(summaryRes);
      } catch (err) {
        console.error("Error fetching overview summary:", err);
      } finally {
        if (isMounted) setIsOverviewLoading(false);
      }
    };

    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, [overviewRange]);

  /* -------------------------------------------------------------------------- */
  /* 2. SCRS TREND SECTION: SCRS Trend Chart & Top Contributors                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    // When the backend provides a dedicated trend endpoint, trigger it here using `scrsTrendRange`.
  }, [scrsTrendRange]);

  /* -------------------------------------------------------------------------- */
  /* 3. OTHER RELEVANT DATA SECTION: Policy Violations, Stats & Endpoint Health */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    let isMounted = true;
    const fetchViolations = async () => {
      setIsViolationsLoading(true);
      try {
        const violationsRes = await dashboardService.getViolations(otherDataRange);
        if (isMounted) setApiViolations(violationsRes);
      } catch (err) {
        console.error("Error fetching policy violations:", err);
      } finally {
        if (isMounted) setIsViolationsLoading(false);
      }
    };

    fetchViolations();
    return () => {
      isMounted = false;
    };
  }, [otherDataRange]);

  // Derived live metrics from /dashboard/summary response
  const scrsScore = summaryData?.endpoint_health_percent ?? 0;
  const endpointHealthPercent = summaryData?.endpoint_health_percent ?? 0;

  // Map real summary metrics to StatCards dynamically
  const liveDashboardStats = useMemo(() => {
    if (!summaryData) return [];
    return [
      { label: "Total Alerts", value: summaryData.total_alerts_24h, change: "+0%", trend: "neutral" },
      { label: "High Severity Incidents", value: summaryData.high_severity_incidents, change: "+0%", trend: "neutral" },
      { label: "Active Threats", value: summaryData.active_threats, change: "+0%", trend: "neutral" },
      { label: "Elevated Risk Users", value: summaryData.users_elevated_risk, change: "+0%", trend: "neutral" },
      { label: "Policy Violations", value: summaryData.policy_violations_24h, change: "+0%", trend: "neutral" },
      { label: "Integration Health", value: `${summaryData.integration_health_percent}%`, change: "0%", trend: "up" },
    ];
  }, [summaryData]);

  // Filtered mock charts for items without endpoints yet
  const filteredScoreDrivers = filterByDateRange(scoreDrivers, overviewRange);
  const filteredSCRSTrend = filterByDateRange(scrsTrendData, scrsTrendRange);
  const filteredTopContributors = filterByDateRange(topContributors, scrsTrendRange);

  // Transform the raw API violations timeline data for PolicyViolationChart
  const displayedViolations = useMemo<PolicyViolationTrend[]>(() => {
    return mapViolationsToTrendData(apiViolations);
  }, [apiViolations]);

  return (
    <div className="flex flex-col w-full">
      {/* Overview Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50">
          Overview {isOverviewLoading && <span className="text-xs font-normal text-slate-400 ml-2">(Refreshing...)</span>}
        </h2>
        <TimeFilterDropdown timeRange={overviewRange} onSelectTime={setOverviewRange} />
      </div>

      {/* Top Section: Organization SCRS & Score Drivers */}
      <div className={cn("grid grid-cols-1 gap-8 mb-8", isGridLayout ? "lg:grid-cols-12" : "")}>
        <div className="lg:col-span-4 h-[267px] bg-white border border-slate-50 rounded-[20px] p-4 shadow-sm flex flex-col dark:bg-[#1F262E] dark:border-transparent">
          <h6 className="text-lg font-bold text-slate-900 mb-2 dark:text-slate-50">
            Organization SCRS
          </h6>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[30px] font-bold text-slate-900 leading-none dark:text-slate-50">
              {scrsScore}
            </span>
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-50">%</span>
          </div>
          <div className="flex items-center justify-center py-2">
            <DonutChartSmall percentage={scrsScore} />
          </div>
          <div className="mt-4 flex items-center justify-center gap-16 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
              <span className="text-slate-400 dark:text-slate-400">Healthy</span>
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
        <TimeFilterDropdown timeRange={scrsTrendRange} onSelectTime={setScrsTrendRange} />
      </div>

      <div className={cn("grid grid-cols-1 gap-8 mb-8", isGridLayout ? "lg:grid-cols-3" : "")}>
        <div className={cn("bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1f262E] dark:border-transparent", isGridLayout ? "lg:col-span-2" : "")}>
          <div className="h-[330px] w-full">
            <SCRSTrendChart data={filteredSCRSTrend} />
          </div>
        </div>

        <div className="bg-white border border-slate-50 rounded-[24px] shadow-sm overflow-hidden dark:bg-[#000000] dark:border-transparent">
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

      {/* First-Login Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseButton className="dark:bg-[#1F262E]">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8 mt-4">
            <div className="size-[140px] rounded-full bg-slate-100 flex items-center justify-center p-6 shadow-inner ring-8 ring-slate-50 relative overflow-hidden group">
              <img src={logo2} alt="Logo" className="w-20 h-auto relative z-10 drop-shadow-lg" />
            </div>
          </div>
          <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight dark:text-slate-100">
            Change Password
          </h2>
          <p className="text-[15px] leading-relaxed text-slate-600 max-w-[360px] mb-10 dark:text-slate-300">
            Would you like to reset your password to something you can always remember?
          </p>
          <div className="w-full flex flex-col items-center gap-6">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                navigate("/change-password");
              }}
              colorScheme="gradient"
              size="lg"
              className="h-12 w-44 font-bold tracking-widest uppercase border-none rounded-[4px]"
            >
              Let's do it
            </Button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-[15px] font-bold text-[#0D9488] hover:text-[#0C8075]"
            >
              I will do this later
            </button>
          </div>
        </div>
      </Modal>

      {/* Other Relevant Data Section */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-50">
          Other relevant data {isViolationsLoading && <span className="text-xs font-normal text-slate-400 ml-2">(Refreshing...)</span>}
        </h2>
        <TimeFilterDropdown timeRange={otherDataRange} onSelectTime={setOtherDataRange} />
      </div>

      <div className={cn("grid grid-cols-1 gap-8 mb-8", isGridLayout ? "lg:grid-cols-3" : "")}>
        <div className={cn("bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent", isGridLayout ? "lg:col-span-2" : "")}>
          <div className="h-[300px] w-full">
            <PolicyViolationChart data={displayedViolations} />
          </div>
        </div>

        <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-[#1F262E] dark:border-transparent">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[18px] font-bold text-slate-800 tracking-tight dark:text-slate-100">
              System health overview
            </h3>
          </div>
          <SystemHealthChart />
        </div>
      </div>

      {/* Stats Grid & Endpoint Status */}
      <div className={cn("grid grid-cols-1 gap-3 mb-3", isGridLayout ? "lg:grid-cols-4" : "lg:grid-cols-1")}>
        <div className={cn("grid grid-cols-1 gap-x-3 gap-y-2", isGridLayout ? "lg:col-span-3 md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-3")}>
          {liveDashboardStats.length > 0 ? (
            liveDashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)
          ) : (
            <p className="text-slate-400 p-4">Loading real metrics...</p>
          )}
        </div>

        <div className="bg-[#F8FBFF]/50 border border-slate-50 rounded-[20px] p-8 flex flex-col justify-between h-auto shadow-sm dark:bg-[#1F262E] dark:border-transparent">
          <div className="flex flex-col gap-2">
            <span className="text-[14.5px] font-semibold text-slate-800 tracking-tight dark:text-slate-200">
              Endpoint Health status
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[38px] font-bold text-slate-900 leading-none dark:text-slate-50">
                {endpointHealthPercent}
              </span>
              <span className="text-xl font-bold text-slate-400 opacity-60">%</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-2">
            <DonutChartSmall percentage={endpointHealthPercent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;