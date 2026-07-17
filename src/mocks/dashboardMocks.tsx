import type { SCRSTrendItem } from "@/components/common/SCRSTrendChart";
import type { PolicyViolationTrend } from "@/components/common/PolicyViolationChart";
import type { TopContributor } from "@/components/common/TopContributors";
import type { ScoreDriver } from "@/components/common/ScoreDriversBarChart";
import type { DashboardDateRange } from "@/types/dashboard";
import type { StatCardProps } from "@/components/common/StatCard";

/* -------------------------------------------------------------------------- */
/*                               Score Drivers                                */
/* -------------------------------------------------------------------------- */
export const scoreDrivers: Record<DashboardDateRange, ScoreDriver[]> = {
  today: [
    { name: "MFA events", value: 200 },
    { name: "Network", value: 195 },
    { name: "Clipboard evts", value: 134 },
    { name: "Wifi", value: 123 },
    { name: "Bluetooth", value: 145 },
    { name: "VPN", value: 145 },
  ],

  "1week": [
    { name: "MFA events", value: 180 },
    { name: "Network", value: 175 },
    { name: "Clipboard evts", value: 120 },
    { name: "Wifi", value: 110 },
    { name: "Bluetooth", value: 132 },
    { name: "VPN", value: 138 },
  ],

  "1month": [
    { name: "MFA events", value: 220 },
    { name: "Network", value: 205 },
    { name: "Clipboard evts", value: 164 },
    { name: "Wifi", value: 148 },
    { name: "Bluetooth", value: 170 },
    { name: "VPN", value: 161 },
  ],

  "1hr": [
    { name: "MFA events", value: 40 },
    { name: "Network", value: 36 },
    { name: "Clipboard evts", value: 22 },
    { name: "Wifi", value: 19 },
    { name: "Bluetooth", value: 27 },
    { name: "VPN", value: 31 },
  ],
};

/* -------------------------------------------------------------------------- */
/*                               SCRS Trend                                   */
/* -------------------------------------------------------------------------- */

// srscData

export const scrsTrendData: Record<
  DashboardDateRange,
  SCRSTrendItem[]
> = {
  today: [
    { month: "Jan", score: 42 },
    { month: "Feb", score: 51 },
    { month: "Mar", score: 24 },
    { month: "Apr", score: 35 },
    { month: "May", score: 50 },
    { month: "Jun", score: 47 },
    { month: "Jul", score: 81 },
    { month: "Aug", score: 79 },
    { month: "Sep", score: 96 },
    { month: "Oct", score: 73 },
    { month: "Nov", score: 56 },
    { month: "Dec", score: 74 },
  ],

  "1week": [
    { month: "Jan", score: 40 },
    { month: "Feb", score: 48 },
    { month: "Mar", score: 28 },
    { month: "Apr", score: 42 },
    { month: "May", score: 55 },
    { month: "Jun", score: 60 },
    { month: "Jul", score: 78 },
  ],

  "1month": [
    { month: "Jan", score: 32 },
    { month: "Feb", score: 40 },
    { month: "Mar", score: 45 },
    { month: "Apr", score: 52 },
    { month: "May", score: 63 },
    { month: "Jun", score: 70 },
    { month: "Jul", score: 76 },
    { month: "Aug", score: 83 },
    { month: "Sep", score: 88 },
    { month: "Oct", score: 91 },
    { month: "Nov", score: 86 },
    { month: "Dec", score: 94 },
  ],

  "1hr": [
    { month: "Now", score: 68 },
  ],
};


// Top Contributors  

export const topContributors: Record<
  DashboardDateRange,
  TopContributor[]
> = {
  today: [
    {
      id: "1",
      name: "Kate Huntington",
      role: "Financial officer",
      avatar: "/images/avatar.png",
      score: -8,
    },
    {
      id: "2",
      name: "Kate Huntington",
      role: "Financial officer",
      avatar: "/images/avatar.png",
      score: 4,
    },
    {
      id: "3",
      name: "Kate Huntington",
      role: "Financial officer",
      avatar: "/images/avatar.png",
      score: -8,
    },
    {
      id: "4",
      name: "Kate Huntington",
      role: "Financial officer",
      avatar: "/images/avatar.png",
      score: -8,
    },
    {
      id: "5",
      name: "Kate Huntington",
      role: "Financial officer",
      avatar: "/images/avatar.png",
      score: -8,
    },
  ],

  "1week": [
    {
      id: "1",
      name: "James Carter",
      role: "Security Analyst",
      avatar: "/images/avatar.png",
      score: 12,
    },
    {
      id: "2",
      name: "Sarah Lee",
      role: "Compliance Officer",
      avatar: "/images/avatar.png",
      score: 9,
    },
  ],

  "1month": [
    {
      id: "1",
      name: "Michael Brown",
      role: "Network Engineer",
      avatar: "/images/avatar.png",
      score: 18,
    },
    {
      id: "2",
      name: "Emily Davis",
      role: "Risk Manager",
      avatar: "/images/avatar.png",
      score: 15,
    },
  ],

  "1hr": [
    {
      id: "1",
      name: "Olivia Wilson",
      role: "SOC Analyst",
      avatar: "/images/avatar.png",
      score: 3,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                           Policy Violations                                */
/* -------------------------------------------------------------------------- */

//Policy Violations


export const policyViolationData: Record<
  DashboardDateRange,
  PolicyViolationTrend[]
> = {
  today: [
    { month: "Jan", critical: 40, high: 18, low: 38 },
    { month: "Feb", critical: 20, high: 45, low: 40 },
    { month: "Mar", critical: 24, high: 42, low: 56 },
    { month: "Apr", critical: 28, high: 40, low: 52 },
    { month: "May", critical: 42, high: 63, low: 44 },
    { month: "Jun", critical: 75, high: 22, low: 35 },
    { month: "Jul", critical: 73, high: 20, low: 32 },
    { month: "Aug", critical: 88, high: 45, low: 47 },
    { month: "Sep", critical: 62, high: 40, low: 58 },
    { month: "Oct", critical: 70, high: 75, low: 46 },
    { month: "Nov", critical: 54, high: 78, low: 22 },
    { month: "Dec", critical: 72, high: 92, low: 18 },
  ],

  "1week": [
    { month: "Mon", critical: 20, high: 12, low: 18 },
    { month: "Tue", critical: 28, high: 22, low: 15 },
    { month: "Wed", critical: 35, high: 26, low: 24 },
    { month: "Thu", critical: 31, high: 18, low: 20 },
    { month: "Fri", critical: 40, high: 30, low: 28 },
    { month: "Sat", critical: 26, high: 16, low: 14 },
    { month: "Sun", critical: 18, high: 12, low: 10 },
  ],

  "1month": [
    { month: "W1", critical: 42, high: 28, low: 30 },
    { month: "W2", critical: 55, high: 38, low: 26 },
    { month: "W3", critical: 48, high: 34, low: 22 },
    { month: "W4", critical: 62, high: 46, low: 36 },
  ],

  "1hr": [
    { month: "Now", critical: 6, high: 3, low: 2 },
  ],
};

export const dashboardStats: Record<
  DashboardDateRange,
  StatCardProps[]
> = {
  today: [
    {
      label: "Total Alerts",
      value: "7",
      percentage: "+11.01%",
      variant: "emerald",
    },
    {
      label: "High severity incidents",
      value: "7",
      percentage: "+11.01%",
      variant: "amber",
    },
    {
      label: "Active threats",
      value: "7",
      percentage: "+11.01%",
      variant: "rose",
    },
    {
      label: "Users with elevated risk",
      value: "7",
      percentage: "+11.01%",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: "7",
      percentage: "+11.01%",
      variant: "default",
    },
    {
      label: "Integration health",
      value: "90%",
      percentage: "+11.01%",
      variant: "amber",
    },
  ],

  "1week": [
    {
      label: "Total Alerts",
      value: "12",
      percentage: "+8.2%",
      variant: "emerald",
    },
    {
      label: "High severity incidents",
      value: "9",
      percentage: "+5.7%",
      variant: "amber",
    },
    {
      label: "Active threats",
      value: "6",
      percentage: "-2.3%",
      variant: "rose",
    },
    {
      label: "Users with elevated risk",
      value: "11",
      percentage: "+4.1%",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: "16",
      percentage: "+9.4%",
      variant: "default",
    },
    {
      label: "Integration health",
      value: "88%",
      percentage: "-1.5%",
      variant: "amber",
    },
  ],

  "1month": [
    {
      label: "Total Alerts",
      value: "35",
      percentage: "+14.6%",
      variant: "emerald",
    },
    {
      label: "High severity incidents",
      value: "18",
      percentage: "+7.1%",
      variant: "amber",
    },
    {
      label: "Active threats",
      value: "14",
      percentage: "+2.4%",
      variant: "rose",
    },
    {
      label: "Users with elevated risk",
      value: "20",
      percentage: "+11.3%",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: "42",
      percentage: "+13.7%",
      variant: "default",
    },
    {
      label: "Integration health",
      value: "91%",
      percentage: "+2.1%",
      variant: "amber",
    },
  ],

  "1hr": [
    {
      label: "Total Alerts",
      value: "2",
      percentage: "+1.0%",
      variant: "emerald",
    },
    {
      label: "High severity incidents",
      value: "1",
      percentage: "0%",
      variant: "amber",
    },
    {
      label: "Active threats",
      value: "1",
      percentage: "+0.5%",
      variant: "rose",
    },
    {
      label: "Users with elevated risk",
      value: "2",
      percentage: "+0.8%",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: "3",
      percentage: "+0.9%",
      variant: "default",
    },
    {
      label: "Integration health",
      value: "93%",
      percentage: "+0.2%",
      variant: "amber",
    },
  ],
};






