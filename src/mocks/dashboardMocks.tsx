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









