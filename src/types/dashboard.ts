import { PolicyViolationTrend } from "@/components/common/PolicyViolationChart";

export interface DashboardSummary {
  totalAlerts: number;
  incidents: number;
  threats: number;
  scrsScore: number;
  endpointHealthPercentage: number;
}

export type { PolicyViolationTrend };

export interface AgentStatus {
  active: number;
  offline: number;
  backlog: number;
}
