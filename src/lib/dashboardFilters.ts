import type { DashboardDateRange } from "@/types/dashboard";
import type { SCRSTrendItem } from "@/components/common/SCRSTrendChart";
import type { PolicyViolationTrend } from "@/components/common/PolicyViolationChart";
import type { TopContributor } from "@/components/common/TopContributors";
import type { ScoreDriver } from "@/components/common/ScoreDriversBarChart";
import type { StatCardProps } from "@/components/common/StatCard";


/* -------------------------------------------------------------------------- */
/*                              Score Drivers                                 */
/* -------------------------------------------------------------------------- */

export const filterScoreDrivers = (
  data: Record<DashboardDateRange, ScoreDriver[]>,
  range: DashboardDateRange
): ScoreDriver[] => {
  return data[range];
};

/* -------------------------------------------------------------------------- */
/*                                SCRS Trend                                  */
/* -------------------------------------------------------------------------- */

export const filterSCRSTrend = (
  data: Record<DashboardDateRange, SCRSTrendItem[]>,
  range: DashboardDateRange
): SCRSTrendItem[] => {
  return data[range];
};
/* -------------------------------------------------------------------------- */
/*                           Top Contributors                                 */
/* -------------------------------------------------------------------------- */

export const filterTopContributors = (
  data: Record<DashboardDateRange, TopContributor[]>,
  range: DashboardDateRange
): TopContributor[] => {
  return data[range];
};

/* -------------------------------------------------------------------------- */
/*                           Policy Violations                                */
/* -------------------------------------------------------------------------- */

export const filterPolicyViolations = (
  data: Record<DashboardDateRange, PolicyViolationTrend[]>,
  range: DashboardDateRange
): PolicyViolationTrend[] => {
  return data[range];
};

/* -------------------------------------------------------------------------- */
/*                           Card data                               */
/* -------------------------------------------------------------------------- */


export const filterDashboardStats = (
  data: Record<DashboardDateRange, StatCardProps[]>,
  range: DashboardDateRange
): StatCardProps[] => {
  return data[range];
};







