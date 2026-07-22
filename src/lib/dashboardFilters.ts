import type { DashboardDateRange } from "@/types/dashboard";


/* -------------------------------------------------------------------------- */
/*                              Score Drivers                                 */
/* -------------------------------------------------------------------------- */

// export const filterScoreDrivers = (
//   data: Record<DashboardDateRange, ScoreDriver[]>,
//   range: DashboardDateRange
// ): ScoreDriver[] => {
//   return data[range];
// };

// /* -------------------------------------------------------------------------- */
// /*                                SCRS Trend                                  */
// /* -------------------------------------------------------------------------- */

// export const filterSCRSTrend = (
//   data: Record<DashboardDateRange, SCRSTrendItem[]>,
//   range: DashboardDateRange
// ): SCRSTrendItem[] => {
//   return data[range];
// };
// /* -------------------------------------------------------------------------- */
// /*                           Top Contributors                                 */
// /* -------------------------------------------------------------------------- */

// export const filterTopContributors = (
//   data: Record<DashboardDateRange, TopContributor[]>,
//   range: DashboardDateRange
// ): TopContributor[] => {
//   return data[range];
// };

// /* -------------------------------------------------------------------------- */
// /*                           Policy Violations                                */
// /* -------------------------------------------------------------------------- */

// export const filterPolicyViolations = (
//   data: Record<DashboardDateRange, PolicyViolationTrend[]>,
//   range: DashboardDateRange
// ): PolicyViolationTrend[] => {
//   return data[range];
// };

// /* -------------------------------------------------------------------------- */
// /*                           Card data                               */
// /* -------------------------------------------------------------------------- */


// export const filterDashboardStats = (
//   data: Record<DashboardDateRange, StatCardProps[]>,
//   range: DashboardDateRange
// ): StatCardProps[] => {
//   return data[range];
// };


export const filterByDateRange = <T>(
  data: Record<DashboardDateRange, T>,
  range: DashboardDateRange
): T => {
  return data[range];
};







