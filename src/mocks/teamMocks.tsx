import type { DashboardDateRange } from "@/types/dashboard";
import type { SCRSTrendItem } from "@/components/common/SCRSTrendChart";
import type { StatCardProps } from "@/components/common/StatCard";


/* -------------------------------------------------------------------------- */
/*                                security Score trend                        */
/* -------------------------------------------------------------------------- */


export const securityScoreTrendData: Record<
  DashboardDateRange,
  SCRSTrendItem[]
> = {
  today: [
    { month: "Jan", score: 42 },
    { month: "Feb", score: 50 },
    { month: "Mar", score: 22 },
    { month: "Apr", score: 33 },
    { month: "May", score: 49 },
    { month: "Jun", score: 46 },
    { month: "Jul", score: 80 },
    { month: "Aug", score: 77 },
    { month: "Sep", score: 95 },
    { month: "Oct", score: 68 },
    { month: "Nov", score: 73 },
    { month: "Dec", score: 76 },
  ],

  "1week": [
    { month: "Mon", score: 58 },
    { month: "Tue", score: 61 },
    { month: "Wed", score: 55 },
    { month: "Thu", score: 70 },
    { month: "Fri", score: 82 },
    { month: "Sat", score: 76 },
    { month: "Sun", score: 80 },
  ],

  "1month": [
    { month: "W1", score: 44 },
    { month: "W2", score: 59 },
    { month: "W3", score: 68 },
    { month: "W4", score: 84 },
  ],

  "1hr": [
    { month: "00m", score: 68 },
    { month: "10m", score: 71 },
    { month: "20m", score: 74 },
    { month: "30m", score: 70 },
    { month: "40m", score: 76 },
    { month: "50m", score: 81 },
    { month: "60m", score: 84 },
  ],
};

export const teamOverviewStats: Record<
  DashboardDateRange,
  StatCardProps[]
> = {
  today: [
    {
      label: "Risk",
      value: "Moderate",
      variant: "amber",
    },
    {
      label: "Agent status",
      value: "On",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: 7,
      percentage: "+11.01%",
      variant: "default",
    },
    {
      label: "Total Alerts",
      value: 7,
      percentage: "+11.01%",
      variant: "default",
    },
    {
      label: "High severity incidents",
      value: 7,
      percentage: "+11.01%",
      variant: "default",
    },
    {
      label: "Active threats",
      value: 7,
      percentage: "+11.01%",
      variant: "default",
    },
  ],

  "1week": [
    {
      label: "Risk",
      value: "Low",
      variant: "emerald",
    },
    {
      label: "Agent status",
      value: "On",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: 4,
      percentage: "+6%",
      variant: "default",
    },
    {
      label: "Total Alerts",
      value: 5,
      percentage: "+8%",
      variant: "default",
    },
    {
      label: "High severity incidents",
      value: 3,
      percentage: "+5%",
      variant: "default",
    },
    {
      label: "Active threats",
      value: 2,
      percentage: "+4%",
      variant: "default",
    },
  ],

  "1month": [
    {
      label: "Risk",
      value: "High",
      variant: "rose",
    },
    {
      label: "Agent status",
      value: "Off",
      variant: "rose",
    },
    {
      label: "Policy violations",
      value: 18,
      percentage: "+20%",
      variant: "default",
    },
    {
      label: "Total Alerts",
      value: 21,
      percentage: "+17%",
      variant: "default",
    },
    {
      label: "High severity incidents",
      value: 12,
      percentage: "+15%",
      variant: "default",
    },
    {
      label: "Active threats",
      value: 9,
      percentage: "+12%",
      variant: "default",
    },
  ],

  "1hr": [
    {
      label: "Risk",
      value: "Low",
      variant: "emerald",
    },
    {
      label: "Agent status",
      value: "On",
      variant: "emerald",
    },
    {
      label: "Policy violations",
      value: 1,
      percentage: "+1%",
      variant: "default",
    },
    {
      label: "Total Alerts",
      value: 2,
      percentage: "+2%",
      variant: "default",
    },
    {
      label: "High severity incidents",
      value: 1,
      percentage: "+1%",
      variant: "default",
    },
    {
      label: "Active threats",
      value: 0,
      percentage: "0%",
      variant: "default",
    },
  ],
};