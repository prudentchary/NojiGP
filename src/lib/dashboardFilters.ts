// src/lib/dashboardFilters.ts
import type { DashboardDateRange } from "@/types/dashboard";

export const filterByDateRange = <T>(
  data: Record<string, T>,
  range: DashboardDateRange
): T => {
  if (!data) return [] as unknown as T;

  // Map Swagger range values to existing mock object keys
  const keyMap: Record<DashboardDateRange, string> = {
    "15m": "today",
    "1h": "today",
    "24h": "today",
    "7d": "7d",
    "30d": "30d",
  };

  const targetKey = keyMap[range] ?? range;

  // Look up mapped key first, fallback to "today", direct lookup, or empty array
  return (
    data[targetKey] ??
    data["today"] ??
    data[range] ??
    Object.values(data)[0] ??
    ([] as unknown as T)
  );
};







