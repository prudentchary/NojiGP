// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardDateRange, PolicyViolationTrend } from "@/types/dashboard";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: (range: DashboardDateRange) => [...dashboardKeys.all, "summary", range] as const,
  violations: (range: DashboardDateRange) => [...dashboardKeys.all, "violations", range] as const,
};

export function useDashboardSummary(range: DashboardDateRange) {
  return useQuery({
    queryKey: dashboardKeys.summary(range),
    queryFn: () => dashboardService.getSummary(range),
  });
}

export function usePolicyViolations(range: DashboardDateRange) {
  return useQuery<PolicyViolationTrend[]>({
    queryKey: dashboardKeys.violations(range),
    queryFn: () => dashboardService.getViolations(range),
  });
}