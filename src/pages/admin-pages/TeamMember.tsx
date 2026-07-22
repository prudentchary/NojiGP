import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { ChevronDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DonutChartSmall } from "@/components/common/Charts";
import { StatCard } from "@/components/common/StatCard";
import { DateRangeDropdown } from "@/components/common/DateRangeDropdown";
import type { DashboardDateRange } from "@/types/dashboard";
import { SCRSTrendChart } from "@/components/common/SCRSTrendChart";

const overviewData: Record<
  DashboardDateRange,
  {
    scrs: number;
    risk: string;
    riskVariant: "emerald" | "amber" | "rose";
    agentStatus: string;
    agentVariant: "emerald" | "rose";
    policyViolations: number;
    totalAlerts: number;
    highSeverityIncidents: number;
    activeThreats: number;
  }
> = {
  today: {
    scrs: 40,
    risk: "Moderate",
    riskVariant: "amber",
    agentStatus: "On",
    agentVariant: "emerald",
    policyViolations: 7,
    totalAlerts: 7,
    highSeverityIncidents: 7,
    activeThreats: 7,
  },

  "1week": {
    scrs: 52,
    risk: "Low",
    riskVariant: "emerald",
    agentStatus: "On",
    agentVariant: "emerald",
    policyViolations: 3,
    totalAlerts: 4,
    highSeverityIncidents: 2,
    activeThreats: 1,
  },

  "1month": {
    scrs: 29,
    risk: "High",
    riskVariant: "rose",
    agentStatus: "Off",
    agentVariant: "rose",
    policyViolations: 18,
    totalAlerts: 24,
    highSeverityIncidents: 10,
    activeThreats: 6,
  },

  "1hr": {
    scrs: 45,
    risk: "Moderate",
    riskVariant: "amber",
    agentStatus: "On",
    agentVariant: "emerald",
    policyViolations: 1,
    totalAlerts: 1,
    highSeverityIncidents: 0,
    activeThreats: 0,
  },
};

const securityScoreTrendData: Record<
  DashboardDateRange,
  {
    month: string;
    score: number;
    severity: "critical" | "normal" | "high";
  }[]
> = {
  today: [
    { month: "Jan", score: 42, severity: "normal" },
    { month: "Feb", score: 50, severity: "normal" },
    { month: "Mar", score: 22, severity: "high" },
    { month: "Apr", score: 33, severity: "critical" },
    { month: "May", score: 49, severity: "normal" },
    { month: "Jun", score: 56, severity: "normal" },
    { month: "Jul", score: 82, severity: "normal" },
    { month: "Aug", score: 79, severity: "normal" },
    { month: "Sep", score: 96, severity: "normal" },
    { month: "Oct", score: 71, severity: "normal" },
    { month: "Nov", score: 77, severity: "normal" },
    { month: "Dec", score: 81, severity: "normal" },
  ],

  "1week": [
    { month: "Mon", score: 38, severity: "high" },
    { month: "Tue", score: 44, severity: "normal" },
    { month: "Wed", score: 52, severity: "normal" },
    { month: "Thu", score: 47, severity: "critical" },
    { month: "Fri", score: 66, severity: "normal" },
    { month: "Sat", score: 73, severity: "normal" },
    { month: "Sun", score: 79, severity: "normal" },
  ],

  "1month": [
    { month: "W1", score: 31, severity: "critical" },
    { month: "W2", score: 49, severity: "normal" },
    { month: "W3", score: 64, severity: "normal" },
    { month: "W4", score: 81, severity: "normal" },
  ],

  "1hr": [
    { month: "00m", score: 61, severity: "normal" },
    { month: "10m", score: 66, severity: "normal" },
    { month: "20m", score: 58, severity: "high" },
    { month: "30m", score: 71, severity: "normal" },
    { month: "40m", score: 74, severity: "normal" },
    { month: "50m", score: 78, severity: "normal" },
    { month: "60m", score: 82, severity: "normal" },
  ],
};

const TeamMember: React.FC = () => {
  const { departmentId, staffId } = useParams();
  const [selectedOverviewRange, setSelectedOverviewRange] =
    useState<DashboardDateRange>("today");
  const [selectedTrendRange, setSelectedTrendRange] =
    useState<DashboardDateRange>("today");

  const currentOverview = overviewData[selectedOverviewRange];
  const trendData = securityScoreTrendData[selectedTrendRange];

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header section with Stats */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[22px] font-bold text-slate-900 tracking-tight dark:text-slate-100">
          Kate Huntington's Overview
        </h2>

        <DateRangeDropdown
          value={selectedOverviewRange}
          onChange={setSelectedOverviewRange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SCRS Radial Card */}
        <div className="bg-[#F8FBFF]/60 border border-slate-100 rounded-[20px] p-6 flex flex-col items-center justify-between dark:bg-[#313740] dark:border-slate-800">
          <div className="w-full flex flex-col gap-1 mb-4 ">
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
              SCRS
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-[32px] font-bold text-slate-900 leading-none dark:text-white">
                {currentOverview.scrs}
              </span>
              <span className="text-xl font-bold text-slate-300">%</span>
            </div>
          </div>
          <div className="w-[120px] h-[120px] relative">
            <DonutChartSmall percentage={currentOverview.scrs} />
          </div>
        </div>

        {/* Status Grid Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Risk"
            value={currentOverview.risk}
            variant={currentOverview.riskVariant}
          />
          <StatCard
            label="Agent status"
            value={currentOverview.agentStatus}
            variant={currentOverview.agentVariant}
          />

          <StatCard
            label="Policy violations"
            value={currentOverview.policyViolations}
            percentage="+11.01%"
          />

          <StatCard
            label="Total Alerts"
            value={currentOverview.totalAlerts}
            percentage="+11.01%"
          />

          <StatCard
            label="High severity incidents"
            value={currentOverview.highSeverityIncidents}
            percentage="+11.01%"
          />

          <StatCard
            label="Active threats"
            value={currentOverview.activeThreats}
            percentage="+11.01%"
          />
        </div>
      </div>
      {/* security score trend */}

      <div className="flex flex-col gap-4 dark:shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold dark:text-slate-200">
            Security score trend
          </h3>

          <DateRangeDropdown
            value={selectedTrendRange}
            onChange={setSelectedTrendRange}
          />
        </div>
        <div className="w-full m-h-[200px]  bg-amber-50/20 dark:bg-[#313740] dark:border-slate-800 dark:shadow-sm rounded-[20px] border border-slate-100 p-4">
          <SCRSTrendChart data={trendData} />
        </div>
      </div>

      {/* Middle Section: Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Incidents Table */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-slate-900 tracking-tight dark:text-slate-200">
            Incidents
          </h3>
          <div className="bg-white border border-slate-50 rounded-2xl overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-700">
                      12 Jan 2023, 12:90am
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 dark:bg-slate-800">
                        Label
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">
                      Behavioral Anomaly
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Timeline Table */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-slate-900 tracking-tight dark:text-slate-200">
            Activity timeline
          </h3>
          <div className="bg-white border border-slate-50 rounded-2xl overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {[
                  "Login - Corporate Wi-Fi",
                  "Agent Check-in - Normal",
                  "Alert - Behavioral Anomaly",
                  "Login - Corporate Wi-Fi",
                  "Login - Corporate Wi-Fi",
                ].map((desc, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-700">
                      12 Jan 2023, 12:90am
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Section: Info Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoModule
          title="Personal Info"
          data={[
            { label: "First name:", value: "Kate" },
            { label: "Last name:", value: "Huntington" },
            { label: "Other name:", value: "-" },
            { label: "User ID:", value: "-" },
            { label: "Role:", value: "Manager" },
            { label: "Department:", value: "Finance" },
          ]}
        />

        <InfoModule
          title="Device Info"
          data={[
            { label: "Device Name:", value: "Kate's PC" },
            { label: "Device ID:", value: "LAPTOP-IT-001" },
            { label: "Agent status:", value: "On" },
            { label: "Last check-in:", value: "10 mins ago" },
            { label: "OS:", value: "Windows 11 Pro" },
            { label: "Model version:", value: "BMSCRS (v2.1.4)" },
            { label: "Current session:", value: "2 hours 15 minutes" },
          ]}
        />

        <InfoModule
          title="Network & Location"
          data={[
            { label: "Current IP:", value: "192.168.1.100 (Lagos, NG)" },
            { label: "Connection:", value: "Corporate Wi-Fi" },
            {
              label: "VPN Status:",
              value: "Not active",
              valueColor: "text-rose-500",
            },
          ]}
        >
          <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">
              Last Locations:
            </span>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                <span className="size-1 bg-slate-400 rounded-full" /> Today
                09:15 - Lagos, NG
              </li>
              <li className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                <span className="size-1 bg-slate-400 rounded-full" /> Yesterday
                22:15 - Unknown
              </li>
            </ul>
          </div>
        </InfoModule>
      </div>
    </div>
  );
};

const StatusCard = ({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage?: string;
}) => (
  <div className="bg-white border border-slate-50 rounded-[20px] p-6 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <div className="mt-4 flex flex-col gap-1">
      <span className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none dark:text-white">
        {value}
      </span>
      {percentage && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[13px] font-bold text-slate-400">
            {percentage}
          </span>
          <TrendingUp className="size-3.5 text-slate-400" />
        </div>
      )}
    </div>
  </div>
);

const InfoModule = ({
  title,
  data,
  children,
}: {
  title: string;
  data: { label: string; value: string; valueColor?: string }[];
  children?: React.ReactNode;
}) => (
  <div className="bg-[#F9FAFB] rounded-[24px] p-8 border border-white shadow-sm dark:bg-slate-950 dark:border-slate-800">
    <h3 className="text-[17px] font-bold text-slate-800 mb-8 dark:text-slate-200">
      {title}
    </h3>
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between group">
          <span className="text-[14px] font-medium text-slate-500">
            {item.label}
          </span>
          <span
            className={cn(
              "text-[14px] font-bold text-slate-800 dark:text-slate-300",
              item.valueColor,
            )}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
    {children}
  </div>
);

export default TeamMember;
